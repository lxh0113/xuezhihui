<template>
  <div class="doHomeworkBox">
    <div class="outerBox">
      <div class="left">
        <div class="button" style="margin-bottom: 20px">
          <el-button type="success" @click="saveHomework">保存</el-button>
          <el-button type="primary" @click="handInHomework">提交</el-button>
        </div>
        <h3 class="title" style="margin-bottom: 20px">一、简答题</h3>

        <el-checkbox-group size="large">
          <el-checkbox-button style="
              margin-right: 20px;
              margin-bottom: 20px;
              border: 1px solid #2f3ced;
              cursor: pointer !important;
            " v-for="(item, index) in questionsList" @click="btnClick(index)" :key="item"
            :value="JSON.stringify(item.studentAnswer).trim() !== ''">
            {{ index + 1 }}
          </el-checkbox-button>
        </el-checkbox-group>
      </div>
    </div>

    <div class="right">
      <h2>{{ homeworkData.title }}</h2>
      <div class="setting">
        <span>题量:{{ questionsList.length }}&nbsp;&nbsp;</span>
        <span>满分:100&nbsp;&nbsp;</span>
        <!-- <span>作答时间：{{ homeworkData.examBeginTime }} 至 -->
          <!-- {{ homeworkData.examEndTime }}&nbsp;&nbsp;</span> -->
      </div>
      <div class="questions">
        <!-- <h3>选择题</h3> -->

        <div class="radioQuestions" v-for="(item, index) in questionsList" :id="'part' + index" :key="index"
          :ref="setToQuestionsRefs">
          <div class="question">
            {{ index + 1 }}.&nbsp;&nbsp;&nbsp;({{
              item.type
            }})&nbsp;&nbsp;&nbsp;
            <p style="margin-top: 10px" v-html="item.title.text"></p>
          </div>
          <div v-if="item.type === '单选题'" class="radio">
            <el-radio-group v-model="item.studentAnswer" size="large">
              <div class="radioOptions" v-for="(option, optionIndex) in item.title.options" :key="option">
                <el-radio-button style="border-radius: 20px" :label="String.fromCharCode(65 + optionIndex)"
                  :value="String.fromCharCode(65 + optionIndex)" />
                <span style="font-size: 18px; margin-left: 20px">
                  <p v-html="option"></p>
                </span>
              </div>
            </el-radio-group>
          </div>

          <div v-if="item.type === '多选题'" class="checkBox">
            <el-checkbox-group v-model="item.studentAnswer" size="large">
              <div class="checkBoxOptions" v-for="(option, optionIndex) in item.title.options" :key="optionIndex">
                <el-checkbox-button :key="String.fromCharCode(65 + optionIndex)"
                  :value="String.fromCharCode(65 + optionIndex)">
                  {{ String.fromCharCode(65 + optionIndex) }}
                </el-checkbox-button>
                <span style="font-size: 18px; margin-left: 20px">{{
                  option
                }}</span>
              </div>
            </el-checkbox-group>
          </div>

          <div v-else-if="item.type === '填空题'" class="radio">
            <div class="fillOptions" v-for="(option, optionIndex) in item.title.options" :key="optionIndex">
              <span>第&nbsp;{{ optionIndex + 1 }}&nbsp;空</span>

              <div style="margin-left: 20px" class="editor">
                <myEditor :text="item.studentAnswer" :ref="setRef"></myEditor>
              </div>
            </div>
          </div>

          <div v-if="item.type === '简答题'" class="radio">
            <span>请输入答案</span>

            <div class="replyOptions" style="margin-bottom: 20px; margin-top: 20px">
              <div style="" class="editor">
                <myEditor :text="item.studentAnswer" :ref="setRef"></myEditor>
              </div>
            </div>
          </div>

          <div v-if="item.type === '判断题'" class="radio">
            <el-radio-group v-model="item.studentAnswer" size="large">
              <div class="judgeOptions">
                <el-radio-button style="border-radius: 20px" label="对" value="true" />
                <span style="line-height: 40px; margin-left: 20px">对</span>
              </div>
              <div class="judgeOptions">
                <el-radio-button style="border-radius: 20px" label="错" value="false" />
                <span style="line-height: 40px; margin-left: 20px">错</span>
              </div>
            </el-radio-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {
  studentDoAssignmentAPI,
  studentGetAssignmentDetailsAPI,
} from "@/apis/assignment";
import { useUserStore } from "@/stores/userStore";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import myEditor from "@/views/components/editor.vue";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const homeworkDetailsList = ref([]);

const questionsList = ref([]);

const toQuestionsRefs = ref([]);
const setToQuestionsRefs = (el: any) => {
  if (el) {
    toQuestionsRefs.value.push(el);
  }
};

const eleRefs = ref([]);
const setRef = (el: any) => {
  if (el) {
    eleRefs.value.push(el);
  }
};

const homeworkData = ref({});

const btnClick = (index: number) => {
  console.log(toQuestionsRefs.value);

  toQuestionsRefs.value[index].scrollIntoView({
    block: "start",
    behavior: "smooth",
  });
};

const getAssignmentDetails = async () => {
  const res = await studentGetAssignmentDetailsAPI(
    userStore.getUserInfo()!.roleId,
    parseInt(route.params.assignmentId as string)
  );

  if (res.data.code === 200) {
    console.log(res.data.data);
    homeworkData.value = res.data.data;
    questionsList.value = JSON.parse(res.data.data.content);

    questionsList.value.forEach((item) => {
      item.title = JSON.parse(item.title);
      item.title.options = JSON.parse(item.title.options);

      if (item.type === "多选题") item.studentAnswer = [];
    });

    homeworkData.value.content = questionsList.value;

    homeworkDetailsList.value = questionsList.value.map((item) => {
      if (item.studentAnswer === "") {
        return false;
      } else {
        return true;
      }
    });
  } else {
  }
};

const getHomework = () => {
  // homeworkData.value = questionsList.value;

  // 获取填空题简答题
  let resCount = 0;

  questionsList.value.forEach((item, index) => {
    if (item.type === "填空题") {
      //
      let arry = [];
      item.title.options.map((option: any, optionIndex: number) => {
        arry.push(eleRefs.value[resCount].add());
        resCount++;
      });

      item.studentAnswer = arry;
    } else if (item.type === "简答题") {
      item.studentAnswer = eleRefs.value[resCount].add();
      resCount++;
    } else {
    }

    item.title = JSON.stringify(
      {
        text: item.title.text,
        options: JSON.stringify(item.title.options)
      }
    )

  });
};

const saveHomework = async () => {
  // 获取到当前作业状态

  getHomework();

  const res = await studentDoAssignmentAPI(
    userStore.getUserInfo()!.roleId,
    homeworkData.value.assignmentId,
    1,
    questionsList.value,
    1
  );

  if (res.data.code === 200) {
    ElMessage.success("保存成功");

  } else ElMessage.error("保存失败");
};

function formatDateTime(date) {
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2); // Month starts from 0
  const day = ("0" + date.getDate()).slice(-2);
  const hours = ("0" + date.getHours()).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  return `${year}-${month}-${day} ${hours}-${minutes}-${seconds}`;
}

const handInHomework = async () => {
  let flag = confirm("您确定要提交吗？");
  if (flag === false) return;

  getHomework();

  const res = await studentDoAssignmentAPI(
    userStore.getUserInfo().roleId,
    homeworkData.value.assignmentId,
    2,
    questionsList.value,
    1
  );

  console.log(JSON.stringify(questionsList.value));

  if (res.data.code === 200) {
    ElMessage.success("提交成功");

    setTimeout(() => {
      router.push("/course/" + route.params.id + "/homework");
    }, 2000);
  } else ElMessage.error("保存失败");
};

onMounted(() => {
  getAssignmentDetails();
});
</script>

<style lang="scss" scoped>
.el-checkbox-button.is-disabled.el-checkbox-button__inner {
  cursor: pointer !important;
}

.doHomeworkBox {
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

    .radioOptions,
    .checkBoxOptions,
    .fillOptions,
    .judgeOptions {
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
  }
}
</style>
