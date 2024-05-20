<template>
  <div class="leftNav">
    <div style="height: 10px"></div>
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      router
      :default-active="getCurrentPath()"
    >
      <el-menu-item
        v-for="item in navList"
        :index="
          flag === 0 ? item.path : '/course/' + $route.params.id + item.path
        "
      >
        <span
          style="margin-right: 20px; font-weight: bold"
          :class="item.icon"
        ></span>
        <template #title>{{ item.text }}</template>
      </el-menu-item>
    </el-menu>

    <el-button
      style="margin-top: 10px; height: 40px"
      @click="() => (isCollapse = !isCollapse)"
    >
      {{ collapseText }}
    </el-button>
  </div>
</template>

<script lang="ts" setup>
import { type Nav, type NavList } from "@/types/home";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isCollapse = ref(false);
const collapseText = ref("折叠");

const getCurrentPath = () => {
  let currentPath = route.path.split("/");

  console.log(currentPath);

  for (let i = 0; i < navList.length; i++) {
    let path = navList[i].path.split("/");

    if (flag === 0) {
      if (path[2] == currentPath[2]) {
        return navList[i].path;
      }
    }
    else{
      if (path[3] == currentPath[3]) {
        return navList[i].path;
      }
    }
  }
};

watch(isCollapse, (newValue) => {
  if (newValue === false) collapseText.value = "收起";
  else collapseText.value = "展开";
});

const { navList, flag } = withDefaults(
  defineProps<{
    navList: NavList;
    flag?: number;
  }>(),
  {
    navList: () => Array<Nav>(), // 设置 navList 的默认值为一个空数组
    flag: 0, // 设置 flag 的默认值为 0
  }
);
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
  // min-height: 400px;
}

.leftNav {
  margin-left: 20px;
  margin-top: 10px;
}
</style>
