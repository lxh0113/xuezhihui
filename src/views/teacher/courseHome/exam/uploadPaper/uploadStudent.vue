<template>
  <div class="markBox">
    <div class="outerBox">
      <div class="left">
        <el-button style="margin-bottom: 20px" @click="save" type="success">保存</el-button>
        <div class="demo-image__preview">
          <el-image style="width: 400px; height: 700px" :src="url" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
            :preview-src-list="srcList" :initial-index="4" fit="fill" />
        </div>
        <div style="height: 10px"></div>
        <el-button :disabled="currentStudentIndex === 0" @click="lastPapers">上一套学生试卷</el-button>
        <el-button :disabled="paperIndex === 0" @click="minusPapers" circle :icon="ArrowLeft"
          type="primary"></el-button>
        <el-button :disabled="paperIndex === srcList.length - 1" @click="addPapers" circle :icon="ArrowRight"
          type="primary"></el-button>
        <el-button :disabled="currentStudentIndex == studentImageList.length - 1"
          @click="nextPapers">下一套学生试卷</el-button>
      </div>
    </div>

    <div class="right">
      <div style="display: flex; margin-bottom: 20px">
        <h3>{{ paperData.title }}</h3>
        <p style="margin-left: 20px" class="scoreText">
          总分：{{ totalScore }}
        </p>
      </div>

      <div class="infoBox" style="display: flex;justify-content:space-between">
        <span> 班级:&nbsp;{{ studentInfo.className }}</span>
        <span> 学号:&nbsp;{{ studentInfo.sno }}</span>
        <span> 姓名:&nbsp;{{ studentInfo.name }}</span>
      </div>

      <div v-for="(item, index) in questionList" class="questions">
        <h4>{{ index + 1 }}.{{ item.type }}</h4>
        <p class="questionArea">
          {{ item.title.text }}
        </p>

        <p v-if="item.type === '单选题' || item.type === '多选题'" v-for="(option, optionIndex) in item.title.options">
          {{ String.fromCharCode("A".charCodeAt(0) + optionIndex) }}
          {{ item.title.options[optionIndex] }}
        </p>

       
        <!-- <p>学生答案</p> -->
        <el-form-item label="学生答案">
          <el-input type="textarea" cols="5" v-model="studentAnswer[index].studentAnswer"></el-input>
        </el-form-item>
       
        <hr style="margin-bottom: 20px" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { teacherViewStudentAssignmentAPI } from "@/apis/assignment";
import { ElMessage } from "element-plus";
import { ArrowLeft, ArrowRight } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useOriginStore } from "@/stores/originStore";
import {
  teacherGetPaperAnswerAPI,
  teacherGetPaperInfoAPI,
  teacherGetStudentAnswerAPI,
  teacherSavePaperAnswerAPI,
  teacherGetStudentInfoAPI,
  teacherGetAllStudentPaperAPI,
} from "@/apis/paper";
import { useAnswerStore } from "@/stores/answerStore";
import { useStudentStore } from "@/stores/studentStore";
import { teacherSaveStudentAnswerAPI } from "../../../../../apis/paper";

const originStore = useOriginStore();
const answerStore = useAnswerStore();
const studentStore = useStudentStore();

const url = ref("");
const srcList = ref([]);

const route = useRoute();
const checkboxGroup1 = ref(["1"]);

const eleRefs = ref([]);
const setRef = (el: any) => {
  if (el) {
    eleRefs.value.push(el);
  }
};

const paperData = ref({
  id: parseInt(route.params.paperId as string),
  title: "",
  questionsImage: srcList.value,
  questions: originStore.getOriginPaperData().questions,
  score: 0,
});

const questionList = ref([]);

const btnClick = (index: number) => {
  eleRefs.value[index].scrollIntoView({ block: "start", behavior: "smooth" });
};

const getDetails = async () => {
  // console.log(originStore.getOriginPaperData());

  const res = await teacherGetPaperInfoAPI(
    parseInt(route.params.paperId as string)
  );

  if (res.data.code === 200) {
    console.log(res.data.data);
    questionList.value = JSON.parse(res.data.data.questions);
    console.log(JSON.parse(res.data.data.questions));
    paperData.value.title = res.data.data.title;
    questionList.value = questionList.value.map((item) => {
      try {
        item.title = JSON.parse(item.title);

        if (item.type === "单选题" || item.type === "多选题") {
          item.title.options = JSON.parse(item.title.options);
        }
      } catch (error) {
        // item.title=''
      }
      return item;
    });

    answerList.value = questionList.value.map((item) => "");

    studentAnswer.value = questionList.value.map((item) => "");

    console.log(questionList.value);
    console.log(studentAnswer.value)
  }
};

const save = async () => {
  const res = await teacherSaveStudentAnswerAPI(
    parseInt(route.params.paperId as string),
    studentInfo.value.name,
    studentInfo.value.sno,
    studentInfo.value.className,
    JSON.stringify(studentAnswer.value),
    srcList.value,
    0
  );

  if (res.data.code === 200) {
    ElMessage.success("保存成功");
  } else {
    ElMessage.error("保存失败");
  }
};

const totalScore = computed(() => {
  return questionList.value.reduce((accumulator, question) => {
    // 这里假设每个问题对象有一个 score 属性来表示分数
    return accumulator + question.questionScore;
  }, 0); // 初始值设为 0
});

const answerList = ref([{}]);

const getAnswerDetails = async () => {
  const res = await teacherGetPaperAnswerAPI(
    parseInt(route.params.paperId as string)
  );

  if (res.data.code === 200) {
    console.log(res.data.data);
    console.log(JSON.parse(res.data.data.answers));
    answerList.value = JSON.parse(res.data.data.answers);

    // url.value = answerStore.getAnswerData().answerUrl;
  } else {
  }
};

const paperIndex = ref(0);
const currentStudentIndex = ref(0);
const studentImageList = ref([]);

const addPapers = () => {
  // if(paperIndex)
  paperIndex.value++;
  url.value = srcList.value[paperIndex.value];
};

const minusPapers = () => {
  paperIndex.value--;
  url.value = srcList.value[paperIndex.value];
};

const lastPapers = () => {
  currentStudentIndex.value--;
  srcList.value = studentImageList.value[currentStudentIndex.value];
  url.value = srcList.value[0];
  paperIndex.value = 0;

  getStudentPaper();
};

const nextPapers = () => {
  currentStudentIndex.value++;
  srcList.value = studentImageList.value[currentStudentIndex.value];
  url.value = srcList.value[0];
  paperIndex.value = 0;

  getStudentPaper();
};

const getStudentDetails = async () => {
  // console.log(studentStore.getStudentList());

  const res = await teacherGetAllStudentPaperAPI(parseInt(route.params.paperId as string))

  if (res.data.code === 200) {
    studentImageList.value = res.data.data
    currentStudentIndex.value = 0;

    srcList.value = studentImageList.value[currentStudentIndex.value];
    url.value = srcList.value[0];
    paperIndex.value = 0;
  }
  else {
    ElMessage.error(res.data.message)
  }
};

const studentInfo = ref({
  className: "",
  name: "",
  sno: "",
  studentAnswers: [],
});
const studentAnswer = ref([]);

const getStudentPaper = async () => {
  const res = await teacherGetStudentInfoAPI(
    srcList.value
  );

  if (res.data.code === 200) {
    studentAnswer.value = res.data.data.studentAnswers;
    studentInfo.value = res.data.data;
  } else {
  }
};


onMounted(async () => {
  await getDetails();

  await getAnswerDetails();

  await getStudentDetails();

  await getStudentPaper();

  // save()

});
</script>

<style lang="scss" scoped>
.el-checkbox-button.is-disabled.el-checkbox-button__inner {
  cursor: pointer !important;
}

label {
  color: black;
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
    width: 460px;
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

    .scoreText {
      color: #3b90ff;
      font-weight: bold;
      margin-left: 20px;
      font-size: 20px;
    }

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
      color: #3b90ff;
    }

    .studentAnswer span {
      color: red;
    }
  }
}

.questionArea {
  //background-color: #f5f7fd;
  //border: 1px dotted #2f3ced;
  box-sizing: border-box;
  //padding: 20px;

  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  //text-indent: 2rem;
  //box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

  span {
    font-weight: bold;
  }
}

.corretAnswer {
  margin-bottom: 20px;
  line-height: 1.5rem;
  //background-color: #eaecfd;
  box-sizing: border-box;
  //padding: 20px;
  border-radius: 5px;
  //box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  color: #00b86e;

  span {
    //color: green;
    font-weight: bold;
    margin-right: 20px;
  }
}

.infoBox {
  display: flex;
  justify-content: space-between;

  span {
    line-height: 40px;
    //color:#3B90FF;
    //color: red;
    color: #a6a5ab;
    font-weight: bold;
  }
}

.studentAnswerBox {
  margin-bottom: 20px;
  line-height: 1.5rem;
  //background-color: #eaecfd;
  box-sizing: border-box;
  //padding: 20px;
  border-radius: 5px;
  //box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

  span {
    //color: red;
    font-weight: bold;
    margin-right: 20px;
  }
}

.infoBox {
  display: grid;
  grid-template-columns: 1fr 1fr 1fe;
}

.demo-image__error .image-slot {
  font-size: 30px;
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}

.demo-image__error .el-image {
  width: 100%;
  height: 200px;
}
</style>
