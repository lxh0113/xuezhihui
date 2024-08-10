<template>
  <div class="homeworkBox">
    <div class="head">
      <el-button
        style="font-size: 18px"
        :icon="Plus"
        type="primary"
        text="primary"
        @click="toAddHomework"
        >作业</el-button
      >
    </div>
    <hr />
    <div class="bottom">
      <div class="choose">
        <!-- <el-input
          style="width: 200px; height: 40px; margin-right: 20px"
          :prefix-icon="Search"
          placeholder="搜索"
        ></el-input>
        <el-select
          style="width: 200px; margin-right: 20px"
          placeholder="请输入"
        ></el-select> -->
        <el-radio-group v-model="radio" @change="getAllHomework" class="ml-4">
          <!-- <el-radio value="1" size="large">全部</el-radio> -->
          <el-radio :value="0" size="large">未开始</el-radio>
          <el-radio :value="1" size="large">进行中</el-radio>
          <el-radio :value="2" size="large">已结束</el-radio>
        </el-radio-group>
      </div>

      <div class="homework">
        <div class="test" v-for="(item, index) in homeworkList" :key="index">
          <div class="left">
            <div class="header">
              <span class="title">{{ item.title }}</span>
              <el-tag style="margin-left: 20px" size="small" type="primary">{{
                item.state === 0
                  ? "未开始"
                  : item.state === 1
                  ? "进行中"
                  : "已结束"
              }}</el-tag>
            </div>
            <p>
              {{
                item.classList?.map((myClass) => myClass.className).join("、")
              }}
            </p>
            <p>作答时间：{{ item.beginDate }} 至 {{ item.endDate }}</p>
          </div>

          <div class="right">
            <span style="font-size: 26px">{{ item.waitCorrectNum }}</span>
            <span>待批</span>
            <span style="color: #ccc">{{ item.unCommittedNum }}未交</span>
            <el-button
              style="font-size: 16px"
              type="primary"
              text="primary"
              @click="toMark(item.assignmentId)"
              >批阅</el-button
            >
            <el-button
              style="font-size: 16px"
              type="primary"
              text="primary"
              @click="deleteHomework(item, index)"
              >删除</el-button
            >
            <el-button
              style="font-size: 16px"
              type="primary"
              text="primary"
              @click="modifySettings(item)"
              >修改设置</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>

  <el-dialog v-model="dialogFormVisible" title="修改设置" width="640">
    <el-form :model="form">
      <el-form-item label="发放对象">
        <el-tag
          size="mid"
          style="margin-right: 10px"
          type="info"
          v-for="(item, index) in 4"
          :key="index"
          >软件{{ index + 1 }}班</el-tag
        >
      </el-form-item>
      <el-form-item label="有效时段">
        <el-date-picker
          v-model="form.startTime"
          type="datetime"
          placeholder="开始时间"
          style="margin-right: 20px"
        />
        至
        <el-date-picker
          v-model="form.endTime"
          type="datetime"
          placeholder="结束时间"
          style="margin-left: 20px"
        />
      </el-form-item>
      <el-form-item label="督促设置">
        <el-checkbox v-model="form.supervise">
          在作业截至<el-input
            size="mid"
            style="width: 50px; margin-left: 10px; margin-right: 10px"
            v-model="form.superviseTime"
          ></el-input
          >分钟的的时候发通知提醒学生
        </el-checkbox>

        <el-checkbox v-model="form.smartSupervise"> 智能提醒 </el-checkbox>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="modify"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import {
  teacherDeleteAssignmentAPI,
  teacherViewAllAssignmentAPI,
} from "@/apis/assignment";
import { Plus, Search } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { ref, reactive, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { teacherModifyAssignmentStatusAPI } from "../../../../apis/assignment";

const dialogFormVisible = ref(false);

const route = useRoute();
const router = useRouter();

const radio = ref(1);

const homeworkList = ref([
  {
    title: "",
    status: "",
  },
]);

const form = reactive({
  students: [],
  startTime: "",
  endTime: "",
  supervise: true,
  superviseTime: "",
  smartSupervise: false,
});

const toAddHomework = () => {
  router.push("/course/" + route.params.id + "/homework/addHomework");
};

const modifySettings = (item) => {
  dialogFormVisible.value = true;
};

const modify = async() => {
  const res = await teacherModifyAssignmentStatusAPI(
    parseInt(route.params.assignmentId as string),
    1
  );

  if (res.data.code === 200) {
    ElMessage.success('修改成功')

    getAllHomework()
  } else ElMessage.error(res.data.message);
};

const toMark = (id: number) => {
  router.push("/course/" + route.params.id + "/homework/details/" + id);
};

const deleteHomework = async (item: any, index: number) => {
  const res = await teacherDeleteAssignmentAPI(item.assignmentId);

  if (res.data.code === 200) {
    ElMessage.success("删除成功");
    homeworkList.value = homeworkList.value.filter((item, i) => {
      return i !== index;
    });
  } else {
    ElMessage.error(res.data.message);
  }
};

const getAllHomework = async () => {
  const res = await teacherViewAllAssignmentAPI(
    parseInt(route.params.id as string),
    radio.value,
    1
  );

  if (res.data.code === 200) {
    console.log(res.data.data);
    homeworkList.value = res.data.data;
    console.log(homeworkList.value)
  } else ElMessage.error(res.data.message);
};

onMounted(() => {
  getAllHomework();
});
</script>

<style lang="scss" scoped>
.homeworkBox {
  background: $primary-white-color;
  box-sizing: border-box;
  padding: 20px;
  min-height: calc(100vh - 120px);
  min-width: 820px;
  margin-bottom: 20px;
  margin-right: 20px;
  border-radius: 5px;

  .bottom {
    .choose {
      display: flex;
      min-width: 640px;
      margin-top: 20px;
    }

    .homework {
      margin-top: 10px;
      box-sizing: border-box;
      padding: 10px;
    }

    .test {
      display: flex;
      justify-content: space-between;
      height: 100px;
      // background: red;

      .left {
        .header {
          display: flex;
          align-items: center;
        }

        .title {
          font-size: 20px;
          line-height: 50px;
          // display: flex;
        }

        p {
          color: #ccc;
        }
      }

      .right {
        display: flex;
        align-items: flex-end;

        span {
          line-height: 45px;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
