<template>
  <div class="contentBox">
    <!-- 视频 -->
    <h2 class="title">{{ task.taskPointTitle }}</h2>
    <div v-if="task.type === 'video'" class="video-container">
      <myVideo :startTime="videoBeginTime" :src="task.content" />
    </div>

    <div
      class="addSubtitleBox"
      v-if="task.type === 'video' && task.knowledge !== null"
    >
      <span class="titleText">知识切片</span>
      <el-timeline v-if="task.knowledge !== null" style="max-width: 600px">
        <el-timeline-item
          v-for="item in JSON.parse(task.knowledge)"
          :timestamp="item.beginTime"
          placement="top"
        >
          <el-card @click="changeCurrentTime(item.beginTime)">
            <!-- <h4></h4> -->
            <p>{{ item.knowledge }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>

    <iframe
      style="min-width: 600px"
      v-else-if="task.type === 'ppt'"
      class="ppt"
      :src="'http://view.officeapps.live.com/op/view.aspx?src=' + task.content"
      frameborder="0"
    ></iframe>

    <div
      v-else
      style="min-width: 600px; min-height: 400px"
      class="text"
      v-html="task.content"
    ></div>
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
import videojs from 'video.js';

const route = useRoute();

const pathUrl = ref(
  ""
);

const task = ref({
  id: 1,
  taskPointTitle: "wakkk",
  type: "text",
  tpNumber: 1,
  content: "https://yuejuanpt.oss-cn-zhangjiakou.aliyuncs.com/wisdomHub/22:41:06-f84858b516b241a995c874aea6a66cfaout_video.mp4",
  chapterId: 1,
  knowledge: JSON.stringify(
     [
      {
        beginTime: "00:00:00,598",
        knowledge: "专业知识提升",
      },
      {
        beginTime: "00:00:04,715",
        knowledge: "学习的广度和深度丰富",
      },
      {
        beginTime: "00:00:10,874",
        knowledge: "自学能力培养",
      },
      {
        beginTime: "00:00:17,201",
        knowledge: "求职",
      },
      {
        beginTime: "00:00:21,694",
        knowledge: "认识志同道合的朋友",
      },
      {
        beginTime: "00:00:24,170",
        knowledge: "学习上互帮互助",
      }
    ]
  ),
});

// pathUrl.value = JSON.parse(task.value.knowledge).videoPath;

const getTask = async () => {
  console.log(route.params);
  const res = await teacherViewChapterAPI(
    parseInt(route.params.taskId as string)
  );

  if (res.data.code === 200) {
    console.log(res.data.data);
    task.value = res.data.data;
    pathUrl.value = res.data.data.content;
    console.log(pathUrl.value)
    // videojs('video').src(pathUrl.value)
  } else ElMessage.error(res.data.message);
};

const videoBeginTime = ref(0);

const changeCurrentTime = (beginTime: string) => {
  // 解析时间字符串
  let parts = beginTime.split(":");
  let secondsPart = parts[2].split(",")[0]; // 获取秒部分
  let millisecondsPart = parts[2].split(",")[1]; // 获取毫秒部分

  // 转换为数值
  let seconds = parseInt(secondsPart, 10); // 秒数部分
  let milliseconds = parseInt(millisecondsPart, 10); // 毫秒数部分

  // 计算总秒数
  let totalSeconds = seconds + milliseconds / 1000;
  console.log(totalSeconds);
  videoBeginTime.value = totalSeconds;
};

onMounted(() => {
  getTask();
});
</script>

<style lang="scss" scoped>
.video-container {
  width: 100%;
  // width: 1200px;
  min-height: 600px;
}

.title {
  line-height: 70px;
}

.ppt {
  width: 100%;
  height: 500px;
}

.subtitleBox {
  background-color: white;
  min-height: 100px;
  box-sizing: border-box;
  display: flex;
}

.addSubtitleBox {
  background-color: white;
  box-sizing: border-box;
  padding: 30px;

  .titleText {
    color: $primary-color;
    line-height: 50px;
    font-weight: bold;
  }
}

.text {
  width: 100%;
  box-sizing: border-box;
  padding: 30px;
  background: $primary-white-color;
}
</style>
