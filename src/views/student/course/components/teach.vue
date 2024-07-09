<template>
  <div class="bigBox">
    <Course v-for="(item,index) in myCourseList" @click="toCourse(item.id)" :key="index" :course="item"></Course>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import Course from "@/views/components/course.vue";
import { reactive, ref,onMounted } from "vue";
import { type courseList } from '@/types/home'
import { useUserStore } from "@/stores/userStore";
import { ElMessage } from "element-plus";
import { useRoute,useRouter } from "vue-router";
import { studentViewMyCourseAPI } from '../../../../apis/course';

const userStore=useUserStore()
const router=useRouter()
const route=useRoute()

const myCourseList=ref<courseList>([{
  id:1,
  courseName:'java',
  createTime:'2024-12-2',
  userId:1,
  image:''
}])

const toCourse=(id:number)=>{
  console.log(route.params)
  router.push('/course/'+id)
}

const getCourse=async()=>{
  const res=await studentViewMyCourseAPI
  (userStore.getUserInfo().id);
  if(res.data.code===200)
  {
    console.log(res.data.data)
    myCourseList.value=res.data.data
  }
  else {
    ElMessage.error(res.data.message)
  }
}

onMounted(()=>{
  getCourse();
})
</script>

<style lang="scss" scoped>
.bigBox {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 320px);
  grid-gap: 20px;
}
</style>
