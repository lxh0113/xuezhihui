<template>
  <div class="bigBox">
    <div class="left">
      <img src="@/assets/logo/logo.png" @click="$router.push('/')" />
      <span @click="$router.push('/')"> 学智汇 </span>
    </div>
    <div class="right">
      <el-badge style="margin-top:10px;" is-dot class="item">
        <el-icon size="20"><Bell /></el-icon>
      </el-badge>
      <el-icon style="margin-left:30px;" size="20"><Setting /></el-icon>
      <el-icon style="margin-left:30px;" size="20"><Refresh /></el-icon>
      <!-- <img :src="userStore.getUserInfo().avatar" alt="" /> -->
      <el-dropdown>
        <img :src="userStore.getUserInfo().avatar" alt="" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="$router.push('/login')">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Bell, FullScreen, Setting } from "@element-plus/icons-vue";
import { useUserStore } from "@/stores/userStore";

const userStore=useUserStore()

console.log(userStore.getUserInfo()?.avatar)
</script>

<style lang="scss" scoped>
.bigBox {
  height: 70px;
   background-color: $primary-white-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  

  .left {
    display: flex;
    background-color: white;
    align-items: center;
    padding-left: 30px;

    img {
      width: 70px;
    }

    span {
      color: $primary-title-color;
      font-size: 22px;
      font-weight: bold;
      margin-left: 10px;
    }
  }

  .right {
    padding-right: 40px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    align-items: center;
    
    img {
      width: 40px;
      border-radius: 50%;
      margin-left: 30px;
    }
  }
}
</style>
