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
                    <span>您输入的材料会给到大模型用作训练，请谨慎使用以避免重要数据泄漏。</span>
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
                    <el-button ref="ref5" type="primary" @click="toGenerate">
                        提交
                    </el-button>
                    <el-button type="success" @click="open = true">新手引导</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="right">
            <div style="display: flex;">
                <span v-if="status !== 1" class="text">出题结果</span>
                <img v-if="status === 1" style="width:50px;height: 50px;" src="../../../../assets/accompany/ai.gif"
                    alt="">
            </div>
           
            <div style="margin-top:0px;margin-bottom:20px;" v-for="(item, index) in questionsList" class="questions">
                <div class="button">
                    <el-button type="success" @click="saveQuestion(index)">保存</el-button>
                    <el-button type="primary" size="large" :icon="Edit" style="border-radius: 0;margin-left: 0px"
                        @click="toEditQuestion(index)"></el-button>
                    <el-button type="danger" size="large" :icon="Delete"
                        style="margin-left: 0px;border-radius: 0 5px 0 0px;" @click="deleteQuestion(index)"></el-button>
                </div>
                <h4>{{ item.type }}</h4>
                <p class="questionArea">
                    {{ item.title.text }}
                </p>

                <p style="margin-bottom: 10px;" v-for="(option, optionIndex) in item.title.options">
                    {{ String.fromCharCode(65 + optionIndex) }} {{ option }}
                </p>

                <p class="corretAnswer">
                    <span>正确答案：</span>{{ item.answer }}
                </p>

                <p class="analysisText">
                    <span>答案解析：</span>{{ item.answerAnalysis }}
                </p>
                <!-- <hr style="margin-top:30px;margin-bottom: 30px" /> -->
            </div>
        </div>
    </div>

    <el-dialog v-model="dialogVisible" title="编辑题目" width="800">
        <el-form label-width="50px">
            <el-form-item label="标题">
                <el-input v-model="currentQuestion.title.text" placeholder=""></el-input>
            </el-form-item>
            <div v-for="item in currentQuestion.title.options">
                <el-form-item>
                    <el-input :value="item" placeholder=""></el-input>
                </el-form-item>
            </div>

            <el-form-item label="答案">
                <el-input v-model="currentQuestion.answer" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="分析">
                <el-input v-model="currentQuestion.answerAnalysis" placeholder=""></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="editQuestion">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
// import { getAIGenerateQuestionAPI } from "@/apis/ai.js"
import { ElMessage } from "element-plus";
import { teacherAddSingleQuestionAPI, teacherGenerateQuestionsByAIAPI } from "@/apis/question";
import { Delete, Edit } from "@element-plus/icons-vue";
import { useUserStore } from "@/stores/userStore";

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
const status = ref(0)

const generate = async () => {
    status.value = 1
    const res = await teacherGenerateQuestionsByAIAPI(
        generateData.value.content,
        generateData.value.t * 2,
        generateData.value.oneChoiceQuestion,
        generateData.value.blankFillingQuestion,
        generateData.value.briefAnswerQuestion
    );
    if (res.data.code === 200) {
        console.log(res);
        // resultContent.value = res.data.data;
        status.value = 0
        ws.close()
    } else {
        ElMessage.error("获取失败");
    }
};

let ws = null
const userStore = useUserStore()

const questionsList = ref([])

import { wsUrl } from '@/utils/baseUrl'

const startWS = () => {
    ws = new WebSocket(wsUrl + "/apk-info/websocket/" + userStore.getUserInfo().roleId + "?k=v")
    ws.onmessage = (event) => {
        console.log("收到了消息" + event.data)

        if (event.data !== '连接建立成功') questionsList.value = JSON.parse(event.data)
    }

    ws.onerror = () => {
        ElMessage.error("网络连接出错")
    }
}

const toGenerate = () => {
    generate()

    startWS()
}

const saveQuestion = async (index) => {
    // console.log(questionsList.value[index].title)

    const res = await teacherAddSingleQuestionAPI({
        id: null,
        type: questionsList.value[index].type,
        title: JSON.stringify({
            text: questionsList.value[index].title.text,
            options: JSON.stringify(questionsList.value[index].title.options)
        }),
        answer: questionsList.value[index].answer,
        answerAnalysis: questionsList.value[index].answerAnalysis,
        courseId: null,
        courseName: '',
        creatorId: userStore.getUserInfo().roleId,
        creatorName: userStore.getUserInfo().name
    })

    if (res.data.code === 200) {
        ElMessage.success('保存成功！')
    }
    else ElMessage.error(res.data.message)
}

const dialogVisible = ref(false)
let currentQuestion = ref({
    title: {
        text: '', options: ['','']
    },
    answer: '',
    answerAnalysis: ''
})

let currentIndex = ref(1)

const toEditQuestion = (index) => {
    dialogVisible.value = true
    currentIndex.value = index
    currentQuestion.value.title = questionsList.value[index].title
    currentQuestion.value.answer = questionsList.value[index].answer
    currentQuestion.value.answerAnalysis = questionsList.value[index].answerAnalysis
}

const editQuestion = () => {
    questionsList.value[currentIndex.value].title = currentQuestion.value.title
    questionsList.value[currentIndex.value].answer = currentQuestion.value.answer
    questionsList.value[currentIndex.value].answerAnalysis = currentQuestion.value.answerAnalysis

    dialogVisible.value = false
}

const deleteQuestion = (index) => {
    questionsList.value = questionsList.value.filter((item, i) => i !== index)
}
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
            line-height: 50px;
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

    .button {
        display: none;
    }

    &:hover .button {
        display: block;
        display: flex;
        position: absolute;
        right: 0;
        top: 0;
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