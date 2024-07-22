<template>
  <div class="markBox">
    <div class="outerBox">
      <div class="left">
        <h3 class="title" style="margin-bottom: 20px">一、简答题</h3>

        <el-checkbox-group v-model="checkboxGroup1" size="large">
          <el-checkbox-button
            style="
              margin-right: 20px;
              margin-bottom: 20px;
              border: 1px solid #2f3ced;
              cursor: pointer !important;
            "
            disabled
            v-for="(city, index) in questionList"
            @click="btnClick(index)"
            :key="city"
            :value="city"
          >
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
        <span
          >成绩：<span style="color: red; font-size: 18px; font-weight: bold">
            {{ myData.studentScore }} </span
          >分</span
        >
      </div>
      <div class="questions">
        <!-- <h3>选择题</h3> -->

        <div
          class="radioQuestions"
          v-for="(item, index) in questionList"
          :id="'part' + index"
          :ref="setRef"
          :key="index"
          style="margin-bottom: 20px"
        >
          <div class="question">{{ JSON.parse(item.title).text }}</div>
          <div class="radio" v-if="item.type === '单选题'">
            <div
              class="radioOptions"
              v-for="(option, optionIndex) in JSON.parse(
                JSON.parse(item.title).options
              )"
              :key="optionIndex"
            >
              <span>{{ String.fromCharCode(65 + optionIndex) }}</span>
              <span
                style="font-size: 18px; margin-left: 20px"
                v-html="option"
              ></span>
            </div>
          </div>

          <div class="checkBox" v-if="item.type === '多选题'">
            <div
              class="checkOptions"
              v-for="(option, optionIndex) in JSON.parse(
                JSON.parse(item.title).options
              )"
              :key="optionIndex"
            >
              <span>{{ String.fromCharCode(65 + optionIndex) }}</span>
              <span
                style="font-size: 18px; margin-left: 20px"
                v-html="option"
              ></span>
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
                <el-input
                  style="width: 100px"
                  type="number"
                  min="0"
                  :max="item.questionScore"
                  placeholder="0 - 7分"
                  v-model="item.studentScore"
                ></el-input>
              </el-form-item>
              <el-form-item label="评语">
                <el-input
                  v-model="item.questionComment"
                  style="width: 500px"
                  rows="3"
                  type="textarea"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>

      <div class="allScoreBox">
        总分：&nbsp;<el-input
          type="number"
          placeholder="0-100分"
          style="width: 100px"
          min="0"
          max="100"
          v-model="myData.studentScore"
        ></el-input>
        <el-button type="primary" style="margin-left: 20px" @click="mark"
          >提交</el-button
        >
        <!-- <el-button type="success" style="margin-left: 20px"
          >提交并且查看下一个</el-button
        > -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { teacherViewStudentAssignmentAPI } from "@/apis/assignment";
import { ElMessage } from "element-plus";
import { ref, onMounted } from "vue";
import { useRoute,useRouter } from "vue-router";
import { teacherMarkAssignmentAPI } from "../../../../../apis/assignment";
import { useUserStore } from "@/stores/userStore";

const router=useRouter()
const userStore=useUserStore()
const route = useRoute();
const checkboxGroup1 = ref(["1"]);

const radio = ref(false);
const radioOptions = ref([false, false, false, false]);

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
    parseInt(route.params.studentId as string)
  );

  if (res.data.code === 200) {
    console.log(res.data.data);
    myData.value = res.data.data;
    questionList.value = res.data.data.questionList;
  } else ElMessage.error(res.data.message);
};

const mark = async () => {
  // 去提交

  const res = await teacherMarkAssignmentAPI(
    parseInt(route.params.studentId as string),
    parseInt(route.params.assignmentId as string),
    userStore.getUserInfo().roleId,
    "",
    questionList.value
  );

  if (res.data.code === 200) {
    ElMessage.success('批阅成功')
    router.push('/course/'+route.params.id+'/exam/details/'+route.params.assignmentId)
  } else {
    ElMessage.error(res.data.message);
  }
};

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
