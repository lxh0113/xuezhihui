<template>
  <div class="backBox">
    <div class="head">
      <el-button
        style="font-size: 18px"
        :icon="Plus"
        type="primary"
        text="primary"
        >新建考试</el-button
      >
    </div>
    <hr />
    <div class="bottom">
      <div class="choose">
        <el-input
          style="width: 200px; margin-right: 20px"
          :prefix-icon="Search"
          placeholder="搜索"
        ></el-input>
        <el-select
          style="width: 200px; margin-right: 20px"
          placeholder="请输入"
        ></el-select>
      </div>

      <el-table
        :data="tableData"
        :default-sort="{ prop: 'date', order: 'descending' }"
        style="width: 100%; margin-top: 20px"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column label="试卷名称" prop="name" width="320"/>
        <el-table-column label="题库" prop="questionsBank"/>
        <el-table-column label="试卷名称" prop="builder"/>
        <el-table-column prop="questionsNumber" label="题量" />
        <el-table-column prop="score" label="总分" />
        <el-table-column prop="date" label="创建日期" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" text="primary">下载</el-button>
            <el-button type="primary" text="primary">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Plus, Search } from "@element-plus/icons-vue";
import { ref } from "vue";

import type { TableColumnCtx } from "element-plus";

interface User {
  name: string;
  questionsBank: string;
  builder: string;
  questionsNumber: number;
  score:number;
  date:string;
}

const formatter = (row: User, column: TableColumnCtx<User>) => {
  return row.date;
};

const tableData: User[] = [
  {
    name: '哇卡卡卡',
  questionsBank: 'wwww',
  builder: '我的精神很好',
  questionsNumber: 12,
  score:96,
  date:'20230122',
  },
];
</script>

<style lang="scss" scoped>
.backBox {
  background: $primary-white-color;
  box-sizing: border-box;
  padding: 20px;
  height: calc(100vh - 120px);
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
