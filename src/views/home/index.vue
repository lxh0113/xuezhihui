<template>
  <div class="backBox">
    <Header></Header>
    <div class="bottom">
      <div class="leftNav">
        <el-button 
          style="margin-bottom:10px;height: 40px;" 
          @click="() => (isCollapse = !isCollapse)"
        >
          {{ collapseText }}
        </el-button>
        <el-menu
          default-active="/1"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
        >
          <el-menu-item v-for="(item,index) in studentNavList" :index="index">
            <el-icon><icon-menu /></el-icon>
            <template #title>{{ item.text }}</template>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="rightContent">
        <router-view> </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Header from "@/views/home/components/header.vue";
import { ref, watch } from "vue";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";

import { studentNavList } from '@/utils/nav.ts'

const isCollapse = ref(false);
const collapseText = ref("折叠");

watch(isCollapse, (newValue) => {
  if (newValue === false) collapseText.value = "收起";
  else collapseText.value = "展开";
});


</script>

<style lang="scss" scoped>
.el-menu-vertical-demo {
  background-color: $primary-background-color;
  color: $primary-gray-text-color;
}

.el-menu {
  border: 0 !important;
}

//设置字体颜色
.el-aside {
  color: $primary-gray-text-color;
}

//设置当前被选中的一级菜单
.el-menu-item.is-active {
  border: 0;
  background: $primary-color;
  color: $primary-white-color;
  border-radius: 5px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.backBox {
  background-color: $primary-background-color;
  height: 100vh;
  width: 100vm;
  //   border: 0!important;

  .leftNav{
    margin-left:20px;
    margin-top:10px;
  }
}
</style>
