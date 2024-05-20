<template>
  <div class="backBox">
    <div class="loginBox">
      <div class="logo">
        <img src="../../assets/logo/logo.png" alt="" />
        <span>学智汇</span>
      </div>
      <div class="loginText">
        <h1>登录</h1>
        <p>请先登录才能进行其他操作</p>
      </div>
      <el-form
        :model="form"
        label-position="top"
        label-width="auto"
        style="width: 420px;margin-top:20px;"
      >
        <el-form-item label="邮箱">
          <el-input :prefix-icon="User" v-model="form.email" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input :prefix-icon="Lock" type="password" v-model="form.password" />
        </el-form-item>
        <el-form-item>
          <el-checkbox-group v-model="form.type">
            <el-checkbox value="1" name="type">
              记住我
            </el-checkbox>
          </el-checkbox-group>
          <p style="margin-left: 294px;color:gray" @click="$router.push('/forget')">忘记密码</p>
        </el-form-item>

        <el-form-item>
          <el-button @click="login" style="width: 420px;" type="primary">登录</el-button>
        </el-form-item>
      </el-form>

      <div class="bottomText">
        <span>没有账号？</span>
        <span @click="$router.push('/register')">去注册</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { User, Lock } from '@element-plus/icons-vue'
import { loginAPI } from "@/apis/user";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";


const userStore=useUserStore()

const router=useRouter()

const form = reactive({
  email: "",
  password: "",
  type:[]
});

const login=async ()=>{
  const res=await loginAPI({account:form.email,password:form.password})

  if(res.data.code===200)
  {
    userStore.setUserInfo(res.data.data);
    // userStore.changeIsLogin(true);
    // console.log(res.data)
    ElMessage.success('登录成功')
    setTimeout(()=>{
      router.push('/')
    },2000)
  }
  else{
    ElMessage.error(res.data.message)
  }
}


</script>

<style lang="scss" scoped>

.backBox{
  background: #f5f7fd;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  img{
    width: 60px;
  }

  .logo{
    display: flex;
    justify-content: center;
    align-items: center;

    span{
      margin-left: 20px;
      font-weight: bold;
      color:$primary-title-color;
      font-size: 30px;
    }
  }

  .loginText{
    font-size: 12px;
    color:$primary-title-color;

    p{
      color:$primary-gray-color;
      margin-top: 10px;
    }
  }


  .loginBox{
    display: flex;
    flex-direction: column;
    background: $primary-white-color;

    padding:40px;
  }

  .bottomText{
    display: flex;
    justify-content: center;

    span:nth-child(2)
    {
      color:$primary-color;
      cursor: pointer;
    }
  }
}
</style>
