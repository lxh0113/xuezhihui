<template>
  <div class="backBox">
    <div class="header">基本信息</div>
    <hr />
    <el-form
      label-position="top"
      label-width="auto"
      :model="formLabelAlign"
      style="max-width:600px;margin-top:20px"
    >
      <el-form-item label="名字">
        <img src="@/assets/image/avatar.jpeg" alt="">
      </el-form-item>
      <el-form-item label="名字">
        <el-input :prefix-icon="User" v-model="formLabelAlign.name" />
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input :prefix-icon="Unlock" v-model="formLabelAlign.email" />
      </el-form-item>
      <el-form-item label="学校">
        <el-input :prefix-icon="School" v-model="formLabelAlign.school" />
      </el-form-item>

      <el-form-item style="margin-top:60px;">
        <el-button type="primary">修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormProps } from "element-plus";
import { School, Unlock, User } from "@element-plus/icons-vue";

const formLabelAlign = reactive({
  name: "",
  email: "",
  school: "",
});
</script>

<style lang="scss" scoped>
.backBox {
  background-color: $primary-white-color;
//   height: 500px;
  box-sizing: border-box;
  padding: 20px;

  .header {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
  }

  img{
    width: 100px;
    border-radius: 10px;
  }
}
</style>
