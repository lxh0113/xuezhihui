<template>
  <div class="intelligentBox">
    <!-- <el-select style="width: 200px; margin-bottom: 20px" placeholder="请选择班级">
      <el-option value="1班" label="1班"></el-option>
    </el-select> -->
    <div class="uploadBox">
      <div
        class="clickUpload"
        style="
          flex: 1;
          max-width: 800px;
          margin-right: 20px;
          max-width: 600px;
          margin-bottom: 20px;
        "
      >
        <div class="uploadText">上传文件</div>
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :on-change="uploadImage"
          :show-file-list="false"
        >
          <img
            style="width: 600px; height: 300px"
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </div>
      <div class="image">
        <div>示例图片</div>
        <img :src="secondImage" alt="" />
      </div>
    </div>

    <div class="result">
      <span class="resultText">识别结果</span>
     
      <div class="noCome">
        <span>详细名单</span>
        <el-table size="large" :data="filterTableData" style="width: 100%">
          <el-table-column label="状态" prop="status" sortable>
            <template #default="scope">
              <el-tag size="large" v-if="scope.row.signinStatus === '已签'">
                {{ scope.row.signinStatus }}
              </el-tag>
              <el-tag v-else size="large" type="danger">
                {{ scope.row.signinStatus }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="studentName" />
          <el-table-column align="right">
            <template #header>
              <el-input v-model="search" size="large" placeholder="搜索" />
            </template>
            <template #default="scope">
              <el-button
                size="large"
                @click="handleEdit(scope.$index, scope.row)"
                type="primary"
              >
                修改
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>

  <el-dialog
    v-model="dialogVisible"
    title="教师代签"
    width="500"
  >
    <el-select v-model="reason" style="width: 300px">
      <el-option label="事假" value="事假"></el-option>
      <el-option label="病假" value="病假"></el-option>
      <el-option label="迟到" value="迟到"></el-option>
      <el-option label="公假" value="公假"></el-option>
      <el-option label="已签" value="已签"></el-option>
      <el-option label="未签" value="未签"></el-option>
    </el-select>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="toModify"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { teacherCreateSignInAPI, teacherModifySignInStatusAPI, uploadImageAPI } from "@/apis/activity";
import { UploadFilled } from "@element-plus/icons-vue";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useClassStore } from "@/stores/classStore";
import { useUserStore } from "@/stores/userStore";
import { ElMessage } from "element-plus";

const route = useRoute();
const router = useRouter();
const classStore = useClassStore();
const userStore = useUserStore();

const imageUrl = ref("");

const secondImage=ref("https://yuejuanpt.oss-cn-zhangjiakou.aliyuncs.com/OIP-C%20%283%29.jpg")

let currentStudent = null;
let currentIndex = 0;

const dialogVisible = ref(false);
const reason = ref("");

const search = ref("");
const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value || data.studentName.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleEdit = (index: number, row: any) => {
  console.log(index, row);
  currentStudent = row.studentId;
  currentIndex = index;
  reason.value = row.signinStatus;

  dialogVisible.value = true;
};
const handleDelete = (index: number, row: any) => {
  console.log(index, row);
};
const tableData=ref([]);

const uploadImage = async (uploadFile) => {
  console.log(uploadFile);

  let data = new FormData();

  data.append("image", uploadFile.raw);

  console.log(uploadFile.raw);

  console.log(data);

  const res = await uploadImageAPI(data);

  if (res.data.code === 200) {
    imageUrl.value = res.data.data;
    
    const response = await teacherCreateSignInAPI(
      parseInt(route.params.id as string),
      classStore.getCurrentClass(),
      // 6,
      userStore.getUserInfo().roleId,
      "智能考勤",
      null,
      null,
      0,
      null,
      imageUrl.value
    );

    if (response.data.code === 200) {
      console.log(response.data.data);
      secondImage.value=response.data.data.detectionImage


      tableData.value=response.data.data.studentActivities
    }
  }
};

const toModify = () => {
  modifyStatus(currentStudent, parseInt(route.params.activityId as string), reason.value);
  
  dialogVisible.value = false;
};



const modifyStatus = async (studentId: number, siginId: number, signinStatus: string) => {
  const res = await teacherModifySignInStatusAPI(siginId, studentId, signinStatus);
  if (res.data.code === 200) {
    ElMessage.success("修改成功");
    tableData.value[currentIndex].status=signinStatus
  } else ElMessage.error(res.data.message);
};


</script>

<style scoped lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 600px;
  height: 300px;
  text-align: center;
  border: 1px dotted #000;
  border-radius: 5px;
}

.intelligentBox {
  background: $primary-white-color;
  min-height: calc(100vh - 140px);
  margin-top: 20px;
  border-radius: 5px;
  margin-right: 20px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  padding-left: 30px;
  margin-bottom: 20px;

  flex-direction: column;
  justify-content: flex-start;

  .uploadBox {
    display: flex;
    flex-wrap: wrap;

    .uploadText {
      color: $primary-color;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .image {
      flex: 1;
      min-width: 400px;
      margin-bottom: 20px;
      max-width: 600px;

      img {
        width: 100%;
      }

      div {
        color: $primary-color;
        font-weight: bold;
        margin-bottom: 10px;
      }
    }

    img {
      max-width: 600px;
      flex: 1;
      height: 300px;
    }
  }

  .result {
    min-width: 600px;
    margin-top: 20px;

    .resultText {
      color: $primary-color;
      font-weight: bold;
    }

    .resultContent {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 300px));
      gap: 30px;
      margin-top: 20px;

      .totalNum,
      .hereNum {
        border: 1px dotted #999;
        color: black;
        display: flex;
        align-items: center;
        height: 200px;
        border-radius: 5px;
        padding: 20px;
        box-sizing: border-box;
        flex-direction: column;

        span:nth-child(1) {
          margin-top: 30px;
          font-size: 20px;
          font-weight: normal;
          color: black;
        }

        span:nth-child(2) {
          font-size: 36px;
          line-height: 100px;
          color: $primary-color;
        }
      }
    }

    .noCome {
      border: 1px dotted #999;
      margin-top: 20px;
      margin-right: 20px;
      padding: 20px;
      box-sizing: border-box;
      max-width: 640px;
      border-radius: 5px;
    }
  }
}
</style>
