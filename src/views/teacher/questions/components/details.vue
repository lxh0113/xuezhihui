<template>
  <div class="bigBox">
    <div class="header">
      <div class="title">哇咔咔</div>
      <div class="button">
        <el-button type="primary" :icon="Plus" @click="$router.push('/teacher/questions/add')">新建题目</el-button>
        <el-button type="primary" :icon="Delete">删除</el-button>
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
    </div>
    <!-- <hr /> -->
    <el-table
      :data="tableData"
      :default-sort="{ prop: 'date', order: 'descending' }"
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="题目" prop="questions" sortable />
      <el-table-column prop="type" label="类型" />

      <el-table-column prop="builder" label="创建人" />
      <el-table-column prop="date" label="创建日期" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" text="primary">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { Plus, Delete, Search, Upload } from "@element-plus/icons-vue";
import { ref } from "vue";
const input = ref("");

const start = ref("");
const end = ref("");
const defaultTime = new Date(2000, 1, 1, 12, 0, 0);

import type { TableColumnCtx } from "element-plus";

interface Paper {
  questions: string;
  type: string;
  builder: string;
  date: string;
}

const tableData: Paper[] = [
  {
    questions: "1111111",
    type: "选择题",
    builder: "www",
    date: "2024-12-1",
  },
];
</script>

<style lang="scss" scoped>
.bigBox {
  background-color: $primary-white-color;
  margin-right: 20px;
  height: calc(100vh - 120px);
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
