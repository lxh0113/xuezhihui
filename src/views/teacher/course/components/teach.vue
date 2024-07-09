<template>
  <el-button
    @click="dialogFormVisible = true"
    :icon="Plus"
    type="primary"
    text="primary"
    style="margin-top: 10px"
    >新建</el-button
  >
  <div class="bigBox">
    <Course
      @click="toCourse(item.id)"
      @delete="deleteItem"
      v-for="(item, index) in myCourseList"
      :key="index"
      :course="item"
    ></Course>
  </div>

  <el-dialog v-model="dialogFormVisible" title="新建课程" width="500">
    <el-form :model="form" label-position="top">
      <el-form-item label="课程名">
        <el-input v-model="form.courseName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="上传封面">
        <el-upload
          size="large"
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="授课对象">
        <el-select placeholder="请选择授课对象" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addNewCourse">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
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

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border:1px dashed #dcdfe6;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
