<template>
  <div class="backBox">
    <div class="head">
      <el-select tag-type="primary" :value="myClass" style="width: 240px">
        <el-option :value="1" label="软件一班"></el-option>
        <el-option :value="2" label="软件二班"></el-option>
      </el-select>
      <el-button
        style="margin-left: 30px; font-size: 18px"
        type="primary"
        text="primary"
        :icon="Checked"
        >签到</el-button
      >
      <el-button
        style="margin-left: 30px; font-size: 18px"
        type="primary"
        text="primary"
        :icon="UserFilled"
        >选人</el-button
      >
    </div>

    <div class="activities">
      <div class="title">
        <el-radio-group v-model="radio" class="ml-4">
          <el-radio value="1" size="large">全部</el-radio>
          <el-radio value="2" size="large">进行中</el-radio>
          <el-radio value="3" size="large">已结束</el-radio>
        </el-radio-group>
      </div>
      <hr />
      <div class="interactions">
        <interaction v-for="item in activities" :item="item">
          <template #mid>
            <p>二维码签到</p>
          </template>
        </interaction>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Checked, UserFilled } from "@element-plus/icons-vue";
import { ref } from "vue";
// @ts-ignore
import interaction from "@/views/components/interaction.vue";

const radio = ref('1')
interface typeList
  extends Array<{ type: "success" | "primary" | "info"; name: string }> {}

const activities: typeList = [
  { type: "success", name: "签到" },
  { type: "primary", name: "选人" },
];

const myClass = ref("1");
</script>

<style lang="scss" scoped>
.backBox {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 120px);
  // background: red;
  margin-right: 20px;

  .head {
    display: flex;
    background: $primary-white-color;
    height: 100px;
    align-items: center;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 5px;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .activities {
    // display: flex;
    flex: 1;
    background-color: $primary-white-color;
    // width:100%;
    margin-right: 20px;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 5px;

    .title {
      display: flex;
      align-items: center;
      // height: 50px;
      margin-bottom: 10px;

      .text {
        font-size: 18px;
        margin-right: 20px;
      }
    }
  }
}

.interactions {
  margin-top: 20px;
}
</style>
