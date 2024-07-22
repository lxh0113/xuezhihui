<template>
  <div class="homeworkDetailsBox">
    <span class="markHomeworkText">批改作业</span>
    <!-- <hr> -->
    <br />
    <el-radio-group style="margin-bottom: 20px" @change="getAllData" v-model="status" size="large">
      <el-radio-button label="全部" :value="2" />

      <el-radio-button label="待批改" :value="1" />
      <el-radio-button label="已批改" :value="0" />
      <el-radio-button label="未交" :value="3" />
    </el-radio-group>
    <br />
    <el-input
      :prefix-icon="Search"
      style="width: 200px"
      v-model="searchText"
      placeholder="请输入学号或者姓名"
    ></el-input>
    <!-- <el-button type="primary">搜索</el-button> -->
    <br />
    <span class="grayText">
      创建时间：截至时间 </span
    >
    <el-table :data="filterTableData">
      <el-table-column prop="sno" label="id" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag v-if="scope.row.state === 0" type="danger">未交</el-tag>
          <el-tag v-else type="success">{{scope.row.state===1?"待批阅":'已完成'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="studentScore" label="成绩" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="markHomework(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref,computed } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { teacherViewAssignmentListAPI } from "@/apis/assignment";
import { ElMessage } from "element-plus";

const route = useRoute();
const router = useRouter();

const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !searchText.value ||
      data.name.toLowerCase().includes(searchText.value.toLowerCase())||
      data.sno.toLowerCase().includes(searchText.value.toLowerCase())
  )
)

const tableData = ref([
  
]);

const searchText = ref("");
const status = ref(0);

const markHomework = (item: any) => {
  router.push(
    "/course/" + route.params.id + "/homework/details/" + route.params.assignmentId + "/1"
  );
};

const getAllData = async () => {
  const res = await teacherViewAssignmentListAPI(
    parseInt(route.params.assignmentId as string),
    1,
    status.value
  );

  if (res.data.code === 200) {
    console.log(res.data.data)
    tableData.value = res.data.data;
  } else ElMessage.error(res.data.message);
};

onMounted(() => {
  getAllData()
});
</script>

<style scoped lang="scss">
.homeworkDetailsBox {
  background: $primary-white-color;
  box-sizing: border-box;
  padding: 20px;
  min-height: calc(100vh - 120px);
  // margin-bottom: 20px;
  margin-right: 20px;
  border-radius: 5px;

  .markHomeworkText {
    color: $primary-color;
    font-weight: bold;
    font-size: 16px;
    line-height: 60px;
  }

  .grayText {
    color: $primary-gray-color;
    line-height: 60px;
  }
}
</style>
