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
      :class="{subActive:getCurrentPath()==item.path}"
        v-for="item in navList"
        :key="item"
        :index="
          flag === 0 ? item.path : '/course/' + $route.params.id + item.path
        "
      >
        <span
          style="margin-right: 20px; font-weight: bold"
          :class="item.icon"
        ></span>
        <template #title>
         {{ item.text }}
        </template>
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
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isCollapse = ref(false);
const collapseText = ref("折叠");

const getCurrentPath = () => {
  let currentPath = route.path.split("/");

  // console.log(currentPath);

  for (let i = 0; i < navList.length; i++) {
    let path = navList[i].path.split("/");

    if (flag === 0) {
      if (path[2] == currentPath[2]) {
        return navList[i].path;
      }
    }
    else{
      if (path[1] === currentPath[3]) {
        
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

onMounted(()=>{

})
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo {
  background-color: #eaecfd;

  //background-color: $primary-background-color;
  background-color: white;
  //color: $primary-gray-text-color;
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
  //background: $primary-color;
  //color: $primary-white-color;
  color:$primary-color;
  border-radius: 5px;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  // min-height: 400px;
}

.leftNav {
  //margin-left: 20px;
  //margin-top: 10px;
  background-color: white;
  margin-bottom: 20px;
}

.subActive{
  //color: white;;
  color:$primary-color;
  // font-weight: bold;
  background-color: #eaecfd;

  //background-color: $primary-color;
}
</style>
