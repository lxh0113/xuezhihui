<template>
  <!-- 11 -->
  <div class="bigBox">
    <div class="left">
      <Edit></Edit>
    </div>
    <div class="right">
      <Course></Course>
    </div>
  </div>
</template>

<script lang='ts' setup>
import Edit from "./components/edit.vue"
import Course from "./components/course.vue"
</script>

<style lang='scss' scoped>
.bigBox{
  display: flex;
  justify-content: space-between;

  .left{
    flex:1;
    // background: red;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .right{
    width: 300px;
    margin-right: 20px;
    margin-bottom: 20px;
  }
}
</style>