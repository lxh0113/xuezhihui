<template>
  <div class="markBox">
    <div class="outerBox">
      <div class="left">
        <el-button type="primary" style="margin-bottom: 20px" @click="save"
          >保存</el-button
        >

        <h3 class="title" style="margin-bottom: 20px">题目预览</h3>
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

      <!-- <iframe
        style="min-width: 400px; height: 700px"
        :src="'http://view.officeapps.live.com/op/view.aspx?src=' + url"
        frameborder="0"
      ></iframe> -->
    </div>

    <div class="right">
      <el-form-item label="试卷标题">
        <el-input style="max-width: 200px" v-model="paperData.title"></el-input>
        <p class="scoreText">总分：{{ totalScore }}</p>
      </el-form-item>
      <div
        :ref="setRef"
        v-for="(item, index) in questionList"
        class="questions"
      >
        <h4>{{ index + 1 }}.{{ item.type }}</h4>

        <el-form label="题目" style="margin-top: 20px; margin-bottom: 20px">
          <el-input
            type="textarea"
            :rows="5"
            v-model="item.title.text"
          ></el-input>
        </el-form>

        <el-form
          style="margin-top: 20px; margin-bottom: 20px"
          v-if="item.type === '单选题' || item.type === '多选题'"
        >
          <el-form-item
            v-for="(option, optionIndex) in item.title.options"
            style="margin-top: 20px; margin-bottom: 20px"
            :label="String.fromCharCode('A'.charCodeAt(0) + optionIndex)"
          >
            <el-input
              v-model="questionList[index].title.options[optionIndex]"
            ></el-input>
          </el-form-item>
        </el-form>

        <el-form-item label="答案">
            <el-input v-model="answerList[index].answer"></el-input>
        </el-form-item>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { teacherViewStudentAssignmentAPI } from "@/apis/assignment";
import { ElMessage } from "element-plus";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useOriginStore } from "@/stores/originStore";
import {
  teacherGetPaperAnswerAPI,
  teacherGetPaperInfoAPI,
  teacherGetPaperQuestionInfoAPI,
  teacherSavePaperAnswerAPI,
  teacherSavePaperInfoAPI,
} from "@/apis/paper";
import { useAnswerStore } from "@/stores/answerStore";

const originStore = useOriginStore();
const answerStore=useAnswerStore()

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
    paperData.value.title=res.data.data.title
    questionList.value = questionList.value.map((item) => {
      try {
        item.title = JSON.parse(item.title);

        if (item.type === "单选题" || item.type === "多选题") {
          item.title.options = JSON.parse(item.title.options);
        }
      } catch (error) {
      }
      return item;
    });

    console.log(questionList.value);
  }
};

const save = async () => {
  
  const res = await teacherSavePaperAnswerAPI(
    parseInt(route.params.paperId as string),
    url.value,
    JSON.stringify(answerList.value)
  )

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

const answerList=ref([])

const getAnswerDetails = async() => {
  answerList.value=answerStore.getAnswerData().answerList

  url.value=answerStore.getAnswerData().answerUrl
};

onMounted(() => {
  getDetails();

  getAnswerDetails()

  // nextTick(()=>{
  //   save()
  // })
});
</script>

<style lang="scss" scoped>
.el-checkbox-button.is-disabled.el-checkbox-button__inner {
  cursor: pointer !important;
}

label{
color:black;
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
      color: #3B90FF;
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
      color: #3B90FF;
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
  color: #00B86E;


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
    color:#a6a5ab;
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
