<template>
  <div class="homeworkDetailsBox">
    <span class="markHomeworkText">考试批阅</span>
    <!-- <hr> -->
    <br />
    <el-radio-group @change="getAllData" style="margin-bottom: 20px" v-model="status" size="large">
      <el-radio-button label="全部" :value="-1" />

      <el-radio-button label="待批阅" :value="1" />
      <el-radio-button label="已批阅" :value="2" />
      <el-radio-button label="未交" :value="0" />
    </el-radio-group>
    <br />
    <el-input :prefix-icon="Search" style="width: 200px" v-model="searchText" placeholder="请输入学号或者姓名"></el-input>

    <el-button @click="analysis" style="margin-left: 20px" type="success">学情分析</el-button>
    <br />
    <span class="grayText"> 创建时间：截至时间 </span>
    <el-table :data="filterTableData">
      <el-table-column prop="sno" label="id" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="status" label="状态">
        <template #default="scope">
          <el-tag v-if="scope.row.state === 0" type="danger">未交</el-tag>
          <el-tag v-else-if="scope.row.state === 1" type="success">待批阅</el-tag>
          <el-tag v-else type="warning">已完成</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="studentScore" label="成绩" />
      <el-table-column label="操作" fixed="right" min-width="240">
        <template #default="scope">
          <el-button type="primary" plain v-if="scope.row.state !== 0" @click="markExam(scope.row,scope.$index)">查看</el-button>
          <el-button type="warning" plain v-if="scope.row.state === 2"
            @click="analysisStudent(scope.row)">学情分析</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
2
<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { teacherViewAssignmentListAPI } from "@/apis/assignment";
import { ElMessage } from "element-plus";
import { useMarkStore } from "@/stores/markStore";

const route = useRoute();
const router = useRouter();

const markStore=useMarkStore()

const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !searchText.value ||
      data.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
      data.sno.toLowerCase().includes(searchText.value.toLowerCase())
  )
);

const tableData = ref([]);

const searchText = ref("");
const status = ref(2);

const markExam = (item: any,index:number) => {

  markStore.setActiveIndex(index)
  markStore.setMarkList(filterTableData.value)

  router.push(
    "/course/" +
    route.params.id +
    "/exam/details/" +
    route.params.assignmentId +
    "/" +
    item.studentAssignmentId
  );
};

const analysis = () => {
  router.push(
    "/course/" +
    route.params.id +
    "/exam/" +
    route.params.assignmentId +
    "/analysis"
  );
};

import { useNameStore } from "@/stores/nameStore";

const nameStore=useNameStore()

const analysisStudent = (item:any) => {

  nameStore.setName(item.name)

  // 用的是学号
  router.push(
    "/course/" +
    route.params.id +
    "/exam/" +
    route.params.assignmentId +
    "/analysis/" +
    item.sno
  );
};

const getAllData = async () => {
  if (status.value === -1) {
    const res = await teacherViewAssignmentListAPI(
      parseInt(route.params.assignmentId as string),
      2
    );

    if (res.data.code === 200) {
      console.log(res.data.data);
      tableData.value = res.data.data;
    } else ElMessage.error(res.data.message);
  }
  else {
    const res = await teacherViewAssignmentListAPI(
      parseInt(route.params.assignmentId as string),
      2,
      status.value
    );

    if (res.data.code === 200) {
      console.log(res.data.data);
      tableData.value = res.data.data;
    } else ElMessage.error(res.data.message);
  }


};

onMounted(() => {
  getAllData();
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
