<template>
  <el-button @click="dialogFormVisible = true" :icon="Plus" type="primary" text="primary"
    style="margin-top: 10px">新建</el-button>
  <div class="bigBox">
    <Course @click="toCourse(item.id)" @delete="deleteItem" v-for="(item, index) in myCourseList" :key="index"
      :course="item"></Course>
  </div>

  <el-dialog v-model="dialogFormVisible" title="新建课程" width="500">
    <el-form :model="form" label-position="top">
      <el-form-item label="课程名">
        <el-input v-model="form.courseName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="上传封面">
        <el-upload size="large" class="avatar-uploader" action="http://192.168.50.199:8079/activity/getImagePath"
          :show-file-list="false" name="image" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
          <img style="max-width: 300px;" v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </el-form-item>
      <el-form-item label="授课对象">
        <el-select-v2 v-model="form.classList" :options="classListOptions" placeholder="选择班级" style="width: 240px"
          multiple />
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
import { teacherDeleteCourseAPI, teacherViewMyTeachCourseAPI, teacherAddCourseAPI, setCourseClassAPI } from '../../../../apis/course';
import { teacherGetAllClassAPI } from "../../../../apis/assignment";

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
  classList: []
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

const classList = ref([]);
const classListOptions = ref([])

const setClassList = async () => {
  const res = await teacherGetAllClassAPI();
  if (res.data.code === 200) {
    classList.value = res.data.data;

    classListOptions.value = classList.value.map(item => {
      return {
        label: item.className,
        value: item.id
      }
    })
  } else {
    ElMessage.error(res.data.message);
  }
};

let courseId = null

const setClass = async () => {
  const res = await setCourseClassAPI(courseId, form.value.classList)

  if (res.data.code === 200) {

  }
  else {
    ElMessage.error(res.data.message)
  }

}

function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以要加1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}


const addNewCourse = async () => {

  form.value.userId = userStore.getUserInfo().id;
  form.value.createTime = formatDate(new Date());

  const res = await teacherAddCourseAPI(form.value.id, form.value.courseName, form.value.createTime, imageUrl.value, null)

  if (res.data.code === 200) {
    ElMessage.success("新建成功")
    myCourseList.value.push({
      courseName: form.value.courseName,
      id: form.value.id,
      createTime: form.value.createTime,
      userId: form.value.userId,
      image: form.value.image
    })

    courseId = res.data.data

    // 设置授课对象
    setClass()

  } else ElMessage.error(res.data.message)
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
  response
) => {
  imageUrl.value = response.data
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

  setClassList()
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
  border: 1px dashed #dcdfe6;
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
