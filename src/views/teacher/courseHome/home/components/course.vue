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
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="toGeneratePPT"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { ElMessage, type FormProps } from "element-plus";
import { getPPTAPI, teacherGetCourseDetailsAPI } from "@/apis/course";
import { useRoute, useRouter } from "vue-router";

const pptHref=ref('')
const download=ref()

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


const toGeneratePPT =async () => {
  if (ppt.value.trim() === "") {
    ElMessage.error("您还未输入任何内容");
    return 
  }

  const res = await getPPTAPI(ppt.value);

  if(res.data.code===200)
  {
    console.log(res.data.data)
    // window.open(res.data.data);
    location.href=res.data.data
  }
  else {
    ElMessage.error(res.data.message)
  }

  dialogVisible.value=false
};

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
