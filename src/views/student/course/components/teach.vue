<template>
  <div class="bigBox">
    <Course @click="$router.push('')" v-for="(item,index) in myCourseList" :key="index" :course="item"></Course>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import Course from "@/views/components/course.vue";
import { reactive, ref } from "vue";
import { type courseList } from '@/types/home'


const myCourseList=reactive<courseList>([{
  url: 'https://huaban.com/pins/5416019016?modalImg=https%3A%2F%2Fgd-hbimg.huaban.com%2F1ccedbedf6e6a0be2073e96e2aba5038bad63e8615432-RSejDR_fw1200',
  course: 'java',
  school: '吉首大学',
  status: 1,
  object: 'asddf',
}])


</script>

<style lang="scss" scoped>
.bigBox {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 320px);
  grid-gap: 20px;
}
</style>
