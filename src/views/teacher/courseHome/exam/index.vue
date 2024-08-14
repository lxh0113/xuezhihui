<template>
  <div class="examBox">
    <div class="head" style="margin-bottom: 10px;">
      <el-button style="font-size: 18px" :icon="Plus" type="primary" @click="toAddExam">新建考试</el-button>

      <el-button style="font-size: 18px" :icon="Upload" type="primary" @click="toUploadPaper">上传纸质试卷智能批阅</el-button>
    </div>
    <hr />
    <div class="bottom">
      <div class="choose">
        <!-- <el-input
          style="width: 200px; margin-right: 20px"
          :prefix-icon="Search"
          placeholder="搜索"
        ></el-input> -->
        <el-select v-model="state" style="width: 200px; margin-right: 20px" placeholder="请输入" @change="getAllExam">
          <el-option label="未开始" :value="0"></el-option>
          <el-option label="进行中" :value="1"></el-option>
          <el-option label="已结束" :value="2"></el-option>
        </el-select>
      </div>

      <el-table :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }"
        style="width: 100%; margin-top: 20px">
        <!-- <el-table-column type="selection" /> -->
        <el-table-column label="试卷名称" prop="title" />
        <el-table-column label="发放对象">
          <template #default="scope">
            {{ scope.row.classList.map((myClass) => myClass.className) }}
          </template>
        </el-table-column>
        <el-table-column prop="waitCorrectNum" label="待批阅" />
        <el-table-column prop="allNum" label="总人数" />
        <el-table-column prop="beginDate" label="创建日期" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button v-if="scope.row.state === 0" type="primary" @click="toPublish(scope.row)">发布</el-button>
            <el-button v-else type="primary" @click="toMark(scope.row.assignmentId)">批阅</el-button>
            <el-button type="primary" @click="toAIMark(scope.row.assignmentId)">智能批阅</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>

  <el-dialog v-model="dialogFormVisible" title="发放设置" width="640">
    <el-form :model="form">
      <el-form-item label="发放对象">
        <el-select-v2 v-model="form.classList" :options="options" placeholder="选择班级" style="width: 240px" multiple />
      </el-form-item>
      <el-form-item label="有效时段">
        <el-date-picker v-model="form.beginDate" type="datetime" placeholder="开始时间" style="margin-right: 20px" />
        至
        <el-date-picker v-model="form.endDate" type="datetime" placeholder="结束时间" style="margin-left: 20px" />
      </el-form-item>
      <el-form-item label="发放对象">
        <el-input type="number" min="0" v-model="form.examTime"></el-input>
      </el-form-item>
      <!-- <el-form-item label="督促设置">
        <el-checkbox v-model="form.smartSupervise">
          在作业截至<el-input
            size="mid"
            style="width: 50px; margin-left: 10px; margin-right: 10px"
            v-model="form.smartSupervise"
          ></el-input
          >分钟的的时候发通知提醒学生
        </el-checkbox>

        <el-checkbox v-model="form.smartSupervise"> 智能提醒 </el-checkbox>
      </el-form-item> -->
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="publish"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Plus, Search, Upload, User } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { useRoute, useRouter } from "vue-router";
import {
  correctAllAPI,
  teacherPublishAssignmentAPI,
  teacherViewAllAssignmentAPI,
} from "@/apis/assignment";
import { teacherGetAllClassAPI } from "../../../../apis/assignment";
import { teacherAddPaperAPI } from "@/apis/paper";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const dialogFormVisible = ref(false);
const options = ref([]);
const form = ref({
  classList: [],
  beginDate: "",
  endDate: "",
  examTime: 0,
  smartSupervise: "",
});

const state = ref(1);

interface User {
  name: string;
  questionsBank: string;
  builder: string;
  questionsNumber: number;
  score: number;
  date: string;
}

const tableData = ref<User[]>();

const toAddExam = () => {
  router.push("/course/" + route.params.id + "/exam/addExam");
};

const toMark = (id: number) => {
  router.push("/course/" + route.params.id + "/exam/details/" + id);
};

const getAllExam = async () => {
  const res = await teacherViewAllAssignmentAPI(
    parseInt(route.params.id as string),
    state.value,
    2
  );

  if (res.data.code === 200) {
    console.log(res.data.data);
    tableData.value = res.data.data;
  } else {
  }
};

const toAIMark = async (id: number) => {
  const res = await correctAllAPI(id, userStore.getUserInfo().roleId)

  if (res.data.code === 200) {
    ElMessage.success('批阅完成')

    getAllExam()
  }
  else {
    ElMessage.error(res.data.message)
  }
}

const setClassList = async () => {
  const res = await teacherGetAllClassAPI();

  if (res.data.code === 200) {
    options.value = res.data.data;
  } else ElMessage.error(res.data.message);
};

const currentAssignmentData = ref();

const toPublish = (row: any) => {
  // const res = await teacherPublishAssignmentAPI(route.params.assignmentId,)
  currentAssignmentData.value = row;
  dialogFormVisible.value = true;
};

const publish = async () => {
  const res = await teacherPublishAssignmentAPI(
    2,
    parseInt(route.params.assignmentId as string),
    form.value.beginDate,
    form.value.endDate,
    form.value.examTime,
    form.value.classList
  );

  if (res.data.code === 200) {
    ElMessage.success("发布成功");
    getAllExam();
  } else {
    ElMessage.error(res.data.message);
  }

  dialogFormVisible.value = false;
};

const toUploadPaper = async () => {
  const res = await teacherAddPaperAPI(
    userStore.getUserInfo().roleId,
    parseInt(route.params.id as string)
  );

  if (res.data.code === 200) {
    router.push("/course/" + route.params.id + "/exam/uploadExam/" + res.data.data);

  } else {
    ElMessage.error(res.data.message)
  }

};

onMounted(() => {
  getAllExam();

  // setClassList()
});
</script>

<style lang="scss" scoped>
.examBox {
  background: $primary-white-color;
  box-sizing: border-box;
  padding: 20px;
  min-height: calc(100vh - 120px);
  // margin-bottom: 20px;
  margin-right: 20px;
  border-radius: 5px;

  .bottom {
    .choose {
      display: flex;
      min-width: 640px;
      margin-top: 20px;
    }
  }
}
</style>
