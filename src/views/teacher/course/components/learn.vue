<template>
  <div class="bigBox">
    <Course @click="toCourse(item.id)" @delete="deleteItem" v-for="(item,index) in myCourseList" :key="index" :course="item"></Course>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import Course from "@/views/components/course.vue";
import { reactive, ref, onMounted } from "vue";
import { type courseList } from "@/types/home";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from 'element-plus'
import { teacherDeleteCourseAPI, teacherViewMyTeachCourseAPI,teacherAddCourseAPI } from '../../../../apis/course';

const imageUrl = ref('')
const dialogFormVisible = ref(false);
const userStore = useUserStore();
const router = useRouter();

const myCourseList = ref<courseList>([
  {
    id: 1,
    courseName: "java",
    createTime: "2024-12-2",
    userId: 1,
    image: "",
  },
]);

const form = ref({
  id: 0,
  courseName: "",
  createTime: "",
  userId: 0,
  image: "",
});

const toCourse = (id: number): void => {
  router.push(`/course/${id}`);
};

const getCourse = async () => {
  const res = await teacherViewMyTeachCourseAPI(userStore.getUserInfo().roleId);
  if (res.data.code === 200) {
    console.log(res.data.data);
    myCourseList.value = res.data.data;
  } else {
    // ElMessage
    ElMessage.error(res.data.message);
  }
};

const addNewCourse =async () => {

  form.value.userId=userStore.getUserInfo().id;
  form.value.createTime= new Date().toLocaleString();

  const res=await teacherAddCourseAPI(form.value.id,form.value.courseName,form.value.createTime,imageUrl.value)

  if(res.data.code===200)
  {
    ElMessage.success("新建成功")
    myCourseList.value.push({
      courseName:form.value.courseName,
      id:form.value.id,
      createTime:form.value.createTime,
      userId:form.value.userId,
      image:form.value.image
    })
  }else ElMessage.error(res.data.message)
  dialogFormVisible.value = false
};

const deleteItem = async (item: any) => {
  console.log(item.id);

  const res = await teacherDeleteCourseAPI(item.id);
  if (res.data.code === 200) {
    ElMessage.success("删除成功");
    myCourseList.value = myCourseList.value.filter((i) => {
      return i.id !== item.id;
    });
  } else ElMessage.error(res.data.message);
};

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

onMounted(() => {
  getCourse();
});
</script>

<style lang="scss" scoped>
.bigBox {
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 320px);
  grid-gap: 20px;
}
</style>
