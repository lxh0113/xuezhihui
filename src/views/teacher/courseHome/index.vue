<template>
  <div class="backBox">
    <Header></Header>
    <div class="bottom">
      <NavVue :navList="navList" :flag="1"></NavVue>
      <div class="rightContent">
        <router-view></router-view>
      </div>
    </div>
  </div>

  <myChat></myChat>
</template>

<script lang="ts" setup>
// @ts-ignore
import Header from "@/views/home/components/header.vue";
// @ts-ignore
import NavVue from "@/views/home/components/nav.vue";
// @ts-ignore
import myChat from "@/views/chat/index.vue";
import { getCourseNavList } from "@/utils/courseNav";
import { type NavList } from "@/types/home";

const navList: NavList = getCourseNavList(2);
</script>

<style lang="scss" scoped>
.backBox {
  background-color: $primary-background-color;
  min-height: 100vh;
  min-width: 100vm;

  //   border: 0!important;

  .bottom {
    display: flex;

    .rightContent {
      margin-top:20px;
      flex: 1;
      margin-left: 20px;
      min-height: calc(100vh - 80px);
    }
  }
}
</style>
