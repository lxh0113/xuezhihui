<template>
  <div class="backBox">
    <!-- 123 -->
    <div class="courseImage">
      <img :src="courseData.image" alt="" />
      <div class="courseName">{{ courseData.courseName }}</div>
    </div>
    <!-- <div style="background-color:white;padding-left:20px;" class="changeImage">{{ courseData.createTime }}</div> -->
    <!-- <hr /> -->

    <div class="knowledgeChart" @click="toKnowledge">
      <img src="../../../../../assets/image/knowledgeChart.png" alt="" />
      <h3>生成知识图谱</h3>
    </div>

    <div class="braveChart" @click="toMarkDown">
      <img src="../../../../../assets/image/braveChart.png" alt="" />
      <h3>生成思维导图</h3>
    </div>

    <div class="generatePPT" @click="dialogVisible = true">
      <img src="../../../../../assets/image/ppt.png" alt="" />
      <h3>智能生成ppt</h3>
    </div>

    <a v-show="false" ref="download" :href="pptHref">下载</a>
  </div>

  <el-dialog v-model="dialogVisible" title="智能生成ppt" width="500">
    <el-form-item label="请输入你需要的内容">
      <el-input cols="6" type="textarea" v-model="ppt"></el-input>
    </el-form-item>
    <el-progress v-if="percent !== 0" :text-inside="true" :stroke-width="26" :percentage="percent" />
    <p v-if="percent !== 0">{{ text }}</p>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="generatePPT"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { ElMessage, type FormProps } from "element-plus";
import { getPPTAPI, teacherGetCourseDetailsAPI } from "@/apis/course";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const pptHref = ref('')
const download = ref()

const dialogVisible = ref(false);

const ppt = ref("");

const route = useRoute();
const router = useRouter();

const courseData = ref({});

const getCourseDetails = async () => {
  const res = await teacherGetCourseDetailsAPI(
    parseInt(route.params.id as string)
  );
  if (res.data.code === 200) {
    courseData.value = res.data.data;
  } else ElMessage.error(res.data.message);
};

const toKnowledge = () => {
  router.push("/course/" + route.params.id + "/knowledgeChart");
};

const toMarkDown = () => {
  router.push("/course/" + route.params.id + "/markdown");
};


const toGeneratePPT = async () => {
  if (ppt.value.trim() === "") {
    ElMessage.error("您还未输入任何内容");
    return
  }
  const res = await getPPTAPI(ppt.value);

  if (res.data.code === 200) {
    console.log(res.data.data)
    // window.open(res.data.data);
    location.href = res.data.data

    ws.close()
  }
  else {
    ElMessage.error(res.data.message)
  }

  dialogVisible.value = false
};

const generatePPT = () => {

  toGeneratePPT()

  startWS()

  // 开始渐进更新 percent 的值
  intervalId = setInterval(() => {
    if (percent.value < 100) {
      // percent.value += 2 // 每隔一段时间增加 0.1

      if (text.value === '正在加载中' && percent.value + 2 < 30) {
        percent.value += 2
      }
      else if (text.value === '大纲生成完毕' && percent.value + 2 < 70) {
        percent.value += 1
      }
      else if (text.value === 'PPT生成完毕' && percent.value + 2 < 100) {
        percent.value += 2

        console.log(112222222)
      }
      // 如果没有匹配到上述条件，也增加 percent 的值
      else {
        // percent.value += 2

        console.log(text.value)
        console.log(percent.value)
      }
      

    } else {
      clearInterval(intervalId) // 当 percent 达到 1 时停止计时器
    }
  }, 1000) // 每隔 1 秒更新一次 percent 的值
}

let ws = null

let percent = ref(0)
const text = ref('正在加载中')
let intervalId

const userStore = useUserStore()

const updatePercent = (newPercent) => {

  if (newPercent < percent.value) return

  percent.value = newPercent
  if (percent.value === 30) text.value = '大纲生成完毕'
  else if (percent.value === 70) text.value = 'PPT生成完毕'
  else if (percent.value === 100) text.value = 'PPT导出完毕'

  if (percent.value >= 100) {
    clearInterval(intervalId) // 当 percent 达到或超过 1 时停止计时器
  }

}

import {wsUrl} from '@/utils/baseUrl'

const startWS = () => {
  ws = new WebSocket(wsUrl+"/apk-info/websocket/" + userStore.getUserInfo().roleId + "?k=v")
  ws.onmessage = (event) => {
    console.log("收到了消息" + event.data)

    if (parseInt(event.data)) {
      updatePercent(parseInt(event.data))
    }
  }

  ws.onerror = () => {
    ElMessage.error("网络连接出错")
  }
}

onMounted(() => {
  getCourseDetails();
});
</script>

<style lang="scss" scoped>
.backBox {
  // height: 400px;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;

  .courseImage {
    border-radius: 10px;
    background-color: $primary-white-color;

    overflow: hidden;
    height: 180px;
    position: relative;

    img {
      width: 260px;
      height: 180px;
    }

    .courseName {
      position: absolute;
      bottom: 0;
      // display: block;
      // line-height: 40px;
      width: 260px;
      padding: 10px;
      color: $primary-white-color;
      background: rgba($color: #ccc, $alpha: 0.5);
    }
  }

  .changeImage {
    line-height: 80px;
    color: $primary-color;
  }

  .knowledgeChart {
    height: 150px;
    background: $primary-white-color;
    border-radius: 5px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
      color: $primary-color;
    }

    img {
      height: 100px;
      width: 100px;
    }
  }

  .braveChart {
    height: 150px;
    background: $primary-white-color;
    border-radius: 5px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h3 {
      color: $primary-color;
      margin-top: 10px;
    }

    img {
      height: 100px;
      width: 100px;
    }
  }

  .knowledgeChart:hover {
    background-color: #efebf5;
  }

  .braveChart:hover {
    background-color: #e4f9fe;
  }

  .generatePPT {
    height: 160px;
    background: $primary-white-color;
    border-radius: 5px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h3 {
      color: $primary-color;
      margin-top: 10px;
    }

    img {
      height: 100px;
      width: 100px;
    }
  }

  .generatePPT:hover {
    background-color: #eaf7ff;
  }
}
</style>
