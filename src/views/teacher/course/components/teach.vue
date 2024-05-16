<template>
  <div class="bigBox">
    <Course @click="toCourse(item.id)" v-for="(item,index) in myCourseList" :key="index" :course="item"></Course>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import Course from "@/views/components/course.vue";
import { reactive, ref } from "vue";
import { type courseList } from '@/types/home'
import { useRouter } from "vue-router";

const router=useRouter()

const myCourseList=reactive<courseList>([{
  id:1,
  url: 'https://huaban.com/pins/5416019016?modalImg=https%3A%2F%2Fgd-hbimg.huaban.com%2F1ccedbedf6e6a0be2073e96e2aba5038bad63e8615432-RSejDR_fw1200',
  course: 'java',
  school: '吉首大学',
  status: 2,
  object: '22软1，22软2',
}])

const toCourse=(id:number):void=>{
  router.push(`/course/${id}`)
}


</script>

<style lang="scss" scoped>
.bigBox {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 320px);
  grid-gap: 20px;
}
</style>
