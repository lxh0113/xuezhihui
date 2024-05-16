<template>
  <div class="backBox">
    <div class="title">
      <span class="text">筛选</span>
      <el-radio-group v-model="radio1" class="ml-4">
        <el-radio value="1" size="large">全部</el-radio>
        <el-radio value="2" size="large">已完成</el-radio>
        <el-radio value="3" size="large">未完成</el-radio>
      </el-radio-group>
    </div>
    <hr />
    <div class="interactions">
      <interaction v-for="item in activities" :item="item">
        <template #mid>
          <div>
            <p style="margin-bottom:5px;">作业一</p>
            <el-tag size="small">已交</el-tag>
          </div>
        </template>
        <template #right>
          <p style="color:#ffc082">还剩下4小时</p>
        </template>
      </interaction>
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import interaction from "@/views/components/interaction.vue";
import { ref } from 'vue'

const radio1 = ref('1')

interface typeList
  extends Array<{ type: "success" | "primary" | "info"; name: string }> {}

const activities: typeList = [
  { type: "primary", name: "作业" },
  { type: "info", name: "作业" },
];
</script>

<style lang="scss" scoped>
.backBox {
  // width: 100%;
  margin-right: 20px;
  height: calc(100vh - 120px);
  background-color: $primary-white-color;
  box-sizing: border-box;
  padding: 30px;
  border-radius: 5px;

  .title {
    display: flex;
    align-items: center;
    height: 50px;

    .text {
      font-size: 18px;
      margin-right: 20px;
    }
  }
}

.interactions {
  margin-top: 20px;
}
</style>
