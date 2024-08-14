<template>
  <div class="backBox">
    <div class="head">
      <div class="leftSetting">
        <el-form :model="form" label-width="auto" style="max-width: 300px">
          <el-form-item label="作业名称">
            <el-input v-model="publishSetting.name" />
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
        <div class="saying">题量{{ questionsContentList.length }}，总分{{ totalScore }}分</div>
        <div class="bigKind">
          <div class="title">一、单选题</div>
          <div class="saying">题型说明</div>
          <div class="questionsDesc" v-for="(item, index) in questionsContentList"
            :class="{ active: activeListIndex === index }" @click="setCurrent(index)" :key="item"
            :title="JSON.parse(item.title).text">
            {{ index + 1 }}.({{ item.questionScore }}分)
            <!-- {{ JSON.parse(item.title).text }} -->
            <p v-html="JSON.parse(item.title).text"></p>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="choose">
          <div class="leftButton">
            <span style="margin-right: 20px">添加题目</span>
            <el-radio-group v-model="questionsContentList[activeListIndex].type" size="large">
              <el-radio-button label="单选题" value="单选题" />
              <el-radio-button label="多选题" value="多选题" />
              <el-radio-button label="简答题" value="简答题" />
              <el-radio-button label="判断题" value="判断题" />
              <el-radio-button label="填空题" value="填空题" />
            </el-radio-group>
            <el-button style="margin-left: 30px" type="success" @click="addNewOneQuestion">添加</el-button>
          </div>
          <div class="rightButton">
            <!-- <el-button size="mid" style="font-size: 15px" type="primary" text="primary">智能导入</el-button> -->
            <el-button size="mid" style="font-size: 15px" type="primary" text="primary"
              @click="chooseInQuestionsBank">题库选题</el-button>
          </div>
        </div>
        <div class="questionsDetails" v-if="questionsContentList.length > 0">
          <div class="deleteButton">
            <el-button style="font-size: 20px; border-radius: 0 5px 0 10px; width: 50px" type="primary" plain
              :icon="Delete" @click="deleteCurrentQuestion()"></el-button>
          </div>
          <div class="questionsKind">
            <el-button type="primary" @click="saveQuestions">确认</el-button>
            <span>{{ activeListIndex + 1 }}.{{
              questionsContentList[activeListIndex].type
            }}</span>
            <el-input style="width: 80px" v-model="questionsContentList[activeListIndex].questionScore"
              type="number"></el-input>
            <span style="margin-left: 20px">分</span>
          </div>
          <div class="questionContent">
            <Toolbar :editor="editorRef" style="border: 1px solid #ccc; margin-top: 20px" />
            <Editor v-model="valueHtml" class="editor"
              style="border: 1px solid #ccc; height: 200px; margin-bottom: 20px" @onCreated="handleCreated" />

            <!--        这个是单选题 -->
            <div v-if="questionsContentList[activeListIndex].type === '单选题'" class="radio">
              <el-radio-group v-model="questionsContentList[activeListIndex].answer" size="large">
                <div class="radioOptions" v-for="(option, optionIndex) in JSON.parse(
                  JSON.parse(questionsContentList[activeListIndex].title)
                    .options
                )" :key="optionIndex">
                  <el-radio-button style="border-radius: 20px" :label="String.fromCharCode(65 + optionIndex)"
                    :value="String.fromCharCode(65 + optionIndex)" />

                  <div style="margin-left: 20px" class="editor">
                    <myEditor :text="option" :ref="setRadioRef"></myEditor>
                  </div>
                  <el-button :icon="Delete" @click="deleteRadioOption(optionIndex)" style="margin-left: 20px"
                    type="primary" text="primary"></el-button>
                </div>
              </el-radio-group>
              <el-button type="primary" text="primary" :icon="Plus" style="margin-bottom: 20px"
                @click="addRadioOption">添加选项</el-button>
            </div>

            <!--        这个是多选题 -->
            <div v-else-if="
              questionsContentList[activeListIndex].type === '多选题'
            " class="checkBox">
              <el-checkbox-group v-model="checkBoxAnswer" size="large">
                <div class="checkBoxOptions" v-for="(option, optionIndex) in JSON.parse(
                  JSON.parse(questionsContentList[activeListIndex].title)
                    .options
                )" :key="optionIndex">
                  <el-checkbox-button :key="String.fromCharCode(65 + optionIndex)"
                    :value="String.fromCharCode(65 + optionIndex)">
                    {{ String.fromCharCode(65 + optionIndex) }}
                  </el-checkbox-button>

                  <div style="margin-left: 20px" class="editor">
                    <myEditor :text="option" :ref="setCheckBoxRef"></myEditor>
                  </div>
                  <el-button :icon="Delete" @click="deleteCheckBoxOption(optionIndex)" style="margin-left: 20px"
                    type="primary" text="primary"></el-button>
                </div>
              </el-checkbox-group>
              <el-button type="primary" text="primary" :icon="Plus" style="margin-bottom: 20px"
                @click="addCheckBoxOption">添加选项</el-button>
            </div>

            <!-- 填空题 -->
            <div v-else-if="
              questionsContentList[activeListIndex].type === '填空题'
            " class="fill">
              <div class="fillOptions" v-for="(option, optionIndex) in JSON.parse(
                JSON.parse(questionsContentList[activeListIndex].title)
                  .options
              )" :key="optionIndex">
                <span>第&nbsp;{{ optionIndex + 1 }}&nbsp;空</span>

                <div style="margin-left: 20px" class="editor">
                  <myEditor :text="option" :ref="setFillRef"></myEditor>
                </div>
                <el-button :icon="Delete" @click="deleteFillOption(optionIndex)" style="margin-left: 20px"
                  type="primary" text="primary"></el-button>
              </div>
              <el-button type="primary" text="primary" :icon="Plus" @click="addFillOption"
                style="margin-bottom: 20px">添加选项</el-button>
            </div>

            <!-- 这是判断题 -->
            <div v-else-if="
              questionsContentList[activeListIndex].type === '判断题'
            " class="judge">
              <el-radio-group v-model="questionsContentList[activeListIndex].answer" size="large">
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
            <div v-else-if="
              questionsContentList[activeListIndex].type === '简答题'
            " class="reply">
              <span>请输入答案</span>

              <div class="replyOptions" style="margin-bottom: 20px; margin-top: 20px">
                <div style="" class="editor">
                  <myEditor :text="questionsContentList[activeListIndex].answer" ref="replyAnswer"></myEditor>
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
        <el-select-v2 v-model="publishSetting.classIdList" :options="classListOptions" placeholder="选中班级"
          style="width: 240px" multiple />
      </el-form-item>
      <el-form-item label="有效时段">
        <el-date-picker v-model="publishSetting.beginDate" type="datetime" placeholder="开始时间" style="margin-right: 20px"
          value-format="YYYY-MM-DD HH:mm:ss" />
        至
        <el-date-picker v-model="publishSetting.endDate" type="datetime" placeholder="结束时间" style="margin-left: 20px"
          value-format="YYYY-MM-DD HH:mm:ss" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="toPublishHomework"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>


  <el-dialog v-model="importQuestionDialog" title="从题库中选题" width="90%">
    <el-input v-model="search" style="width: 200px" placeholder="请输入关键词" :prefix-icon="Search" />

    <el-table :data="filterTableData" :default-sort="{ prop: 'date', order: 'descending' }"
      style="width: 100%; margin-top: 20px">
      <!-- <el-table-column type="selection" width="55" /> -->
      <el-table-column width="55" align="left">
        <!-- <template #header>
        </template> -->
        <template #default="scope">
          <el-checkbox v-model="checkList[scope.$index+(pageData.current - 1) * pageSize]">
          </el-checkbox>
        </template>
      </el-table-column>
      <el-table-column label="题干">
        <template #default="scope">
          <p v-html="JSON.parse(scope.row.title).text"></p>
          <!-- {{ JSON.parse(scope.row.title).text }} -->
        </template>
      </el-table-column>

      <el-table-column label="题目类型" width="160px" prop="type" sortable />
      <el-table-column label="课程" width="200px" prop="courseName" sortable />

      <el-table-column prop="creatorName" width="160px" label="创建人" />
    </el-table>

    <div style="margin-top:20px;">
      <el-pagination layout="prev, pager, next" :total="pageData.total" v-model:current-page="pageData.current" />
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="importQuestionDialog = false">取消</el-button>
        <el-button type="primary" @click="importQuestion">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Delete, Plus, Search } from "@element-plus/icons-vue";
import { reactive } from "vue";
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import myEditor from "@/views/components/editor.vue";
import {
  teacherAddAssignmentAPI,
  teacherGetAllClassAPI,
  teacherPublishAssignmentAPI,
} from "@/apis/assignment";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import E from "wangeditor";
import { useUserStore } from '../../../../../stores/userStore';

import {
  teacherViewCourseQuestionAPI,
  teacherPageSearchQuestionsAPI
} from "../../../../../apis/question";

let assignmentId = 0;
const dialogFormVisible = ref(false);

const classListOptions = ref([])

const route = useRoute();
const router = useRouter();
const questionsRadio = ref("单选题");

const replyAnswer = ref();
const analysisRef = ref();

const radio = ref("");
const judge = ref("true");

const publishSetting = ref({
  type: 1,
  name: "",
  assignmentId: 1,
  beginDate: "",
  endDate: "",
  examTime: 120,
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
  // clear();
  let data = JSON.parse(
    questionsContentList.value[activeListIndex.value].title
  );
  data.options = JSON.parse(data.options);
  console.log(data.options)
  data.options.push("");

  data.options = JSON.stringify(data.options);
  questionsContentList.value[activeListIndex.value].title =
    JSON.stringify(data);

  // console.log(data)
};

const deleteRadioOption = (index: number) => {
  clear();

  let data = JSON.parse(
    questionsContentList.value[activeListIndex.value].title
  );
  data.options = JSON.parse(data.options);

  data.options = data.options.filter((item: any, i: number) => {
    return i !== index;
  });

  data.options = JSON.stringify(data.options);
  questionsContentList.value[activeListIndex.value].title =
    JSON.stringify(data);
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
  let data = JSON.parse(
    questionsContentList.value[activeListIndex.value].title
  );
  data.options = JSON.parse(data.options);

  data.options.push("");

  data.options = JSON.stringify(data.options);
  questionsContentList.value[activeListIndex.value].title =
    JSON.stringify(data);

  console.log(questionsContentList.value[activeListIndex.value].title);
};

const deleteCheckBoxOption = (index: number) => {
  let data = JSON.parse(
    questionsContentList.value[activeListIndex.value].title
  );
  data.options = JSON.parse(data.options);

  data.options = data.options.filter((item: any, i: number) => {
    return i !== index;
  });

  data.options = JSON.stringify(data.options);
  questionsContentList.value[activeListIndex.value].title =
    JSON.stringify(data);
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

interface questionsList extends Array<question> { }

const activeListIndex = ref(0);
const questionsContentList = ref<questionsList>([
  {
    questionScore: 5,
    studentScore: 0,
    type: "单选题",
    title: JSON.stringify({
      text: "这是一个题目示例",
      options: JSON.stringify(["", ""]),
    }),
    studentAnswer: "",
    questionComment: "",
    answer: "",
    answerAnalysis: "",
  },
]);

const saveCurrentQuestion = () => {
  // 保存当前这道题

  let flag = judgeQuestions();
  if (flag === false) return;

  questionsContentList.value[activeListIndex.value].answerAnalysis =
    analysisRef.value.add();

  if (questionsContentList.value[activeListIndex.value].type === "单选题") {
    let data = JSON.parse(
      questionsContentList.value[activeListIndex.value].title
    );
    data.options = JSON.parse(data.options);

    let num = eleRadioRef.value.length - data.options.length;

    // 最后渲染的那几个
    data.options = data.options.map((item) => {
      return eleRadioRef.value[num++].add();
    });

    data.text = valueHtml.value
    data.options = JSON.stringify(data.options);

    questionsContentList.value[activeListIndex.value].title =
      JSON.stringify(data);

    console.log(data)
  }
  else if (questionsContentList.value[activeListIndex.value].type === "多选题") {
    let data = JSON.parse(
      questionsContentList.value[activeListIndex.value].title
    );
    data.options = JSON.parse(data.options);

    let num = eleCheckBoxRef.value.length - data.options.length;

    // 最后渲染的那几个
    data.options = data.options.map((item) => {
      return eleCheckBoxRef.value[num++].add();
    });

    data.text = valueHtml.value
    data.options = JSON.stringify(data.options);

    questionsContentList.value[activeListIndex.value].title =
      JSON.stringify(data);

    questionsContentList.value[activeListIndex.value].answer = JSON.stringify(
      checkboxGroup.value
    );
  } else if (
    questionsContentList.value[activeListIndex.value].type === "判断题"
  ) {
    questionsContentList.value[activeListIndex.value].title = JSON.stringify({
      text: valueHtml.value,
      options: JSON.stringify([]),
    });
  } else if (
    questionsContentList.value[activeListIndex.value].type === "简答题"
  ) {

    questionsContentList.value[activeListIndex.value].title = JSON.stringify({
      text: valueHtml.value,
      options: JSON.stringify([])
    })

    questionsContentList.value[activeListIndex.value].answer = JSON.stringify(
      replyAnswer.value.add()
    );
  } else {
    // 填空题

    let data = JSON.parse(
      questionsContentList.value[activeListIndex.value].title
    );

    data.options = JSON.parse(data.options);

    let num = eleFillRef.value.length - data.options.length;

    let arry = [];
    // 最后渲染的那几个
    data.options = data.options.forEach((item) => {
      arry.push(eleFillRef.value[num++].add());
      return "";
    });

    data.text = valueHtml.value
    data.options = JSON.stringify(data.options);

    questionsContentList.value[activeListIndex.value].title =
      JSON.stringify(data);
  }

};

const saveQuestions = async () => {
  saveCurrentQuestion()

  const res = await teacherAddAssignmentAPI(
    1,
    parseInt(route.params.id as string),
    publishSetting.value.name,
    useUserStore().getUserInfo().roleId,
    questionsContentList.value,
    assignmentId === 0 ? null : assignmentId
  );

  if (res.data.code === 200) {
    ElMessage.success("保存成功");
    assignmentId = res.data.data;

    console.log(res.data.data)
  }
  else {
    console.log(res.data.message)
  }
}

const judgeQuestions = () => {
  if (activeListIndex.value === -1) return true;

  let flag = true;

  if (questionsContentList.value[activeListIndex.value].type === "简答题") {
    questionsContentList.value[activeListIndex.value].answer = JSON.stringify(
      replyAnswer.value.add()
    );

    if (replyAnswer.value.getText() === "") flag = false;
  } else if (
    questionsContentList.value[activeListIndex.value].type === "填空题"
  ) {
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

  if (questionsContentList.value[activeListIndex.value].answer === "") {
    ElMessage.error("您还没有设置当前题目的答案");
    return false;
  }

  if (flag === false) {
    ElMessage.error("您还没有设置当前题目的答案");
    return false;
  }
};

const deleteCurrentQuestion = () => {

  if (questionsContentList.value.length === 1) {
    ElMessage.error('当前只有一道题，您不能删除它')
    return
  }

  if (confirm('您确认要删除当前这道题吗')) {
    activeListIndex.value = 0;
    const currentIndex = activeListIndex.value; // 保存当前索引值
    const newQuestionsContentList = questionsContentList.value.filter((item, i) => {
      console.error(activeListIndex.value)
      console.log(i, currentIndex)
      return i !== currentIndex;
    });


    questionsContentList.value = newQuestionsContentList;
    nextTick(() => {
      saveQuestions();
    });
  }
}

// 清除所有实例
const clear = () => {
  eleRadioRef.value = [];
  eleCheckBoxRef.value = [];
  eleFillRef.value = [];
};

// 添加一道题
const addNewOneQuestion = () => {

  // 收集当前题目

  saveCurrentQuestion()

  nextTick(() => {
    let flag = judgeQuestions();
    if (flag === false) return false;

    questionsContentList.value.push({
      questionScore: 5,
      studentScore: 0,
      type: questionsRadio.value,
      title: JSON.stringify({
        text: "这是一个题目示例",
        options: JSON.stringify([]),
      }),
      studentAnswer: "",
      questionComment: "",
      answer: "",
      answerAnalysis: "",
    });

    activeListIndex.value = questionsContentList.value.length - 1;

    valueHtml.value = '这是一个题目示例'

    if (questionsContentList.value[activeListIndex.value].type === "单选题") {
      questionsContentList.value[activeListIndex.value].title = JSON.stringify({
        text: "这是一个题目示例",
        options: JSON.stringify(["", "", "", ""]),
      });
    } else if (
      questionsContentList.value[activeListIndex.value].type === "多选题"
    ) {
      questionsContentList.value[activeListIndex.value].title = JSON.stringify({
        text: "这是一个题目示例",
        options: JSON.stringify(["", "", "", ""]),
      });
    } else if (
      questionsContentList.value[activeListIndex.value].type === "填空题"
    ) {
      questionsContentList.value[activeListIndex.value].title = JSON.stringify({
        text: "这是一个题目示例",
        options: JSON.stringify([""]),
      });
    } else if (
      questionsContentList.value[activeListIndex.value].type === "简答题"
    ) {
      questionsContentList.value[activeListIndex.value].title = JSON.stringify({
        text: "这是一个题目示例",
        options: JSON.stringify([]),
      });
    } else if (
      questionsContentList.value[activeListIndex.value].type === "判断题"
    ) {
      questionsContentList.value[activeListIndex.value - 1].title =
        JSON.stringify({
          text: "这是一个题目示例",
          options: JSON.stringify([]),
        });
    }

    console.log(questionsContentList.value[activeListIndex.value])
  })


};

// 作业模块

const addHomeWork = async () => {
  //添加作业

  let flag = confirm("您确定要添加此次作业吗");

  if (flag === false) return;

  console.log(questionsContentList.value);

  if (publishSetting.value.name.trim() === "") {
    ElMessage.error("您还没设置作业名称");
    return;
  }

  dialogFormVisible.value = true;
};



const toPublishHomework = async () => {

  if (assignmentId === 0) {
    // alert(1)
    await saveQuestions()
  }

  nextTick(async () => {
    const res = await teacherPublishAssignmentAPI(
      1,
      assignmentId,
      publishSetting.value.beginDate,
      publishSetting.value.endDate,
      publishSetting.value.examTime,
      publishSetting.value.classIdList
    );

    if (res.data.code === 200) {
      ElMessage.success("添加成功");
      setTimeout(() => {
        router.push("/course/" + route.params.id + '/homework/index');
      }, 2000);
    } else {
      ElMessage.error(res.data.message);
    }

    dialogFormVisible.value = false;
  })


};

const setCurrent = (index: number) => {

  let flag = judgeQuestions()

  if (flag === false) return;

  activeListIndex.value = index;

  questionsRadio.value = questionsContentList.value[activeListIndex.value].type;

  valueHtml.value = JSON.parse(questionsContentList.value[activeListIndex.value].title).text
};

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("<p>这是一个题目示例</p>");
const answerValue = ref("<p></p>");

// 模拟 ajax 异步获取内容
onMounted(() => { });

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

const classList = ref([]);

const setClassList = async () => {
  const res = await teacherGetAllClassAPI();

  if (res.data.code === 200) {
    classList.value = res.data.data;

    classListOptions.value = classList.value.map(item => {
      return {
        label: item.className,
        value: item.id
      }
    })
  } else {
    ElMessage.error(res.data.message);
  }
};

const totalScore = computed(() => {
  return questionsContentList.value.reduce((s, a) => {
    return s + a.questionScore
  }, 0)
})

onMounted(() => {
  setClassList();
});

// 导入题库模块

const importQuestionDialog = ref(false)

interface Paper {
  id: number;
  type: string;
  title: string;
  answer: string;
  answerAnalysis: string;
  courseId: number;
  courseName: string;
  creatorId: number;
  creatorName: string;
}

const search = ref("");

const pageData = ref({
  total: 0,
  current: 1,
})

const pageSize = 5; // 每页显示的数据数量

const checkList = ref([])

const tableData = ref<Array<Paper>>();

const filterTableData = computed(() => {
  const filteredData = tableData.value.filter((data) =>
    !search.value || data.title.toLowerCase().includes(search.value.toLowerCase())
  );

  // 计算当前页的开始和结束索引
  const startIndex = (pageData.value.current - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // 返回当前页的数据
  return filteredData.slice(startIndex, endIndex);
}
);

const getQuestions = async () => {

  // 清楚所有选择
  for (let i = 0; i < checkList.value.length; i++) {
    checkList.value[i] = false
  }

  const reponse = await teacherViewCourseQuestionAPI(parseInt(route.params.id as string));

  if (reponse.data.code == 200) {
    tableData.value = reponse.data.data

    for (let i = 0; i < tableData.value.length; i++) {
    checkList.value[i] = false
  }
  }

  const res = await teacherPageSearchQuestionsAPI(parseInt(route.params.id as string), pageData.value.current, pageSize)

  if (res.data.code === 200) {
    // tableData.value = res.data.data.records
    pageData.value.total = res.data.data.total
  }
  else {
    ElMessage.error('获取出错');

  }
};

const chooseInQuestionsBank = async () => {

  await getQuestions()

  importQuestionDialog.value = true
}

const importQuestion = () => {

  // 导入题目

  for (let i = 0; i < checkList.value.length; i++) {
    if (checkList.value[i]) {
      questionsContentList.value.push({
        questionScore: 3,
        studentScore: 0,
        type: tableData.value[i].type,
        title: tableData.value[i].title,
        studentAnswer: '',
        questionComment: '',
        answer: tableData.value[i].answer,
        answerAnalysis: tableData.value[i].answerAnalysis
      })
    }
  }

  saveQuestions()

  importQuestionDialog.value = false
}

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
        border: 1px solid #eee;
        border-radius: 2px;
        overflow: hidden;
        /* 显示三行文字，超出部分用省略号表示 */
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
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
