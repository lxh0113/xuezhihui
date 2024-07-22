<template>
  <div class="viewSignInBox">
    <div class="detailsBox">
      <span class="titleText">活动详情</span>
      <span class="titleText" v-if="activityData.activityType===1">智能选人</span>
      <span v-else class="titleText">{{ statusList[activityData.type] }}</span>
      <img
        v-if="activityData.answerImage != null"
        :src="activityData.answerImage"
        alt=""
      />
      <img
        style="margin-top: 20px"
        v-if="activityData.detectionImage != null"
        :src="activityData.detectionImage"
        alt=""
      />
    </div>
    <div class="listBox">
      <div class="noCome">
        <span>详细名单</span>
        <el-table
          height="500"
          v-if="activityData.studentSigninList !== null"
          size="large"
          :data="filterFirstTableData"
          style="width: 100%"
        >
          <el-table-column label="状态" prop="signinStatus" sortable>
            <template #default="scope">
              <el-tag size="large" v-if="scope.row.signinStatus === '已签'">
                {{ scope.row.signinStatus }}
              </el-tag>
              <el-tag v-else size="large" type="danger" >
                {{ scope.row.signinStatus }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="studentName" />
          <el-table-column align="right">
            <template #header>
              <el-input v-model="searchFirst" size="large" placeholder="搜索" />
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

        <!-- <el-pagination
          v-if="
            activityData.studentSigninList != null &&
            activityData.studentSigninList.length !== 0
          "
          @current-change="changeFirstPage"
          style="margin-top: 20px"
          layout="prev, pager, next"
          :total="pageFirstData.total"
        /> -->

        <el-table
          height="500"
          v-if="activityData.students !== null"
          size="large"
          :data="filterSecondTableData"
          style="width: 100%"
        >
          <el-table-column label="学号" prop="sno" sortable> </el-table-column>
          <el-table-column label="姓名" prop="name" />
          <el-table-column align="right">
            <template #header>
              <el-input v-model="searchSecond" size="large" placeholder="搜索" />
            </template>
            <template #default="scope">
              <img style="width: 50px; height: 50px" :src="scope.row.faceImage" alt="" />
            </template>
          </el-table-column>
        </el-table>

        <!-- <el-pagination
          v-if="activityData.students != null && activityData.students.length !== 0"
          @current-change="changeSecondPage"
          style="margin-top: 20px"
          layout="prev, pager, next"
          :total="pageSecondData.total"
        /> -->
      </div>
    </div>
  </div>

  <el-dialog
    v-model="dialogVisible"
    title="教师代签"
    width="500"
    :before-close="handleClose"
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
import { teacherModifyAssignmentStatusAPI } from "@/apis/assignment";
import { UploadFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { computed, onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  teacherModifySignInStatusAPI,
  teacherViewActivityAPI,
} from "../../../../../apis/activity";

const dialogVisible = ref(false);
const reason = ref("");

const router = useRouter();
const route = useRoute();

const statusList = ["智能考勤", "普通签到", "手势签到", "签到码签到"];

const activityData = ref({
  studentSigninList: [],
  students: [],
});

const pageFirstData = ref({
  current: 1,
  total: 0,
});

const pageSecondData = ref({
  current: 1,
  total: 0,
});

const searchFirst = ref("");
const searchSecond = ref("");

const changeFirstPage = (page: number) => {
  pageFirstData.value.current = page;
};

const changeSecondPage = (page: number) => {
  pageSecondData.value.current = page;
};

const filterFirstTableData = computed(() =>
  activityData.value.studentSigninList.filter(
    (data) =>
      !searchFirst.value ||
      data.studentName.toLowerCase().includes(searchFirst.value.toLowerCase())
  )
);

const filterSecondTableData = computed(() =>
  activityData.value.students.filter(
    (data) =>
      !searchSecond.value ||
      data.name.toLowerCase().includes(searchSecond.value.toLowerCase())
  )
);

let currentStudent = null;
let currentIndex = 0;

const handleEdit = (index: number, row: any) => {
  console.log(index, row);
  currentStudent = row.studentId;
  currentIndex = index;
  reason.value = row.signinStatus;

  dialogVisible.value = true;
};

const getActivityDetails = async () => {
  let id = parseInt(route.params.activityId as string);

  const res = await teacherViewActivityAPI(id);
  if (res.data.code === 200) {
    console.log(res.data.data);
    activityData.value = res.data.data;
  } else {
    ElMessage.error(res.data.message);
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
    activityData.value.studentSigninList[currentIndex].signinStatus = reason.value;
  } else ElMessage.error(res.data.message);
};

onMounted(() => {
  getActivityDetails();
});
</script>

<style scoped lang="scss">
.viewSignInBox {
  display: flex;
  flex-wrap: wrap;
  background: white;
  padding: 20px;
  margin-right: 20px;
  min-height: calc(100vh - 100px);

  .detailsBox {
    width: 500px;
    margin-right: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;

    .titleText {
      color: $primary-color;
      font-weight: bold;
      line-height: 50px;
    }

    img {
      height: 300px;
    }
  }

  .noCome {
    margin-top: 20px;
    margin-right: 20px;
    padding: 20px;
    max-width: 720px;
    min-width: 500px;
    box-sizing: border-box;
    border-radius: 5px;
  }
}
</style>
