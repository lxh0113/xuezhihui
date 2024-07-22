<template>
  <div class="backBox">
    <Header></Header>
    <div class="bottom">
      <Nav :navList="navList"></Nav>
      <div class="rightContent">
        <router-view> </router-view>
      </div>
    </div>
  </div>

  <myChat></myChat>
</template>

<script lang="ts" setup>
// @ts-ignore
import Header from "@/views/home/components/header.vue";
// @ts-ignore
import Nav from "@/views/home/components/nav.vue";
// @ts-ignore
import myChat from "@/views/chat/index.vue";

import { getNavList } from "@/utils/nav";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();

const navList = getNavList(userStore.getUserInfo()!.identity);
</script>

<style lang="scss" scoped>
.backBox {
  background-color: $primary-background-color;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  flex-direction: column;

  //   border: 0!important;

  .bottom {
    display: flex;
    //background-color: white;

    .rightContent {
    //background-color: white;

      margin-top: 20px;
      flex: 1;
      margin-left: 20px;
      min-height: calc(100vh - 80px);
    }
  }
}
</style>
