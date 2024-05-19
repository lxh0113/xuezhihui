<template>
  <div class="classBox">
    <div class="header">
      <div class="title">软件一班</div>
      <div class="button">
        <el-button type="primary" :icon="Plus">新建</el-button>
        <el-button type="primary" :icon="Delete">删除</el-button>
      </div>
    </div>
    <hr />
    <div class="choose">
      <!-- <el-button style="font-size:16px;margin-right:20px;" type="primary" :icon="Upload" text="primary">上传</el-button> -->
      <el-input
        style="width: 240px"
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
      <el-table-column label="姓名" prop="name" sortable />
      <el-table-column prop="account" label="学号" />
      <el-table-column prop="avatar" label="头像"> 
        <template #default="scope">
            <img style="width:50px;height:50px;border-radius:50%" :src="scope.row.avatar" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱"/>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" text="primary">学情分析</el-button>
          <el-button type="primary" text="primary">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import { Plus, Delete, Search } from "@element-plus/icons-vue";
import { ref } from "vue";
const input = ref("");

import type { TableColumnCtx } from "element-plus";

interface User {
  name: string;
  account: string;
  avatar: string;
  email: string;
}

const tableData: User[] = [
  {
    name: "哇卡卡卡",
    account: "20222222",
    avatar: "",
    email: "122212121",
  },
];
</script>

<style lang="scss" scoped>
.classBox {
  background: $primary-white-color;
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
      color: $primary-color;
    }
  }

  .choose {
    margin-top: 20px;
  }
}
</style>
