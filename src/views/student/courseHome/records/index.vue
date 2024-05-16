<template>
  <div class="bigBox">
    <div class="left">
      <Task></Task>
    </div>
    <div class="mid">
      <div class="signIn">
        <SignIn></SignIn>
      </div>
      <div class="homework">
        <Homework></Homework>
      </div>
    </div>
    <div class="right">
      <Exam></Exam>
    </div>
  </div>
</template>

<script lang='ts' setup>
import Task from './components/task.vue';
import SignIn from './components/signIn.vue';
import Homework from './components/homework.vue';
import Exam from './components/exam.vue';
</script>

<style lang='scss' scoped>
.bigBox{
  
  display: flex;
  flex-wrap: wrap;
  height: 500px;
  
  .left{
    flex:1.5;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .mid{
    flex:1;
    display: flex;
    flex-direction: column;

    .signIn,.homework{
      flex:1;
      margin-right: 20px;
      margin-bottom: 20px;
      border-radius: 5px;
    }
  }

  .right{
    flex:1.5;
    margin-bottom: 20px;
    margin-right: 20px;
  }
}
</style>