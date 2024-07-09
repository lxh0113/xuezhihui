<template>
  <div class="contentBox">
    <!-- 视频 -->
    <h2 class="title">{{ task.taskPointTitle }}</h2>
    <div v-if="task.type === 'video'" class="video-container">
      <myVideo src="https://media.w3.org/2010/05/sintel/trailer.mp4" />
    </div>

    <iframe
      style="min-width: 600px"
      v-else-if="task.type === 'ppt'"
      class="ppt"
      :src="'http://view.officeapps.live.com/op/view.aspx?src=' + pathUrl"
      frameborder="0"
    ></iframe>

    <div v-else style="min-width: 600px" class="text">
      {{ task.content }}
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import myVideo from "@/views/components/video.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
// import { studentGetTaskAPI } from "@/apis/student";
import { ElMessage } from "element-plus";
import { watch } from "vue";
import { teacherViewChapterAPI } from "@/apis/course";

const route = useRoute();

const pathUrl = ref(
  "https://yuejuanpt.oss-cn-zhangjiakou.aliyuncs.com/%E6%BC%94%E7%A4%BA.pptx"
);

const task = ref({
  id: 1,
  taskPointTitle: "wakkk",
  type: "video",
  tpNumber: 1,
  content: "",
  chapterId: 1,
});

const getTask = async () => {
  // console.log(route.params)
  const res = await teacherViewChapterAPI(parseInt(route.params.taskId as string));

  if (res.data.code === 200) {
    console.log(res.data.data);
    task.value = res.data.data;
  } else ElMessage.error(res.data.message);
};

onMounted(() => {
  getTask();
});
</script>

<style lang="scss" scoped>
.video-container {
  width: 100%;
  // width: 1200px;
  height: 500px;
}

.title {
  line-height: 70px;
}

.ppt {
  width: 100%;
  height: 500px;
}

.text {
  width: 100%;
  box-sizing: border-box;
  padding: 30px;
  background: $primary-white-color;
}
</style>
