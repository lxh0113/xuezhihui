<template>
  <div class="backBox">
    <div class="loginBox">
      <div class="logo">
        <img src="../../assets/logo/logo.png" alt="" />
        <span>学智汇</span>
      </div>
      <div class="loginText">
        <h1>注册</h1>
        <p>请先进行注册后在继续其他操作</p>
      </div>
      <el-form
        :model="form"
        label-position="top"
        label-width="auto"
        style="width: 420px; margin-top: 20px"
      >
        <el-form-item label="邮箱">
          <el-input
            placeholder="请输入邮箱"
            :prefix-icon="User"
            v-model="form.email"
          />
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            placeholder="请输入密码"
            :prefix-icon="Lock"
            type="password"
            v-model="form.password"
          />
        </el-form-item>

        <el-form-item label="验证">
          <el-input
            style="width: 300px"
            :prefix-icon="Lock"
            placeholder="请输入验证码"
          ></el-input>
          <el-button style="margin-left: 10px" type="success"
            >获取验证码</el-button
          >
        </el-form-item>

        <p @click="$router.push('/forget')" class="registerAccountText">
            忘记密码
        </p>

        <el-form-item>
          <el-button style="width: 420px; margin-top: 20px" type="primary"
            >注册</el-button
          >
        </el-form-item>
      </el-form>

      <div class="bottomText">
        <span>已有账号，</span>
        <span @click="$router.push('/login')">去登陆</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { User, Lock } from "@element-plus/icons-vue";

const form = reactive({
  email: "",
  password: "",
  type: [],
});
</script>

<style lang="scss" scoped>
.backBox {
  background: #f5f7fd;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 60px;
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      margin-left: 20px;
      font-weight: bold;
      color: $primary-title-color;
      font-size: 30px;
    }
  }

  .loginText {
    font-size: 12px;
    color: $primary-title-color;

    p {
      color: $primary-gray-color;
      margin-top: 10px;
    }
  }

  .loginBox {
    display: flex;
    flex-direction: column;
    background: $primary-white-color;

    padding: 40px;
  }

  .registerAccountText{
    color:$primary-gray-color;
    font-size:14px;
    cursor: pointer;
  }

  .bottomText {
    display: flex;
    justify-content: center;

    span:nth-child(2) {
      color: $primary-color;
      cursor: pointer;
    }
  }
}
</style>
