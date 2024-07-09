<template>
  <div class="addBox">
    <div class="choose">
      <div class="leftChoose" style="display: flex">
        <el-radio-group v-model="choose" size="large">
          <el-radio-button label="单选题" value="单选题" />
          <el-radio-button label="多选题" value="多选题" />
          <el-radio-button label="填空题" value="填空题" />
          <el-radio-button label="简答题" value="简答题" />
          <el-radio-button label="判断题" value="判断题" />
        </el-radio-group>
        <el-select
          v-model="courseIdData"
          style="margin-left: 30px; width: 200px"
          placeholder="选择课程"
          @change="changeCurrentCourse"
        >
          <el-option
            v-for="item in optionsList"
            :key="item.id"
            :label="item.courseName"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>

      <el-button type="primary" @click="addNewQuestion"> 保存 </el-button>
    </div>

    <div class="questionContent">
      <Toolbar :editor="editorRef" style="border: 1px solid #ccc; margin-top: 20px" />
      <Editor
        v-model="valueHtml"
        class="editor"
        style="border: 1px solid #ccc; height: 200px; margin-bottom: 20px"
        @onCreated="handleCreated"
      />

      <!--        这个是单选题 -->
      <div v-if="choose === '单选题'" class="radio">
        <el-radio-group v-model="radio" size="large">
          <div class="radioOptions" v-for="(item, index) in radioAnswer" :key="index">
            <el-radio-button
              style="border-radius: 20px"
              :label="String.fromCharCode(65 + index)"
              :value="String.fromCharCode(65 + index)"
            />

            <div style="margin-left: 20px" class="editor">
              <myEditor :ref="setRadioRef"></myEditor>
            </div>
            <el-button
              :icon="Delete"
              @click="deleteRadioOption(index)"
              style="margin-left: 20px"
              type="primary"
              text="primary"
            ></el-button>
          </div>
        </el-radio-group>
        <el-button
          type="primary"
          text="primary"
          :icon="Plus"
          style="margin-bottom: 20px"
          @click="addRadioOption"
          >添加选项</el-button
        >
      </div>

      <!--        这个是多选题 -->
      <div v-else-if="choose === '多选题'" class="checkBox">
        <el-checkbox-group v-model="checkboxGroup" size="large">
          <div
            class="checkBoxOptions"
            v-for="(item, index) in checkBoxAnswer"
            :key="index"
          >
            <el-checkbox-button
              :key="String.fromCharCode(65 + index)"
              :value="String.fromCharCode(65 + index)"
            >
              {{ String.fromCharCode(65 + index) }}
            </el-checkbox-button>

            <div style="margin-left: 20px" class="editor">
              <myEditor :ref="setCheckBoxRef"></myEditor>
            </div>
            <el-button
              :icon="Delete"
              @click="deleteCheckBoxOption(index)"
              style="margin-left: 20px"
              type="primary"
              text="primary"
            ></el-button>
          </div>
        </el-checkbox-group>
        <el-button
          type="primary"
          text="primary"
          :icon="Plus"
          style="margin-bottom: 20px"
          @click="addCheckBoxOption"
          >添加选项</el-button
        >
      </div>

      <!-- 填空题 -->
      <div v-else-if="choose === '填空题'" class="fill">
        <div class="fillOptions" v-for="(item, index) in fillAnswer" :key="index">
          <span>第&nbsp;{{ index + 1 }}&nbsp;空</span>

          <div style="margin-left: 20px" class="editor">
            <myEditor :ref="setFillRef"></myEditor>
          </div>
          <el-button
            :icon="Delete"
            @click="deleteFillOption(index)"
            style="margin-left: 20px"
            type="primary"
            text="primary"
          ></el-button>
        </div>
        <el-button
          type="primary"
          text="primary"
          :icon="Plus"
          style="margin-bottom: 20px"
          @click="addFillOption"
          >添加选项</el-button
        >
      </div>

      <!-- 这是判断题 -->
      <div v-else-if="choose === '判断题'" class="judge">
        <el-radio-group v-model="judge" size="large">
          <div class="judgeOptions">
            <el-radio-button style="border-radius: 20px" label="A" value="true" />
            <span style="line-height: 40px; margin-left: 20px">对</span>
          </div>
          <div class="judgeOptions">
            <el-radio-button style="border-radius: 20px" label="B" value="false" />
            <span style="line-height: 40px; margin-left: 20px">错</span>
          </div>
        </el-radio-group>
      </div>

      <!-- 这是简答题 -->
      <div v-else-if="choose === '简答题'" class="reply" style="margin-bottom: 20px">
        <span>请输入答案</span>
        <div class="replyOptions" style="margin-top: 20px">
          <div style="" class="editor">
            <myEditor ref="replyAnswer"></myEditor>
          </div>
        </div>
      </div>

      <!-- 分析模块 -->
      <hr />
      <div class="analysis" style="margin-top: 20px">
        <span>请输入解析</span>
        <!-- <br> -->
        <div style="margin-top: 20px" class="editor">
          <myEditor ref="analysisRef"></myEditor>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import myEditor from "@/views/components/editor.vue";
import { Delete, Plus } from "@element-plus/icons-vue";
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from "@/stores/userStore";
// import { teacherAddQuestionsAPI } from "@/apis/teacher";
import { ElMessage } from "element-plus";
import { teacherViewMyTeachCourseAPI } from "../../../../apis/course";
import { teacherAddQuestionAPI, teacherAddSingleQuestionAPI } from "@/apis/question";

const router=useRouter()
const userStore = useUserStore();
const route = useRoute();

const currentCourseName = ref("");
const courseIdData = ref("");
const optionsList = ref([]);

const replyAnswer = ref();
const choose = ref("单选题");
const analysisRef = ref("");

const radio = ref("");
const judge = ref("true");

const changeCurrentCourse = () => {
  currentCourseName.value = optionsList.value.find(
    (item) => item.id === courseIdData.value
  ).courseName;
};

// 单选模块
const radioAnswer = ref(["", "", "", ""]);

const eleRadioRef = ref([]);
const setRadioRef = (el: any) => {
  if (el) {
    eleRadioRef.value.push(el);
  }
};

const addRadioOption = () => {
  radioAnswer.value.push("");
};

const deleteRadioOption = (index: number) => {
  console.log(index);
  radioAnswer.value = radioAnswer.value.filter((item, i) => {
    return i !== index;
  });
};

// 多选模块
const checkboxGroup = ref([]);
const checkBoxAnswer = ref(["", "", "", ""]);

const eleCheckBoxRef = ref([]);
const setCheckBoxRef = (el: any) => {
  if (el) {
    eleCheckBoxRef.value.push(el);
  }
};

const addCheckBoxOption = () => {
  checkBoxAnswer.value.push("");
};

const deleteCheckBoxOption = (index: number) => {
  console.log(index);
  checkBoxAnswer.value = radioAnswer.value.filter((item, i) => {
    return i !== index;
  });
};

// 填空题
const fillAnswer = ref([""]);

const eleFillRef = ref([]);
const setFillRef = (el: any) => {
  if (el) {
    eleFillRef.value.push(el);
  }
};

const addFillOption = () => {
  fillAnswer.value.push("");
};

const deleteFillOption = (index: number) => {
  console.log(index);
  fillAnswer.value = fillAnswer.value.filter((item, i) => {
    return i !== index;
  });
};

let questionData = {
  id: null,
  type: "",
  title: "",
  answer: "",
  answerAnalysis: "",
  courseId: parseInt(courseIdData.value),
  courseName:currentCourseName.value,
  creatorId: userStore.getUserInfo().roleId,
  creatorName: userStore.getUserInfo().name,
};

const addNewQuestion = async () => {
  // if(choose.value==="") return
  questionData.type = choose.value;
  questionData.answerAnalysis = analysisRef.value.add();

  questionData.courseId=parseInt(courseIdData.value)
  questionData.courseName=currentCourseName.value

  if (choose.value === "单选题") {
    // 单选题
    radioAnswer.value.forEach((item, index) => {
      radioAnswer.value[index] = eleRadioRef.value[index].add();
    });

    console.log(radioAnswer.value);

    questionData.title = JSON.stringify({
      text: valueHtml.value,
      options: radioAnswer.value,
    });
    if (radio.value === "") {
      ElMessage.error("您还没设置答案");
      return;
    }
    questionData.answer = radio.value;
  } else if (choose.value === "多选题") {
    // 多选题
    checkBoxAnswer.value.forEach((item, index) => {
      checkBoxAnswer.value[index] = eleCheckBoxRef.value[index].add();
    });

    questionData.title = JSON.stringify({
      text: valueHtml.value,
      options: checkBoxAnswer.value,
    });

    console.log(checkBoxAnswer.value);

    if (JSON.stringify(checkboxGroup.value) === JSON.stringify([])) {
      ElMessage.error("您还没有设置答案");
      return;
    }

    questionData.answer = JSON.stringify(checkboxGroup.value);
  } else if (choose.value === "填空题") {
    // 填空题
    fillAnswer.value.forEach((item, index) => {
      fillAnswer.value[index] = eleFillRef.value[index].add();
    });

    questionData.title = JSON.stringify({
      text: valueHtml.value,
      options: fillAnswer.value,
    });

    questionData.title = JSON.stringify({
      text: valueHtml.value,
      options: [],
    });

    // console.log(fillAnswer.value);
    questionData.answer = fillAnswer.value
      .map((item) => {
        return item;
      })
      .join("、");
  } else if (choose.value === "简答题") {
    // 简答题
    console.log(replyAnswer.value.add());

    questionData.title = JSON.stringify({
      text: valueHtml.value,
      options: [],
    });
    questionData.answer = replyAnswer.value.add();
  } else if (choose.value === "判断题") {
    // 判断题
    console.log(judge.value);

    questionData.title = JSON.stringify({
      text: valueHtml.value,
      options: [],
    });
    questionData.answer = judge.value;
  }

  console.log(questionData);

  // 发送请求
  const res = await teacherAddSingleQuestionAPI(questionData);
  if (res.data.code === 200) {
    ElMessage.success("创建成功");

    router.push('/course/'+route.params.id+'/questions')
  } else ElMessage.error("创建失败");

  // 清空数据
};

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("<p>hello</p>");

// 模拟 ajax 异步获取内容
onMounted(() => {});

const handleCreated = (editor: any) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const getAllOption = async () => {
  const res = await teacherViewMyTeachCourseAPI(userStore.getUserInfo().roleId);

  if (res.data.code === 200) {
    console.log(res.data.data);
    optionsList.value = res.data.data;
    courseIdData.value = optionsList.value[0].id;
    currentCourseName.value=optionsList.value[0].courseName

  } else ElMessage.error(res.data.message);
};

onMounted(() => {
  getAllOption();
});
</script>

<style lang="scss" scoped>
.el-radio-group,
.el-checkbox-group {
  font-size: 16px !important;
}
.addBox {
  background-color: $primary-white-color;
  min-height: calc(100vh - 120px);
  margin-right: 20px;
  box-sizing: border-box;
  padding: 20px;

  .choose {
    height: 50px;
    min-width: 800px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .questionsDetails {
    background: $primary-white-color;
    padding: 20px;
    min-height: 500px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    position: relative;

    .deleteButton {
      position: absolute;
      right: 0;
      top: 0;
    }
  }

  .questionsKind {
    display: flex;
    height: 40px;
    align-items: center;

    span {
      margin-right: 30px;
    }

    span:nth-child(2) {
      margin-left: 20px;
    }
  }

  .questionsContent {
    margin-top: 20px;
    // background: red;
  }

  .radioOptions,
  .checkBoxOptions,
  .fillOptions,
  .judgeOptions {
    // min-width: 500px;
    width: 100%;

    display: flex;
    margin-bottom: 20px;
  }

  .analysis {
    min-width: 500px;
    max-width: 800px;
  }
}
</style>
