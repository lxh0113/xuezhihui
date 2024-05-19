<template>
  <div class="backBox">
    <div class="left">
      <el-button type="primary" :icon="Plus">新建班级</el-button>
      <br>
      <div v-for="(item,index) in 4" class="link">
        <router-link active-class="active" to="/teacher/class/1">软件{{ index+1 }}班</router-link>
      </div>
    </div>
    <div class="right">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { Plus } from '@element-plus/icons-vue';

</script>

<style lang='scss' scoped>
.backBox{
  height: calc(100vh - 120px);
  margin-right:20px;
  display: flex;
  // width: 100%;
  // background-color:$primary-white-color;

  .left{
    width: 200px;
    box-sizing: border-box;
    padding:20px;
    margin-right: 20px;
    background-color: $primary-white-color;
  }

  .active{
    background: $primary-selected-background-color;
    color: $primary-color!important;;
    border-radius:5px;

  }

  .link{
    margin-top:10px;
    height: 50px;
    display: flex;
    align-items: center;
    box-sizing:border-box;
    // padding:10px;

    a{
      text-decoration: none;
      color:black;
      display: flex;
      height: 50px;
      width: 100%;
      align-items: center;
      // margin-left:10px;
      padding-left: 20px;
    }
  }

  .right{
    flex:1;
    // background: $primary-white-color;
  }
}
</style>