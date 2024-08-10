<template>
  <div class="markBox">
    <div class="outerBox">
      <div class="left">
        <h3 class="title" style="margin-bottom: 20px">一、简答题</h3>

        <el-checkbox-group v-model="checkboxGroup1" size="large">
          <el-checkbox-button style="
              margin-right: 20px;
              margin-bottom: 20px;
              border: 1px solid #2f3ced;
              cursor: pointer !important;
            " disabled v-for="(city, index) in questionList" @click="btnClick(index)" :key="city" :value="city">
            {{ index + 1 }}
          </el-checkbox-button>
        </el-checkbox-group>
      </div>
    </div>

    <div class="right">
      <h2>{{ myData.title }}</h2>
      <div class="setting">
        <span>姓名：{{ myData.name }}&nbsp;&nbsp;</span>
        <span>班级：{{ myData.className }}&nbsp;&nbsp;</span>
        <span>成绩：<span style="color: red; font-size: 18px; font-weight: bold">{{ totalScore }} </span>分</span>
      </div>
      <div class="questions">
        <!-- <h3>选择题</h3> -->

        <div class="radioQuestions" v-for="(item, index) in questionList" :id="'part' + index" :ref="setRef"
          :key="index" style="margin-bottom: 20px">
          <div class="question">{{ JSON.parse(item.title).text }}</div>
          <div class="radio" v-if="item.type === '单选题'">
            <div class="radioOptions" v-for="(option, optionIndex) in JSON.parse(JSON.parse(item.title).options)"
              :key="optionIndex">
              <span>{{ String.fromCharCode(65 + optionIndex) }}</span>
              <span style="font-size: 18px; margin-left: 20px" v-html="option"></span>
            </div>
          </div>

          <div class="mark">
            <div class="correctAnswer">
              <span>正确答案</span>
              <p>{{ item.answer }}</p>
            </div>
            <div class="answerAnalysis">
              <span>答案解析</span>
              <p v-html="item.answerAnalysis"></p>
            </div>
            <div class="studentAnswer">
              <span>学生答案</span>
              <p>{{ item.studentAnswer }}</p>
            </div>
            <el-form>
              <el-form-item label="分数">
                <el-input style="width: 100px" type="number" min="0" :max="item.questionScore" placeholder="0 - 7分"
                  v-model.number="item.studentScore"></el-input>
              </el-form-item>
              <el-form-item label="评语" style='display: flex'>
                <el-input v-model="item.questionComment" style="width: 500px" rows="3" type="textarea"></el-input>
                <!-- <el-button type="primary">智能评阅</el-button> -->
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>

      <div class="allScoreBox">
        <div style="margin-bottom: 20px;">
          <el-input type="textarea" placeholder="请输入评语" v-model="comment"></el-input>
        </div>
        总分：&nbsp;
        <span style="color:red;font-weight:bold;">{{ totalScore }}</span>
        <!-- <el-input type="number" placeholder="0-100分" style="width: 100px" min="0" max="100"
          :value="total"></el-input> -->
        <el-button type="primary" style="margin-left: 20px" @click="mark">提交</el-button>
        <el-button type="success" style="margin-left: 20px"
          :disabled="markStore.getActiveIndex() === markStore.getMarkList().length - 1"
          @click="markAndViewNext">提交并且查看下一个</el-button>

        <el-button style="margin-left: 20px" type="primary" plain><svg t="1723207082050" class="icon"
            viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1913" width="24" height="24">
            <path
              d="M374.75 179.1L0 844.9h157.58l84-151.74h264.7l29.5 151.74h157.59L557.56 179.1zM290.3 597.16l151.43-281.8 47.13 281.8zM875.87 179.1L756.4 844.9h148.13L1024 179.1z"
              p-id="1914" fill="#51e2a4"></path>
          </svg>&nbsp;&nbsp;&nbsp;智能批阅</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { teacherMarkAssignmentAPI, teacherViewStudentAssignmentAPI } from "@/apis/assignment";
import { useMarkStore } from "@/stores/markStore";
import { useUserStore } from "@/stores/userStore";
import { ElMessage } from "element-plus";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter()
const route = useRoute();
const userStore = useUserStore()
const checkboxGroup1 = ref(["1"]);

const markStore = useMarkStore()

const comment = ref('')

const eleRefs = ref([]);
const setRef = (el: any) => {
  if (el) {
    eleRefs.value.push(el);
  }
};

const myData = ref({});

const questionList = ref([]);

const btnClick = (index: number) => {
  eleRefs.value[index].scrollIntoView({ block: "start", behavior: "smooth" });
};

const getDetails = async () => {
  const res = await teacherViewStudentAssignmentAPI(
    parseInt(route.params.studentAssignmentId as string)
  );

  if (res.data.code === 200) {
    console.log(res.data.data);
    myData.value = res.data.data;
    questionList.value = res.data.data.questionList;
  } else ElMessage.error(res.data.message);
};

const totalScore = computed(() => {
  return questionList.value.reduce((s, a) => {
    return s = s + a.studentScore
  }, 0)
})

const mark = async () => {
  // 去提交

  // myData.value.studentScore = totalScore

  const res = await teacherMarkAssignmentAPI(parseInt(route.params.studentAssignmentId as string),
    userStore.getUserInfo().roleId,
    comment.value,
    questionList.value)

  if (res.data.code === 200) {
    ElMessage.success('提交成功')
    router.push('/course/' + route.params.id + '/homework/details/' + route.params.assignmentId)
  }
  else {
    ElMessage.error(res.data.message)
  }
}

const markAndViewNext = () => {
  if (markStore.getActiveIndex() !== markStore.getMarkList().length - 1) markStore.setActiveIndex(markStore.getActiveIndex() + 1)

  router.push(
    "/course/" + route.params.id + "/homework/details/" + route.params.assignmentId + "/" + markStore.getMarkList()[markStore.getActiveIndex()].studentAssignmentId
  );
}

onMounted(() => {
  getDetails();
});
</script>

<style lang="scss" scoped>
.el-checkbox-button.is-disabled.el-checkbox-button__inner {
  cursor: pointer !important;
}

.markBox {
  display: flex;
  background: #f5f7fd;
  min-height: 100vh;
  // align-items: center;
  justify-content: center;

  .left {
    margin-top: 40px;
    border-radius: 10px;
    margin-right: 20px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    width: 400px;
    // height: 400px;
    background: $primary-white-color;
    padding: 30px;
    box-sizing: border-box;
    margin-bottom: 20px;
  }

  .right {
    margin-top: 40px;
    border-radius: 10px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    width: 900px;
    // height: 400px;
    background: $primary-white-color;
    padding: 30px;
    margin-bottom: 20px;
    box-sizing: border-box;

    .question {
      margin-top: 20px;
      margin-bottom: 30px;
    }

    .radioOptions {
      width: 100%;
      display: flex;
      margin-bottom: 20px;
      align-items: center;
    }

    .setting {
      color: $primary-gray-text-color;
      margin-top: 20px;
      margin-bottom: 50px;
    }

    .bigTitle {
      font-weight: bold;
      font-size: 16px;
    }

    .mark {
      border-bottom: 1px solid #dcdfe6;
      padding-bottom: 20px;
    }

    .correctAnswer,
    .studentAnswer,
    .answerAnalysis {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;

      span {
        font-weight: bold;
        margin-bottom: 10px;
      }
    }

    .correctAnswer span {
      color: green;
    }

    .answerAnalysis span {
      color: $primary-color;
    }

    .studentAnswer span {
      color: red;
    }
  }
}
</style>
