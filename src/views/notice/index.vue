<template>
  <div class="noticeBox">
    <div class="title">
      <span class="text">消息</span>
    </div>
    <hr />
    <div class="interactions">
      <interaction v-for="item in activities" :item="item">
        <template #mid>
          <div>
            <p style="margin-bottom:5px;">作业一</p>
            <span>
              <el-tag type="danger" size="small">未读</el-tag>
              <span style="font-size:13px;margin-left:10px;color:#c4c9cc;">24-4 12：00</span>
            </span>
          </div>
        </template>
        <template #right>
          <span style="color:#2f3ced">删除</span>
        </template>
      </interaction>
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import interaction from "@/views/components/interaction.vue";
import { ref } from 'vue'

interface typeList
  extends Array<{ type: "success" | "primary" | "info"; name: string }> {}

const activities: typeList = [
  { type: "primary", name: "消息" },
  { type: "info", name: "消息" },
];
</script>

<style lang="scss" scoped>
.noticeBox {
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
