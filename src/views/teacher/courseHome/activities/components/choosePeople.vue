<template>
  <div class="chooseBox">
    <div class="left" style="margin-right: 40px">
      <span class="uploadImage">上传图片</span>
      <el-upload
        class="avatar-uploader"
        :auto-upload="false"
        :on-change="uploadImage"
        :show-file-list="false"
      >
        <img style="width:600px;height:400px" v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </div>
    <div class="right">
      <span class="uploadImage"> 选择结果 </span>
      <img :src="currentImage" alt="" />
      <el-button @click="stop" style="margin-top: 20px; width: 100px" type="primary"
        >停止选人</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";

import type { UploadProps } from "element-plus";
import {
  teacherChooseAPI,
  teacherCreateChoosePeopleAPI,
  uploadImageAPI,
} from "@/apis/activity";
import { useRoute, useRouter } from "vue-router";
import { useClassStore } from "@/stores/classStore";
import { useUserStore } from "@/stores/userStore";

const route = useRoute();
const router = useRouter();
const classStore = useClassStore();
const userStore = useUserStore();

const imageUrl = ref("");
const currentImage = ref("");
const myData = ref({
  activityId:1
});

const uploadImage = async (uploadFile) => {
  console.log(uploadFile);

  let data = new FormData();

  data.append("image", uploadFile.raw);

  console.log(uploadFile.raw)

  console.log(data)

  const res = await uploadImageAPI(data);


  if (res.data.code === 200) {
    imageUrl.value = res.data.data;

    // 选人

    const response = await teacherCreateChoosePeopleAPI(
      parseInt(route.params.id as string),
      classStore.getCurrentClass(),
      // 6,
      userStore.getUserInfo().roleId,
      "选人",
      null,
      null,
      0,
      imageUrl.value
    );

    if (response.data.code === 200) {

      console.log(response.data.data)

      myData.value = response.data.data;

      imageList.value = response.data.data.studentList;

      setTimer()
    }
  }
};

const imageList = ref([]);

let timer = null;
let index = 0;

const setTimer = () => {
  timer = setInterval(() => {
    currentImage.value = imageList.value[index].faceImage;
    index = (index + 1) % imageList.value.length;
  }, 200);
};
const stop = async () => {
  if (timer !== null) clearInterval(timer);

  const res = await teacherChooseAPI(myData.value.activityId, imageList.value[index].id);

  if (res.data.code === 200) {
  } else {
    ElMessage.error(res.data.message);
  }
};

onMounted(() => {
  // setTimer()
});
</script>

<style scoped lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
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
  width: 600px;
  height: 400px;
  text-align: center;
  border: 1px dotted #000;
  border-radius: 5px;
}

.chooseBox {
  background: $primary-white-color;
  min-height: calc(100vh - 140px);
  margin-top: 20px;
  border-radius: 5px;
  margin-right: 20px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;

  .uploadImage {
    color: $primary-color;
    line-height: 60px;
  }

  .right {
    display: flex;
    flex-direction: column;
  }

  .right img {
    width: 600px;
    height: 400px;
  }
}
</style>
