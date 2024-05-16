<template>
  <div class="bigBox">
    <div class="left">
      <img src="@/assets/logo/logo.png" />
      <span> 学智汇 </span>
    </div>
    <div class="right">
      <el-badge style="margin-top:10px;" is-dot class="item">
        <el-icon size="20"><Bell /></el-icon>
      </el-badge>
      <img src="@/assets/image/avatar.jpeg" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Bell } from "@element-plus/icons-vue";

</script>

<style lang="scss" scoped>
.bigBox {
  height: 80px;
//   background-color: $primary-white-color;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  .left {
    display: flex;
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
