<template>
  <div class="backBox">
    <div class="header">
      <el-input
        v-model="input"
        style="width: 240px"
        placeholder="请输入关键词"
        :prefix-icon="Search"
      />
      <el-button icon="Delete" style="margin-left:20px">删除</el-button>
    </div>
    <hr />
    <el-table
      :data="tableData"
      :default-sort="{ prop: 'date', order: 'descending' }"
      style="width: 100%; margin-top: 20px"
      size="large"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column prop="questions" label="题目" sortable width="420"/>
      <el-table-column prop="myAnswer" label="我的答案" width="180" />
      <el-table-column prop="trueAnswer" label="正确答案" />
      <el-table-column prop="course" label="课程" sortable />
      <el-table-column label="操作"> 
        <template #default="scope">
         <span style="color:#2f3ced">查看</span>
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
  questions: string;
  myAnswer: string;
  trueAnswer: string;
  course: string;
}


const tableData: User[] = [
  {
   questions:'wakkkkkkkk',
   myAnswer:'A',
   trueAnswer:'B',
   course:'java'
  },
  {
   questions:'wakkkkkkkk',
   myAnswer:'A',
   trueAnswer:'B',
   course:'java'
  }
  
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
    display: flex;
  }
}
</style>
