<template>
  <div class="backBox">
    <div class="header">
      <el-input
        v-model="input"
        style="width: 240px"
        placeholder="请输入关键词"
        :prefix-icon="Search"
      />
    </div>
    <hr />
    <el-table
      :data="tableData"
      :default-sort="{ prop: 'date', order: 'descending' }"
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="文件名" sortable width="320">
        <template #default="scope">
          <div style="display: flex; align-items: center">
            <el-icon color="#2f3ced" size="20"><Folder /></el-icon>
            <span style="margin-left: 10px">{{ scope.row.content }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="bytes" label="大小" width="180" />
      <el-table-column prop="creatorName" label="创建者" />
      <el-table-column prop="createTime" label="创建日期" :formatter="formatter" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="mid">下载</el-button>
          <el-button size="mid">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { Folder, FolderChecked, Search } from "@element-plus/icons-vue";
import { ElMessage, TableColumnCtx } from "element-plus";
import { useRoute } from "vue-router";
import { studentGetAllResourceAPI } from "../../../../apis/resource";

const route = useRoute();
const input = ref("");

interface User {
  id: number;
  courseId: number;
  content: string;
  createTime: string;
  creatorId: number;
  creatorName: string;
}

const formatter = (row: User, column: TableColumnCtx<User>) => {
  return row.createTime;
};

const tableData = ref<User[]>([]);

const getAllData = async () => {
  const res = await studentGetAllResourceAPI(parseInt(route.params.id as string));

  // console.log(res.data)

  if (res.data.code === 200) {
    tableData.value = res.data.data;
  } else {
    ElMessage.error(res.data.message);
  }
};

onMounted(() => {
  getAllData();
});
</script>

<style lang="scss" scoped>
.backBox {
  height: calc(100vh - 120px);
  margin-right: 20px;
  background-color: $primary-white-color;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 20px;

  .header {
    margin-bottom: 20px;
  }
}
</style>
