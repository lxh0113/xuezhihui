<template>
  <div class="backBox">
    <div class="head">
      <div class="leftSetting">
        <el-form :model="form" label-width="auto" style="max-width: 300px">
          <el-form-item label="作业名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="题目编号">
            <el-radio-group v-model="form.choose">
              <el-radio value="1">连续编号</el-radio>
              <el-radio value="2">按题型编号</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-button type="primary" @click="addHomeWork">确认发布</el-button>
          <!-- <el-button type="primary"></el-button> -->
        </el-form>
      </div>
      <div class="png">
        <img src="@/assets/image/edit.png" alt="" />
      </div>
    </div>
    <div class="bottom">
      <div class="left">
        <div class="saying">题量1，总分5.0分</div>
        <div class="bigKind">
          <div class="title">一、单选题</div>
          <div class="saying">题型说明</div>
          <div
            class="questionsDesc"
            v-for="(item, index) in questionsContentList"
            :class="{ active: activeListIndex === index }"
            @click="setCurrent(index)"
            :key="item"
          >
            {{ index + 1 }}.({{ item.questionScore }}分)
            {{ JSON.parse(item.title).text }}
          </div>
        </div>
      </div>
      <div class="right">
        <div class="choose">
          <div class="leftButton">
            <span style="margin-right: 20px">添加题目</span>
            <el-radio-group
              v-model="questionsContentList[activeListIndex].type"
              size="large"
            >
              <el-radio-button label="单选题" value="单选题" />
              <el-radio-button label="多选题" value="多选题" />
              <el-radio-button label="简答题" value="简答题" />
              <el-radio-button label="判断题" value="判断题" />
              <el-radio-button label="填空题" value="填空题" />
            </el-radio-group>
            <el-button style="margin-left: 30px" type="success" @click="addNewOneQuestion"
              >添加</el-button
            >
          </div>
          <div class="rightButton">
            <el-button size="mid" style="font-size: 15px" type="primary" text="primary"
              >智能导入</el-button
            >
            <el-button size="mid" style="font-size: 15px" type="primary" text="primary"
              >选题</el-button
            >
          </div>
        </div>
        <div class="questionsDetails" v-if="questionsContentList.length > 0">
          <div class="deleteButton">
            <el-button
              style="font-size: 20px; border-radius: 0 5px 0 10px; width: 50px"
              type="primary"
              plain
              :icon="Delete"
            ></el-button>
          </div>
          <div class="questionsKind">
            <el-button type="primary" @click="saveCurrentQuestion">确认</el-button>
            <span
              >{{ activeListIndex + 1 }}.{{
                questionsContentList[activeListIndex].type
              }}</span
            >
            <el-input
              style="width: 80px"
              v-model="questionsContentList[activeListIndex].questionScore"
              type="number"
            ></el-input>
            <span style="margin-left: 20px">分</span>
          </div>
          <div class="questionContent">
            <Toolbar
              :editor="editorRef"
              style="border: 1px solid #ccc; margin-top: 20px"
            />
            <Editor
              v-model="valueHtml"
              class="editor"
              style="border: 1px solid #ccc; height: 200px; margin-bottom: 20px"
              @onCreated="handleCreated"
            />

            <!--        这个是单选题 -->
            <div
              v-if="questionsContentList[activeListIndex].type === '单选题'"
              class="radio"
            >
              <el-radio-group
                v-model="questionsContentList[activeListIndex].answer"
                size="large"
              >
                <div
                  class="radioOptions"
                  v-for="(option, optionIndex) in JSON.parse(
                    JSON.parse(questionsContentList[activeListIndex].title).options
                  )"
                  :key="optionIndex"
                >
                  <el-radio-button
                    style="border-radius: 20px"
                    :label="String.fromCharCode(65 + optionIndex)"
                    :value="String.fromCharCode(65 + optionIndex)"
                  />

                  <div style="margin-left: 20px" class="editor">
                    <myEditor :text="option" :ref="setRadioRef"></myEditor>
                  </div>
                  <el-button
                    :icon="Delete"
                    @click="deleteRadioOption(optionIndex)"
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
            <div
              v-else-if="questionsContentList[activeListIndex].type === '多选题'"
              class="checkBox"
            >
              <el-checkbox-group v-model="checkBoxAnswer" size="large">
                <div
                  class="checkBoxOptions"
                  v-for="(option, optionIndex) in JSON.parse(
                    JSON.parse(questionsContentList[activeListIndex].title).options
                  )"
                  :key="optionIndex"
                >
                  <el-checkbox-button
                    :key="String.fromCharCode(65 + optionIndex)"
                    :value="String.fromCharCode(65 + optionIndex)"
                  >
                    {{ String.fromCharCode(65 + optionIndex) }}
                  </el-checkbox-button>

                  <div style="margin-left: 20px" class="editor">
                    <myEditor :text="option" :ref="setCheckBoxRef"></myEditor>
                  </div>
                  <el-button
                    :icon="Delete"
                    @click="deleteCheckBoxOption(optionIndex)"
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
            <div
              v-else-if="questionsContentList[activeListIndex].type === '填空题'"
              class="fill"
            >
              <div
                class="fillOptions"
                v-for="(option, optionIndex) in JSON.parse(
                  JSON.parse(questionsContentList[activeListIndex].title).options
                )"
                :key="optionIndex"
              >
                <span>第&nbsp;{{ optionIndex + 1 }}&nbsp;空</span>

                <div style="margin-left: 20px" class="editor">
                  <myEditor :text="option" :ref="setFillRef"></myEditor>
                </div>
                <el-button
                  :icon="Delete"
                  @click="deleteFillOption(optionIndex)"
                  style="margin-left: 20px"
                  type="primary"
                  text="primary"
                ></el-button>
              </div>
              <el-button
                type="primary"
                text="primary"
                :icon="Plus"
                @click="addFillOption"
                style="margin-bottom: 20px"
                >添加选项</el-button
              >
            </div>

            <!-- 这是判断题 -->
            <div
              v-else-if="questionsContentList[activeListIndex].type === '判断题'"
              class="judge"
            >
              <el-radio-group
                v-model="questionsContentList[activeListIndex].answer"
                size="large"
              >
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
            <div
              v-else-if="questionsContentList[activeListIndex].type === '简答题'"
              class="reply"
            >
              <span>请输入答案</span>

              <div class="replyOptions" style="margin-bottom: 20px; margin-top: 20px">
                <div style="" class="editor">
                  <myEditor
                    :text="questionsContentList[activeListIndex].answer"
                    ref="replyAnswer"
                  ></myEditor>
                </div>
              </div>
            </div>

            <!-- 分析模块 -->
            <hr />
            <div class="analysis" style="margin-top: 20px">
              <span>请输入解析</span>
              <div style="margin-top: 20px" class="editor">
                <myEditor ref="analysisRef"></myEditor>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <el-dialog v-model="dialogFormVisible" title="发布作业" width="640">
    <el-form :model="publishSetting">
      <el-form-item label="发放对象">
        <el-select
          v-model="publishSetting.classIdList"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="选择班级"
          style="width: 240px"
        >
          <el-option />
        </el-select>
      </el-form-item>
      <el-form-item label="有效时段">
        <el-date-picker
          v-model="form.startTime"
          type="datetime"
          placeholder="开始时间"
          style="margin-right: 20px"
        />
        至
        <el-date-picker
          v-model="form.endTime"
          type="datetime"
          placeholder="结束时间"
          style="margin-left: 20px"
        />
      </el-form-item>
      <el-form-item label="督促设置">
        <el-checkbox v-model="form.supervise">
          在作业截至<el-input
            size="mid"
            style="width: 50px; margin-left: 10px; margin-right: 10px"
            v-model="form.superviseTime"
          ></el-input
          >分钟的的时候发通知提醒学生
        </el-checkbox>

        <el-checkbox v-model="form.smartSupervise"> 智能提醒 </el-checkbox>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="toPublishHomework"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Delete, Plus } from "@element-plus/icons-vue";
import { reactive } from "vue";
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import myEditor from "@/views/components/editor.vue";
import { watch } from "vue";
import { teacherAddAssignmentAPI } from "@/apis/assignment";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import E from "wangeditor";
import { useUserStore } from "../../../../../stores/userStore";

const userStore = useUserStore();

let assignmentId = 0;
const dialogFormVisible = ref(false);

const route = useRoute();
const router = useRouter();
const questionsRadio = ref("单选题");

const replyAnswer = ref();
const analysisRef = ref();

const radio = ref("");
const judge = ref("true");

const publishSetting = ref({
  type: 1,
  assignmentId: 1,
  beginDate: "",
  endDate: "",
  classIdList: [],
});

// 单选题
const radioAnswer = ref(["", "", "", ""]);

const eleRadioRef = ref([]);
const setRadioRef = (el: any) => {
  if (el) {
    eleRadioRef.value.push(el);
  }
};

const addRadioOption = () => {
  // radioAnswer.value.push("");
  clear();
  let data = JSON.parse(questionsContentList.value[activeListIndex.value].title);
  data.options = JSON.parse(data.options);

  data.options.push("");

  data.options = JSON.stringify(data.options);
  questionsContentList.value[activeListIndex.value].title = JSON.stringify(data);

  console.log(questionsContentList.value[activeListIndex.value].title);
};

const deleteRadioOption = (index: number) => {
  clear();

  let data = JSON.parse(questionsContentList.value[activeListIndex.value].title);
  data.options = JSON.parse(data.options);

  data.options = data.options.filter((item: any, i: number) => {
    return i !== index;
  });

  data.options = JSON.stringify(data.options);
  questionsContentList.value[activeListIndex.value].title = JSON.stringify(data);
};

// 多选题
const checkboxGroup = ref();
const checkBoxAnswer = ref(["", "", "", ""]);

const eleCheckBoxRef = ref([]);
const setCheckBoxRef = (el: any) => {
  if (el) {
    eleCheckBoxRef.value.push(el);
  }
};

const addCheckBoxOption = () => {
  clear();
  let data = JSON.parse(questionsContentList.value[activeListIndex.value].title);
  data.options = JSON.parse(data.options);

  data.options.push("");

  data.options = JSON.stringify(data.options);
  questionsContentList.value[activeListIndex.value].title = JSON.stringify(data);

  console.log(questionsContentList.value[activeListIndex.value].title);
};

const deleteCheckBoxOption = (index: number) => {
  let data = JSON.parse(questionsContentList.value[activeListIndex.value].title);
  data.options = JSON.parse(data.options);

  data.options = data.options.filter((item: any, i: number) => {
    return i !== index;
  });

  data.options = JSON.stringify(data.options);
  questionsContentList.value[activeListIndex.value].title = JSON.stringify(data);
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
  clear();
  fillAnswer.value.push("");

  // 当前的选项也需要多
  questionsContentList.value[activeListIndex.value].title = JSON.stringify({
    text: "",
    options: JSON.stringify(
      fillAnswer.value.map((item) => {
        return "";
      })
    ),
  });
};

const deleteFillOption = (index: number) => {
  console.log(index);
  fillAnswer.value = fillAnswer.value.filter((item, i) => {
    return i !== index;
  });
};

// 左侧题目列表

interface question {
  questionScore: number;
  studentScore: number;
  type: string;
  title: string;
  studentAnswer: string;
  questionComment: string;
  answer: string;
  answerAnalysis: string;
}

interface questionsList extends Array<question> {}

const activeListIndex = ref(0);
const questionsContentList = ref<questionsList>([
  {
    questionScore: 5,
    studentScore: 0,
    type: "单选题",
    title: JSON.stringify({
      text: "这是一个题目示例",
      options: JSON.stringify([""]),
    }),
    studentAnswer: "",
    questionComment: "",
    answer: "",
    answerAnalysis: "",
  },
]);

const saveCurrentQuestion = async () => {
  // 保存当前这道题

  console.log(eleRadioRef.value.length);

  let flag = judgeQuestions();
  if (flag === false) return;

  console.log(editorRef.value.getText());

  questionsContentList.value[
    activeListIndex.value
  ].answerAnalysis = analysisRef.value.add();

  if (questionsContentList.value[activeListIndex.value].type === "单选题") {
    let data = JSON.parse(questionsContentList.value[activeListIndex.value].title);
    data.options = JSON.parse(data.options);

    let num = eleRadioRef.value.length - data.options.length;

    // 最后渲染的那几个
    data.options = data.options.map((item) => {
      return eleRadioRef.value[num++].add();
    });

    data.options = JSON.stringify(data.options);

    questionsContentList.value[activeListIndex.value].title = JSON.stringify(data);
  } else if (questionsContentList.value[activeListIndex.value].type === "多选题") {
    let data = JSON.parse(questionsContentList.value[activeListIndex.value].title);
    data.options = JSON.parse(data.options);

    let num = eleCheckBoxRef.value.length - data.options.length;

    // 最后渲染的那几个
    data.options = data.options.map((item) => {
      return eleCheckBoxRef.value[num++].add();
    });

    data.options = JSON.stringify(data.options);

    questionsContentList.value[activeListIndex.value].title = JSON.stringify(data);

    questionsContentList.value[activeListIndex.value].answer = JSON.stringify(
      checkboxGroup.value
    );
  } else if (questionsContentList.value[activeListIndex.value].type === "判断题") {
    questionsContentList.value[activeListIndex.value].title = JSON.stringify({
      text: editorRef.value.getText(),
      options: JSON.stringify([]),
    });
  } else if (questionsContentList.value[activeListIndex.value].type === "简答题") {
    questionsContentList.value[activeListIndex.value].answer = JSON.stringify(
      replyAnswer.value.add()
    );
  } else {
    // 填空题

    let data = JSON.parse(questionsContentList.value[activeListIndex.value].title);
    data.options = JSON.parse(data.options);

    let num = eleFillRef.value.length - data.options.length;

    let arry = [];
    // 最后渲染的那几个
    data.options = data.options.forEach((item) => {
      arry.push(eleFillRef.value[num++].add());
      return "";
    });

    data.options = JSON.stringify(data.options);

    questionsContentList.value[activeListIndex.value].title = JSON.stringify(data);

    // // 设置答案
    // questionsContentList.value[activeListIndex.value].answer = JSON.stringify(
    //   eleFillRef.value.map((item) => {
    //     return item.add();
    //   })
    // );
  }

  // clear()

  const res = await teacherAddAssignmentAPI(
    1,
    parseInt(route.params.id as string),
    form.name,
    userStore.getUserInfo().roleId,
    questionsContentList.value,
    assignmentId === 0 ? null : assignmentId
  );

  if (res.data.code === 200) {
    ElMessage.success("保存成功");
  }
};

const judgeQuestions = () => {
  if (activeListIndex.value === -1) return true;

  let flag = true;

  if (questionsContentList.value[activeListIndex.value].type === "简答题") {
    questionsContentList.value[activeListIndex.value].answer = JSON.stringify(
      replyAnswer.value.add()
    );

    if (replyAnswer.value.getText() === "") flag = false;
  } else if (questionsContentList.value[activeListIndex.value].type === "填空题") {
    // 填空题

    // 设置答案
    questionsContentList.value[activeListIndex.value].answer = JSON.stringify(
      eleFillRef.value.map((item) => {
        if (item.getText() === "") flag = false;
        return item.add();
      })
    );
  }

  console.log(questionsContentList.value[activeListIndex.value].answer);

  // clear()
  if (questionsContentList.value[activeListIndex.value].type === "多选题") {
    if(JSON.stringify(checkboxGroup.value)===JSON.stringify([]))
    {
      ElMessage.error("您还没有设置答案")
      return false
    }
  } else if (questionsContentList.value[activeListIndex.value].answer === "") {
    ElMessage.error("您还没有设置答案");
    return false;
  }

  if (flag === false) {
    ElMessage.error("您还没有设置答案");
    return false;
  }
};

// 清楚所以实例
const clear = () => {
  eleRadioRef.value = [];
  eleCheckBoxRef.value = [];
  eleFillRef.value = [];
};

watch(
  () => questionsContentList.value[activeListIndex.value].type,
  (newValue) => {
    // questionsContentList.value[activeListIndex.value].answer=[]
  }
);

// 添加一道题
const addNewOneQuestion = () => {
  clear();

  let flag = judgeQuestions();
  if (flag === false) return false;

  questionsContentList.value.push({
    questionScore: 5,
    studentScore: 0,
    type: questionsRadio.value,
    title: JSON.stringify({
      text: "这是一个题目示例",
      options: JSON.stringify(""),
    }),
    studentAnswer: "",
    questionComment: "",
    answer: "",
    answerAnalysis: "",
  });

  activeListIndex.value = questionsContentList.value.length - 1;

  if (questionsContentList.value[activeListIndex.value].type === "单选题") {
    questionsContentList.value[activeListIndex.value].title = JSON.stringify({
      text: "这是一个题目示例",
      options: JSON.stringify(["A选项", "B选项", "C选项", "D选项"]),
    });
  } else if (questionsContentList.value[activeListIndex.value].type === "多选题") {
    questionsContentList.value[activeListIndex.value].title = JSON.stringify({
      text: "这是一个题目示例",
      options: JSON.stringify(["A选项", "B选项", "C选项", "D选项"]),
    });
  } else if (questionsContentList.value[activeListIndex.value].type === "填空题") {
    questionsContentList.value[activeListIndex.value].title = JSON.stringify({
      text: "这是一个题目示例",
      options: JSON.stringify(["第一空"]),
    });
  } else if (questionsContentList.value[activeListIndex.value].type === "简答题") {
    questionsContentList.value[activeListIndex.value].title = JSON.stringify({
      text: "这是一个题目示例",
      options: JSON.stringify([]),
    });
  } else if (questionsContentList.value[activeListIndex.value].type === "判断题") {
    questionsContentList.value[activeListIndex.value - 1].title = JSON.stringify({
      text: "这是一个题目示例",
      options: JSON.stringify([]),
    });
  }

  //
};

// 作业模块

const addHomeWork = async () => {
  //添加作业

  let flag = confirm("您确定要添加此次作业吗");

  if (flag === false) return;

  console.log(questionsContentList.value);

  if (form.name.trim() === "") {
    ElMessage.error("您还没设置作业名称");
    return;
  }

  dialogFormVisible.value = true;
};

const toPublishHomework = async () => {
  const res = await teacherAddAssignmentAPI(
    1,
    parseInt(route.params.assignmentId as string),
    form.name,
    userStore.getUserInfo().roleId,
    questionsContentList.value,
    assignmentId === 0 ? null : assignmentId
  );

  if (res.data.code === 200) {
    ElMessage.success("添加成功");
    setTimeout(() => {
      router.push("/course/" + route.params.id);
    }, 2000);
  } else {
    ElMessage.error(res.data.message);
  }

  dialogFormVisible.value = false;
};

const setCurrent = (index: number) => {
  activeListIndex.value = index;

  questionsRadio.value = questionsContentList.value[activeListIndex.value].type;
};

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("<p>这是一个题目示例</p>");
const answerValue = ref("<p></p>");

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

const form = reactive({
  name: "",
  choose: "1",
});
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>

<style lang="scss" scoped>
.el-radio-group,
.el-checkbox-group {
  font-size: 16px !important;
}

.backBox {
  margin-right: 20px;
  //   min-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;

  .head {
    background: $primary-white-color;
    border-radius: 5px;
    height: 200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    .leftSetting {
      padding-left: 20px;
      flex: 1;
      display: flex;
      align-items: center;
    }

    .png {
      padding-right: 20px;
      img {
        width: 160px;
      }
    }
  }

  .bottom {
    display: flex;

    .left {
      background: $primary-white-color;
      margin-right: 20px;
      border-radius: 5px;
      padding: 20px;
      width: 240px;
      margin-bottom: 20px;
      min-height: 500px;

      .saying {
        color: $primary-gray-text-color;
        font-size: 14px;
      }

      .bigKind {
        line-height: 40px;
        // margin-bottom: 10px;
      }

      .active {
        background: $primary-selected-background-color;
      }

      .questionsDesc {
        color: $primary-selected-text-color;
        margin-bottom: 10px;
        padding-left: 5px;
        cursor: pointer;
      }
    }

    .right {
      flex: 1;
      min-width: 800px;
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;

      .choose {
        display: flex;
        justify-content: space-between;
        border-radius: 5px;
        background: $primary-white-color;
        padding: 20px;
        height: 60px;
        margin-bottom: 20px;

        align-items: center;
        .leftButton {
          span {
            color: $primary-gray-text-color;
          }
        }

        .rightButton {
          display: flex;
          justify-content: right;
          //   background: red;
        }
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
        width: 100%;
        display: flex;
        margin-bottom: 20px;
      }
    }
  }
}
</style>
