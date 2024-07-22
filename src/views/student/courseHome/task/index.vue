<template>
  <div class="bigBox">
    <div class="left">
      <router-view :key="$route.params.taskId"></router-view>
    </div>
    <div class="right">
      <Content></Content>
    </div>
  </div>
</template>

<script lang='ts' setup>
// @ts-ignore
import Content from './components/content.vue';

</script>

<style lang='scss' scoped>
.bigBox{

  display: flex;
  justify-content: space-between;
  
  .left{
    flex:1;
    margin-right: 20px;
  }
}
</style>