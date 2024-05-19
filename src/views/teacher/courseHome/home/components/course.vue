<template>
  <div class="backBox">
    <!-- 123 -->
    <div class="courseImage">
      <img src="@/assets/image/course.jpg" alt="" />
      <div class="courseName">人工智能</div>
    </div>
    <div class="changeImage">更换封面</div>
    <hr />

    <el-form
      label-position="top"
      label-width="auto"
      :model="formLabelAlign"
      style="margin-top:20px;"
    >
      <el-form-item label="课程名称">
        <el-input v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="授课对象">
        <el-input v-model="formLabelAlign.object" />
      </el-form-item>

      <el-form-item style="margin-top:50px;">
        <el-button type="primary">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormProps } from "element-plus";

const labelPosition = ref<FormProps["labelPosition"]>("right");

const formLabelAlign = reactive({
  name: "人工智能",
  object: ""
});
</script>

<style lang="scss" scoped>
.backBox {
  // height: 400px;
  background-color: $primary-white-color;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;

  .courseImage {
    border-radius: 10px;
    overflow: hidden;
    height: 180px;
    position: relative;

    img {
      width: 260px;
      height: 180px;
    }

    .courseName {
      position: absolute;
      bottom: 0;
      // display: block;
      // line-height: 40px;
      width: 260px;
      padding: 10px;
      color: $primary-white-color;
      background: rgba($color: #ccc, $alpha: 0.5);
    }
  }

  .changeImage {
    line-height: 80px;
    color: $primary-color;
  }
}
</style>
