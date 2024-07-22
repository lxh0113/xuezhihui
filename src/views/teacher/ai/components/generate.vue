<template>
  <div class="bigBox">
    <div class="left">
      <el-tour v-model="open">
        <el-tour-step :target="ref1?.$el" title="第一步">
          <span> 在这里你可以选择出题方式 </span>
        </el-tour-step>
        <el-tour-step :target="ref2?.$el" title="第二步">
          <span>这里可以输入你想出题的材料或者知识点</span>
        </el-tour-step>
        <el-tour-step :target="ref3?.$el" title="第三步">
          <span>输入你想出题的数量，每个都最多10道题</span>
        </el-tour-step>
        <el-tour-step :target="ref4?.$el" title="第四步">
          <span>选择难度系数，越高越难</span>
        </el-tour-step>
        <el-tour-step :target="ref5?.$el" title="第五步">
          <span>点击提交，注意AI出题较慢，请耐心等待</span>
        </el-tour-step>
        <el-tour-step :target="ref6?.$el" title="第六步">
          <span>最后的结果会在这里显示</span>
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
          <span
            >您输入的材料会给到大模型用作训练，请谨慎使用以避免重要数据泄漏。</span
          >
          <el-input
            rows="10"
            v-model="generateData.content"
            type="textarea"
            resize="false"
          />
        </el-form-item>
        <el-form-item ref="ref3" label="所需题目数量">
          单选题:&nbsp;<el-input
            max="10"
            min="0"
            v-model="generateData.oneChoiceQuestion"
            style="width: 75px; margin-right: 20px"
            type="number"
          ></el-input>
          填空题:&nbsp;<el-input
            max="10"
            min="0"
            v-model="generateData.blankFillingQuestion"
            style="width: 75px; margin-right: 20px"
            type="number"
          ></el-input>
          简答题:&nbsp;<el-input
            max="10"
            min="0"
            v-model="generateData.briefAnswerQuestion"
            style="width: 75px"
            type="number"
          ></el-input>
        </el-form-item>
        <el-form-item ref="ref4" label="难度系数">
          <el-rate v-model="generateData.t" size="large" allow-half />
        </el-form-item>
        <p class="grayText">使用须知：</p>
        <p class="grayText">1.每道题只能最多出10道</p>
        <p class="grayText">
          可选择指定的难度系数，响应时间可能会比较慢，请耐心等待
        </p>
        <p class="grayText">
          2.注意：偶有AI返回的数据不完整是正常情况，受限于AI模型能力，请自行确认AI
          出题结果是否存在谬误。
        </p>
        <hr />
        <el-form-item style="margin-top: 20px">
          <el-button ref="ref5" type="primary" @click="generate">
            提交
          </el-button>
          <el-button type="success" @click="open = true">新手引导</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="right">
      <el-form label-position="top" label-width="100px">
        <el-form-item ref="ref6" label="AI出题结果">
          <el-input
            rows="30"
            v-model="resultContent"
            type="textarea"
            resize="false"
          />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import { getAIGenerateQuestionAPI } from "@/apis/ai.js"
import { ElMessage } from "element-plus";
import { teacherGenerateQuestionsByAIAPI } from "@/apis/question";

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
    // background-color: aquamarine;
  }
}
</style>
