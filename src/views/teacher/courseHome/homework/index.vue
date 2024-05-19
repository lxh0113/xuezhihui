<template>
  <div class="backBox">
    <div class="head">
      <el-button
        style="font-size: 18px"
        :icon="Plus"
        type="primary"
        text="primary"
        >作业</el-button
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
        <el-radio-group v-model="radio" class="ml-4">
          <el-radio value="1" size="large">全部</el-radio>
          <el-radio value="2" size="large">未开始</el-radio>
          <el-radio value="2" size="large">进行中</el-radio>
          <el-radio value="2" size="large">已结束</el-radio>
        </el-radio-group>
      </div>

      <div class="homework">
        <div class="test">
          <div class="left">
            <div class="header">
              <span class="title">能力测试1</span>
              <el-tag style="margin-left: 20px" size="small" type="primary"
                >进行中</el-tag
              >
            </div>
            <p>2022级1班，2022级2班</p>
            <p>作答时间：2023-6-12 至 2024-3-20</p>
          </div>

          <div class="right">
            <span style="font-size: 26px">0</span>
            <span>待批</span>
            <span style="color: #ccc">101已交</span>
            <el-button style="font-size: 16px" type="primary" text="primary"
              >批阅</el-button
            >
            <el-button style="font-size: 16px" type="primary" text="primary"
              >删除</el-button
            >
            <el-button style="font-size: 16px" type="primary" text="primary"
              >修改设置</el-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Plus, Search } from "@element-plus/icons-vue";
import { ref } from "vue";

const radio = ref("1");
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

    .homework {
      margin-top: 10px;
      box-sizing: border-box;
      padding: 10px;
    }

    .test {
      display: flex;
      justify-content: space-between;
      height: 100px;
      // background: red;

      .left {
        .header {
          display: flex;
          align-items: center;
        }

        .title {
          font-size: 20px;
          line-height: 50px;
          // display: flex;
        }

        p {
          color: #ccc;
        }
      }

      .right {
        display: flex;
        align-items: flex-end;

        span {
          line-height: 45px;
          margin-right: 20px;
        }
      }
    }
  }
}
</style>
