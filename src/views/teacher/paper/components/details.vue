<template>
  <div class="backBox">
    <div class="head">
      <div class="leftSetting">
        <el-form :model="form" label-width="auto" style="max-width: 300px">
          <el-form-item label="试卷名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="题目编号">
            <el-radio-group v-model="form.choose">
              <el-radio value="1">连续编号</el-radio>
              <el-radio value="2">按题型编号</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-button type="primary">修改</el-button>
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
          <div class="questionsDesc" v-for="item in 4">
            1.(5.0分) 哇喀喀喀喀喀喀
          </div>
        </div>
      </div>
      <div class="right">
        <div class="choose">
          
          <div class="leftButton">
            <span style="margin-right:20px;">添加题目</span>
            <el-radio-group v-model="questionsRadio" size="large">
              <el-radio-button label="单选题" value="radio" />
              <el-radio-button label="多选题" value="checkBox" />
              <el-radio-button label="简答题" value="reply" />
              <el-radio-button label="判断题" value="judge" />
              <el-radio-button label="填空题" value="fill" />
            </el-radio-group>
          </div>
          <div class="rightButton">
            <el-button
              size="mid"
              style="font-size: 15px"
              type="primary"
              text="primary"
              >智能导入</el-button
            >
            <el-button
              size="mid"
              style="font-size: 15px"
              type="primary"
              text="primary"
              >选题</el-button
            >
          </div>
        </div>
        <div class="questionsDetails">
          <div class="deleteButton">
            <el-button
              style="font-size: 20px; border-radius: 0 5px 0 10px; width: 50px"
              type="primary"
              plain
              :icon="Delete"
            ></el-button>
          </div>
          <div class="questionsKind">
            <span>1.简答题</span>
            <el-input style="width: 80px" type="number"></el-input>
            <span>分</span>
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
            <div class="radio">
              <el-radio-group v-model="radio" size="large">
                <div class="radioOptions" v-for="(item, index) in radioOptions">
                  <el-radio-button
                    style="border-radius: 20px"
                    :label="String.fromCharCode(65 + index)"
                    :value="String.fromCharCode(65 + index)"
                  />
                  <el-input
                    v-if="item === false"
                    style="margin-left: 20px; max-width: 900px"
                    @focus="changeRadio(index, true)"
                  ></el-input>
                  <div v-else style="margin-left: 20px" class="editor">
                    <myEditor></myEditor>
                  </div>
                </div>
              </el-radio-group>
              <el-button
                type="primary"
                text="primary"
                :icon="Plus"
                style="margin-bottom: 20px"
                >添加选项</el-button
              >
            </div>

            <!--        这个是多选题 -->
            <!-- <div class="checkBox">
              <el-checkbox-group v-model="checkboxGroup" size="large">
                <div class="checkBoxOptions" v-for="(item, index) in radioOptions">
                  <el-checkbox-button
                    :key="String.fromCharCode(65 + index)"
                    :value="String.fromCharCode(65 + index)"
                  >
                    {{ String.fromCharCode(65 + index) }}
                  </el-checkbox-button>
                  <el-input
                    v-if="item === false"
                    style="margin-left: 20px; max-width: 900px"
                    @focus="changeRadio(index, true)"
                  ></el-input>
                  <div v-else style="margin-left: 20px" class="editor">
                    <myEditor></myEditor>
                  </div>
                </div>
              </el-checkbox-group>
              <el-button type="primary" text="primary" :icon="Plus" style="margin-bottom:20px">添加选项</el-button>
            </div> -->

            <!-- 填空题 -->
            <!-- <div class="fill">
              <div class="fillOptions" v-for="(item, index) in radioOptions">
                <span>第一空</span>
                <el-input
                  v-if="item === false"
                  style="margin-left: 20px; max-width: 900px"
                  @focus="changeRadio(index, true)"
                ></el-input>
                <div v-else style="margin-left: 20px" class="editor">
                  <myEditor></myEditor>
                </div>
              </div>
              <el-button type="primary" text="primary" :icon="Plus" style="margin-bottom:20px">添加选项</el-button>
            </div> -->

            <!-- 这是判断题 -->
            <!-- <div class="judge">
              <el-radio-group v-model="radio" size="large">
                <div class="judgeOptions">
                  <el-radio-button
                    style="border-radius: 20px"
                    label="A"
                    value="A"
                  />
                  <span style="line-height:40px;margin-left:20px">对</span>
                </div>
                <div class="judgeOptions">
                  <el-radio-button
                    style="border-radius: 20px"
                    label="B"
                    value="B"
                  />
                  <span style="line-height:40px;margin-left:20px">错</span>
                </div>
              </el-radio-group>
            </div> -->

            <!-- 这是简答题 -->
            <!-- <div class="reply">
              <div class="replyOptions">
                <el-input
                  v-if="replyOptions === false"
                  placeholder="请输入答案"
                  style="max-width: 900px"
                  @focus="replyOptions=true"
                ></el-input>
                <div v-else style="" class="editor">
                  <myEditor></myEditor>
                </div>
              </div>
            </div> -->

            <!-- 分析模块 -->
            <hr />
            <div class="analysis">
              <el-input
                v-if="analysisChoose === false"
                placeholder="请输入解析"
                style="margin-top: 20px; max-width: 900px"
                @focus="analysisChoose = true"
              ></el-input>
              <div v-else style="margin-top: 20px" class="editor">
                <myEditor></myEditor>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Delete, Plus } from "@element-plus/icons-vue";
import { reactive } from "vue";
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import myEditor from "@/views/components/editor.vue";

const questionsRadio = ref("radio");
const radio = ref("A");
const radioOptions = ref([false, false, false, false]);
const checkboxGroup = ref(["A"]);
const replyOptions = ref(false);

const analysisChoose = ref(false);

const changeRadio = (index: number, value: boolean) => {
  analysisChoose.value=false
  for (let i = 0; i < radioOptions.value.length; i++) {
    radioOptions.value[i] = false;
  }

  radioOptions.value[index] = value;
};

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("<p>hello</p>");
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
