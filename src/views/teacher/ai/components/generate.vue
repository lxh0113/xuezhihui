<template>
    <div class="bigBox" data-v-inspector="src/views/teacher/ai/components/generate.vue:2:3">
      <div class="left" data-v-inspector="src/views/teacher/ai/components/generate.vue:3:5">
        <el-tour v-model="open">
          <el-tour-step :target="ref1?.$el" title="第一步">
            <span data-v-inspector="src/views/teacher/ai/components/generate.vue:6:11"> 在这里你可以选择出题方式 </span>
          </el-tour-step>
          <el-tour-step :target="ref2?.$el" title="第二步">
            <span data-v-inspector="src/views/teacher/ai/components/generate.vue:9:11">这里可以输入你想出题的材料或者知识点</span>
          </el-tour-step>
          <el-tour-step :target="ref3?.$el" title="第三步">
            <span data-v-inspector="src/views/teacher/ai/components/generate.vue:12:11">输入你想出题的数量，每个都最多10道题</span>
          </el-tour-step>
          <el-tour-step :target="ref4?.$el" title="第四步">
            <span data-v-inspector="src/views/teacher/ai/components/generate.vue:15:11">选择难度系数，越高越难</span>
          </el-tour-step>
          <el-tour-step :target="ref5?.$el" title="第五步">
            <span data-v-inspector="src/views/teacher/ai/components/generate.vue:18:11">点击提交，注意AI出题较慢，请耐心等待</span>
          </el-tour-step>
          <el-tour-step :target="ref6?.$el" title="第六步">
            <span data-v-inspector="src/views/teacher/ai/components/generate.vue:21:11">最后的结果会在这里显示</span>
          </el-tour-step>
        </el-tour>
        <el-form label-position="top" label-width="100px">
          <el-form-item ref="ref1" label="出题方式">
            <el-radio-group v-model="generateData.flag">
              <el-radio size="large" label="1">根据一段材料出题</el-radio>
              <el-radio size="large" label="2">按学科/知识点/技能出题</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item ref="ref2" label="材料内容">
            <span data-v-inspector="src/views/teacher/ai/components/generate.vue:32:11">您输入的材料会给到大模型用作训练，请谨慎使用以避免重要数据泄漏。</span>
            <el-input rows="10" v-model="generateData.content" type="textarea" resize="false" />
          </el-form-item>
          <el-form-item ref="ref3" label="所需题目数量">
            单选题:&nbsp;<el-input max="10" min="0" v-model="generateData.oneChoiceQuestion"
              style="width: 75px; margin-right: 20px" type="number"></el-input>
            填空题:&nbsp;<el-input max="10" min="0" v-model="generateData.blankFillingQuestion"
              style="width: 75px; margin-right: 20px" type="number"></el-input>
            简答题:&nbsp;<el-input max="10" min="0" v-model="generateData.briefAnswerQuestion" style="width: 75px"
              type="number"></el-input>
          </el-form-item>
          <el-form-item ref="ref4" label="难度系数">
            <el-rate v-model="generateData.t" size="large" allow-half />
          </el-form-item>
          <p class="grayText" data-v-inspector="src/views/teacher/ai/components/generate.vue:46:9">使用须知：</p>
          <p class="grayText" data-v-inspector="src/views/teacher/ai/components/generate.vue:47:9">1.每道题只能最多出10道</p>
          <p class="grayText" data-v-inspector="src/views/teacher/ai/components/generate.vue:48:9">
            可选择指定的难度系数，响应时间可能会比较慢，请耐心等待
          </p>
          <p class="grayText" data-v-inspector="src/views/teacher/ai/components/generate.vue:51:9">
            2.注意：偶有AI返回的数据不完整是正常情况，受限于AI模型能力，请自行确认AI
            出题结果是否存在谬误。
          </p>
          <hr data-v-inspector="src/views/teacher/ai/components/generate.vue:55:9" />
          <el-form-item style="margin-top: 20px">
            <el-button ref="ref5" type="primary" @click="generate">
              提交
            </el-button>
            <el-button type="success" @click="open = true">新手引导</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="right" data-v-inspector="src/views/teacher/ai/components/generate.vue:64:5">
        <span class="text" data-v-inspector="src/views/teacher/ai/components/generate.vue:65:7">出题结果</span>
        <!-- <el-form label-position="top" label-width="100px">
          <el-form-item ref="ref6" label="AI出题结果">
            <el-input
              rows="30"
              v-model="resultContent"
              type="textarea"
              resize="false"
            />
            
          </el-form-item>
        </el-form> -->
  
        <div style="margin-top:0px;margin-bottom:20px;" v-for="(item, index) in 5" class="questions" data-v-inspector="src/views/teacher/ai/components/generate.vue:78:7">
          <div class="button" data-v-inspector="src/views/teacher/ai/components/generate.vue:79:9">
            <el-button type="primary" size="large" :icon="Edit" style="border-radius: 0"></el-button>
            <el-button type="danger" size="large" :icon="Delete" style="margin-left: 0px;border-radius: 0 5px 0 0px;"</el-button>
          </div>
          <h4 data-v-inspector="src/views/teacher/ai/components/generate.vue:83:9">选择题</h4>
          <p class="questionArea" data-v-inspector="src/views/teacher/ai/components/generate.vue:84:9">
            这是选择题案例
          </p>
  
          <p style="margin-bottom: 10px;" v-for="(option, optionIndex) in 4" data-v-inspector="src/views/teacher/ai/components/generate.vue:88:9">
            选项
          </p>
  
          <p class="corretAnswer" data-v-inspector="src/views/teacher/ai/components/generate.vue:92:9">
            <span data-v-inspector="src/views/teacher/ai/components/generate.vue:93:11">正确答案：</span>A
          </p>
  
          <p class="analysisText" data-v-inspector="src/views/teacher/ai/components/generate.vue:96:9">
            <span data-v-inspector="src/views/teacher/ai/components/generate.vue:97:11">答案解析：</span>哇咔咔咔咔靠靠靠靠靠靠靠酷酷酷酷酷酷飒飒飒飒飒飒啊飒飒飒飒阿萨
          </p>
          <!-- <hr style="margin-top:30px;margin-bottom: 30px" /> -->
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  // import { getAIGenerateQuestionAPI } from "@/apis/ai.js"
  import { ElMessage } from "element-plus";
  import { teacherGenerateQuestionsByAIAPI } from "@/apis/question";
  import { Delete, Edit } from "@element-plus/icons-vue";
  
  const ref1 = ref(null);
  const ref2 = ref(null);
  const ref3 = ref(null);
  const ref4 = ref(null);
  const ref5 = ref(null);
  const ref6 = ref(null);
  
  const open = ref(false);
  
  const generateData = ref({
    flag: "1",
    content: "",
    t: 0,
    oneChoiceQuestion: 0,
    blankFillingQuestion: 0,
    briefAnswerQuestion: 0,
  });
  
  const resultContent = ref("");
  
  const generate = async () => {
    const res = await teacherGenerateQuestionsByAIAPI(
      generateData.value.content,
      generateData.value.t * 2,
      generateData.value.oneChoiceQuestion,
      generateData.value.blankFillingQuestion,
      generateData.value.briefAnswerQuestion
    );
    if (res.data.code === 200) {
      console.log(res);
      resultContent.value = res.data.data;
    } else {
      ElMessage.error("获取失败");
    }
  };
  </script>
  
  <style lang="scss" scoped>
  .bigBox {
    margin-top: 25px;
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    padding-left: 30px;
    // padding-right: 30px;
  
    // position: relative;
    min-height: calc(100vh - 200px);
  
    .left {
      // margin-left: 30px;
      flex: 1;
      min-width: 500px;
      margin-right: 30px;
      // background-color: antiquewhite;
  
      .grayText {
        color: gray;
      }
    }
  
    .right {
      min-width: 500px;
      margin-right: 30px;
      flex: 1;
      overflow-y: scroll;
      max-height: calc(100vh - 200px);
      padding-left: 10px;
      padding-right: 10px;
      // background-color: aquamarine;
  
  
      .text {
        color: #3B90FF;
        font-weight: bold;
        // margin-left: 20px;
        display: block;
        margin-bottom: 20px;
        font-size: 18px;
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
    // box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  
    span {
      font-weight: bold;
    }
  }
  
  
  .questions {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    padding: 20px;
    box-sizing: border-box;
    border-radius: 10px;
    position: relative;
  
    .button{
      display: none;
    }
  
    &:hover .button{
      display: block;
      display: flex;
      position: absolute;
      right:0;
      top:0;
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
  
  .analysisText {
  
    span {
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
  </style>
  