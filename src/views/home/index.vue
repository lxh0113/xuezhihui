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
</template>

<script lang="ts" setup>
// @ts-ignore
import Header from "@/views/home/components/header.vue";
// @ts-ignore
import Nav from "@/views/home/components/nav.vue";
import { getNavList } from "@/utils/nav";
import { useUserStore } from "@/stores/userStore";

const userStore=useUserStore()

const navList=getNavList(userStore.getUserInfo()!.identity)
</script>

<style lang="scss" scoped>

.backBox {
  background-color: $primary-background-color;
  height: 100vh;
  width: 100vm;

  //   border: 0!important;

  .bottom {
    display: flex;

    .rightContent{
      flex:1;
      margin-left: 20px;
      height: calc(100vh - 80px);
    }
  }
}
</style>
