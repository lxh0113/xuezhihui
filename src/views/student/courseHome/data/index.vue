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
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="bytes" label="大小" width="180" />
      <el-table-column prop="builder" label="创建者" />
      <el-table-column prop="date" label="创建日期" :formatter="formatter" />
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
import { ref } from "vue";
import { Folder, FolderChecked, Search } from "@element-plus/icons-vue";
const input = ref("");

import type { TableColumnCtx } from "element-plus";

interface User {
  name: string;
  bytes: string;
  builder: string;
  date: string;
}

const formatter = (row: User, column: TableColumnCtx<User>) => {
  return row.date;
};

const tableData: User[] = [
  {
    date: "2016-05-03",
    name: "文件",
    bytes: "--",
    builder: "wakkk",
  },
  {
    date: "2016-05-03",
    name: "文件",
    bytes: "--",
    builder: "wakkk",
  },
];
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
