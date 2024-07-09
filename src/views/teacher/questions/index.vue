<template>
  <div class="bigBox">
    <div class="header">
      <div class="title">题库管理</div>
      <div class="button">
        <el-button type="primary" :icon="Plus" @click="toAdd">新建题目</el-button>
        <!-- <el-button type="primary" :icon="Delete">删除</el-button> -->
        <el-button type="primary" :icon="Upload">智能导入</el-button>
      </div>
    </div>
    <hr />
    <div class="choose">
      <!-- <el-button style="font-size:16px;margin-right:20px;" type="primary" :icon="Upload" text="primary">上传</el-button> -->
      <el-input
        v-model="search"
        style="width: 200px"
        placeholder="请输入关键词"
        :prefix-icon="Search"
      />
    </div>
    <!-- <hr /> -->
    <el-table
      :data="filterTableData"
      :default-sort="{ prop: 'date', order: 'descending' }"
      style="width: 100%; margin-top: 20px"
    >
      <!-- <el-table-column type="selection" width="55" /> -->
      <el-table-column label="题干">
        <template #default="scope">
          {{ JSON.parse(scope.row.title).text }}
        </template>
      </el-table-column>

      <el-table-column label="题目类型" width="160px" prop="type" sortable />
      <el-table-column label="课程" width="200px" prop="courseName" sortable />

      <el-table-column prop="creatorName" width="160px" label="创建人" />
      <el-table-column label="操作">
        <template #default="scope">
          <!-- <el-button
            type="primary"
            text="primary"
            @click="$router.push('/teacher/questions/1')"
            >查看</el-button
          > -->
          <el-button
            size="large"
            :icon="Edit"
            type="primary"
            text="primary"
            @click="toEdit(scope.row)"
            >编辑</el-button
          >
          <el-button
            size="large"
            :icon="Delete"
            type="primary"
            text="primary"
            @click="toDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>

  
</template>

<script lang="ts" setup>
import { Plus, Delete, Search, Upload, Edit } from "@element-plus/icons-vue";
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import {
  teacherDeleteQuestionAPI,
  teacherViewCourseQuestionAPI,
} from "../../../apis/question";

const router = useRouter();
const route = useRoute();

interface Paper {
  id: number;
  type: string;
  title: string;
  answer: string;
  answerAnalysis: string;
  courseId: number;
  courseName: string;
  creatorId: number;
  creatorName: string;
}

const search = ref("");

const tableData = ref<Array<Paper>>();

const filterTableData = computed(() =>
  tableData.value?.filter(
    (data) =>
      !search.value || data.title.toLowerCase().includes(search.value.toLowerCase())
  )
);

const getQuestions = async () => {
  const res = await teacherViewCourseQuestionAPI(parseInt(route.params.id as string));
  if (res.data.code === 200) {
    tableData.value = res.data.data;
  } else ElMessage.error(res.data.message);
};

const toAdd = () => {
  router.push("/course/" + route.params.id + "/questions/add");
};

const toEdit = (item: any) => {
  router.push("/course/" + route.params.id + "/questions/edit/" + item.id);
};

const toDelete = async (item: any) => {
  const res = await teacherDeleteQuestionAPI(item.id);

  if (res.data.code === 200) {
    ElMessage.success("删除成功");
    getQuestions();
  } else {
    ElMessage.error(res.data.message);
  }
};



onMounted(() => {
  getQuestions();
});
</script>

<style lang="scss" scoped>
.bigBox {
  background-color: $primary-white-color;
  margin-right: 20px;
  min-height: calc(100vh - 120px);
  margin-bottom: 20px;
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
