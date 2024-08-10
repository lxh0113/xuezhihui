<template>
  <div class="backBox">
    <div class="header">
      <div class="title">试卷管理</div>
      <div class="button">
        <el-button @click="dialogFormVisible = true" type="primary" :icon="Plus"
          >组卷</el-button
        >
      </div>
    </div>
    <hr />
    <div class="choose">
      <!-- <el-button style="font-size:16px;margin-right:20px;" type="primary" :icon="Upload" text="primary">上传</el-button> -->
      <el-input
        style="width: 200px"
        placeholder="请输入关键词"
        :prefix-icon="Search"
      />

      <el-select
        v-model="state"
        @change="getAllExam"
        style="width: 200px; margin-left: 30px"
      >
        <el-option label="草稿" :value="0"></el-option>
        <el-option label="进行中" :value="1"></el-option>
        <el-option label="已结束" :value="2"></el-option>
      </el-select>
    </div>
    <!-- <hr /> -->
    <el-table :data="tableData" style="width: 100%; margin-top: 20px">
      <!-- <el-table-column type="selection" width="55" /> -->
      <el-table-column label="课程名字" prop="courseName" sortable />
      <el-table-column prop="title" label="试卷名称" />
      <el-table-column label="状态">
        <template #default="scope">
          <el-tag v-if="scope.row.state === 0" type="warning">草稿</el-tag>
          <el-tag v-if="scope.row.state === 1" type="danger">进行中</el-tag>
          <el-tag v-if="scope.row.state === 2" type="primary">已结束</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="questionNum" label="题量" />
      <el-table-column prop="creatorName" label="创建人" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button v-if="scope.row.state === 0" type="primary" text="primary" @click="postExam(scope.row)"
            >发布考试</el-button
          >
          <el-button
            type="primary"
            text="primary"
            @click="toViewExam(scope.row)"
            >查看</el-button
          >
          <!-- <el-button type="primary" text="primary">编辑</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog v-model="dialogFormVisible" title="新建试卷" width="500">
    <el-form :model="form" label-position="left">
      <el-form-item label="试卷名称" label-width="80">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="课程" label-width="80">
        <el-select v-model="value" placeholder="选择课程">
          <el-option
            v-for="item in options"
            :key="item"
            :label="item.courseName"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addNewPaper"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog v-model="postDialog" title="发布考试" width="800">
    <el-form>
      <el-form-item label="考试对象">
        <el-select-v2
          v-model="classValue"
          :options="classList"
          multiple
          style="width: 300px"
          clearable
          collapse-tags
          placeholder="选择考试对象"
          popper-class="custom-header"
          :max-collapse-tags="1"
        >
          <template #header>
            <el-checkbox
              v-model="checkAll"
              :indeterminate="indeterminate"
              @change="handleCheckAll"
            >
              所有
            </el-checkbox>
          </template>
        </el-select-v2>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="form.startTime"
          type="datetime"
          placeholder="选择时间"
          format="YYYY-MM-DD HH:mm:ss"
          date-format="MMM DD, YYYY"
          time-format="HH:mm"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="截至时间">
        <el-date-picker
          v-model="form.endTime"
          type="datetime"
          placeholder="选择时间"
          format="YYYY-MM-DD HH:mm:ss"
          date-format="MMM DD, YYYY"
          time-format="HH:mm"
          value-format="YYYY-MM-DD HH:mm:ss"
        />
      </el-form-item>
      <el-form-item label="考试时间">
        <el-input
          v-model="form.examTime"
          style="width: 100px"
          type="number"
        ></el-input>
        <span style="margin-left: 20px">分钟</span>
      </el-form-item>
      <!-- <el-form-item label="防作弊设置">
        <el-checkbox>禁止学生多端考试</el-checkbox>
      </el-form-item> -->
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="postDialog = false">取消</el-button>
        <el-button type="primary" @click="toPublish"> 发布 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Plus, Delete, Search } from "@element-plus/icons-vue";
import { ref, reactive, watch, onMounted } from "vue";
import { CheckboxValueType, ElMessage } from "element-plus";
import type { TableColumnCtx } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import {
  teacherPublishAssignmentAPI,
  teacherViewAllCourseAssignmentAPI,
} from "../../../apis/assignment";
import { useUserStore } from "@/stores/userStore";
import { teacherViewMyTeachCourseAPI } from "@/apis/course";
import { teacherGetAllClassAPI } from "@/apis/class";

import { usePaperStore } from "@/stores/paperStore";

const paperStore=usePaperStore()
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const state = ref(1);

const dialogFormVisible = ref(false);

const postDialog = ref(false);

const currentExamData = ref();

const postExam = (item: any) => {
  console.log(item)
  postDialog.value = true;
  currentExamData.value = item;
};

const tableData = ref();

const form = reactive({
  name: "",
  startTime: "",
  endTime: "",
  examTime: 120,
});

const checkAll = ref(false);
const indeterminate = ref(false);

const classValue = ref([]);
const classList = ref([]);

const value = ref();
const options = ref([]);

watch(classValue, (val) => {
  if (val.length === 0) {
    checkAll.value = false;
    indeterminate.value = false;
  } else if (val.length === classList.value.length) {
    checkAll.value = true;
    indeterminate.value = false;
  } else {
    indeterminate.value = true;
  }
});

const handleCheckAll = (val: CheckboxValueType) => {
  indeterminate.value = false;
  if (val) {
    classValue.value = classList.value.map((_) => _.value);
  } else {
    classValue.value = [];
  }
};

const addNewPaper = () => {

  paperStore.setPaperTitle(form.name)

  dialogFormVisible.value = false;

  router.push("/teacher/paper/"+value.value+'/add');
};

const getAllClass = async () => {
  const res = await teacherGetAllClassAPI(userStore.getUserInfo()!.roleId);

  if (res.data.code === 200) {
    classList.value = res.data.data.map((item) => {
      return {
        label: item.className,
        value: item.id,
      };
    });
  } else ElMessage.error(res.data.message);
};

const getAllCourse = async () => {
  const res = await teacherViewMyTeachCourseAPI(
    userStore.getUserInfo()!.roleId
  );

  if (res.data.code === 200) {
    options.value = res.data.data;
    console.log(options.value);
    value.value = options.value[0];
  } else {
    ElMessage.error(res.data.message);
  }
};

const getAllExam = async () => {
  const res = await teacherViewAllCourseAssignmentAPI(
    userStore.getUserInfo()!.roleId,
    state.value
  );

  if (res.data.code === 200) {
    console.log(res.data.data);
    tableData.value = res.data.data;
  } else {
    ElMessage.error(res.data.message);
  }
};

const toPublish = async () => {
  const res = await teacherPublishAssignmentAPI(
    2,
    currentExamData.value.examId,
    form.startTime,
    form.endTime,
    form.examTime,
    classValue.value
  );

  if (res.data.code === 200) {
    ElMessage.success("发布成功");

    getAllExam();
  } else {
    ElMessage.error(res.data.message);
  }

  postDialog.value=false
};

const toViewExam = (item: any) => {
  console.log(item);
  router.push("/course/" + item.courseId + "/exam/details/" + item.examId);
};

onMounted(() => {
  getAllExam();

  getAllCourse();

  getAllClass();
});
</script>

<style lang="scss" scoped>
.backBox {
  background: $primary-white-color;
  margin-right: 20px;
  min-height: calc(100vh - 120px);
  box-sizing: border-box;
  padding: 20px;

  .header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 18px;
      // color: $primary-color;
    }
  }

  .choose {
    margin-top: 20px;
    display: flex;
  }
}
</style>
