<template>
  <div class="head">
    <div class="studyRoute" @click="toGetStudyRoute">
      <div class="left">
        <img src="@/assets/image/studyRoute.png" alt="" />
      </div>
      <div class="right">
        <p class="title1">学习路线</p>
        <p class="title2">个性化推荐</p>
      </div>
    </div>
    <div class="questions" @click="toGetMistakes">
      <div class="left">
        <img src="@/assets/image/questions.png" alt="" />
      </div>
      <div class="right">
        <p class="title1">习题</p>
        <p class="title2">个性化推荐</p>
      </div>
    </div>
  </div>
  <div class="bottom">
    <div class="title">推荐书籍</div>
    <div class="books">
      <BookVue v-for="item in books" :key="item.id" :book="item"></BookVue>
    </div>
  </div>

  <el-dialog v-model="dialogTableVisible" top="20px" title="推荐错题集" width="90%">
    <!-- <el-table :data="tableData">
      <el-table-column prop="type" label="题目类型" />
      <el-table-column prop="title" label="题干">
        <template #default="scope">
          <span v-html="scope.row.title.text"></span>
          <span
            v-if="scope.row.type === '单选题' || scope.row.type === '多选题'"
            v-for="(option, optionIndex) in scope.row.title.options"
          >
            <span>{{ String.fromCharCode(65 + optionIndex) }}</span>
            <span v-html="option"></span>
          </span>
        </template>
</el-table-column>
<el-table-column prop="answer" label="答案" />
<el-table-column prop="answerAnalysis" label="答案解析" />
<el-table-column prop="courseName" label="课程名" />
</el-table> -->

    <div class="questionContent">
      <!-- <span class="text">出题结果</span> -->
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

      <div style="display: flex;">
        <span v-if="status !== 1" class="text">出题结果</span>
        <img v-if="status === 1" style="width:50px;height: 50px;" src="../../../../assets/accompany/ai.gif" alt="">
      </div>

      <div style="margin-top:0px;margin-bottom:20px;" v-for="(item, index) in questionsList" class="questions">
        <div class="button">
          <el-button type="success">保存</el-button>
          <el-button type="primary" size="large" @click="toEditQuestion" :icon="Edit" style="margin-left:0px;border-radius: 0"></el-button>
          <el-button type="danger" size="large" @click="deleteQuestion" :icon="Delete" style="margin-left: 0px;border-radius: 0 5px 0 0px;"
            </el-button>
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

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">
          关闭
        </el-button>
      </div>
    </template>

    <el-form label-position="top">
      <el-form-item style="margin-top: 20px" label="您对我们的回答是否满意">
        <div style="display: flex">
          <el-input v-model="query2" style="width: 400px; height: 60px"></el-input>
          <el-button :disabled="flag" @click="submit" style="height: 60px" type="primary">提交</el-button>
        </div>
      </el-form-item>
    </el-form>
  </el-dialog>

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

<script lang="ts" setup>
// @ts-ignore
import BookVue from "./components/book.vue";
import { type Book, type BooksList } from "@/types/home";
import { reactive } from "vue";

import { ref, onMounted, onUpdated } from "vue";
import { Transformer } from "markmap-lib";
import { Markmap } from "markmap-view";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";
import { generateMistakesByInputAPI } from "../../../../apis/question";
import { useRouter } from "vue-router";
import { teacherAddSingleQuestionAPI } from "@/apis/question";
import { Delete, Edit } from "@element-plus/icons-vue";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const dialogTableVisible = ref(false);
const route = useRoute();
const status = ref(0)

const query2 = ref("");

const tableData = ref([]);

const getMistakes = async () => {
  status.value=1
  const res = await generateMistakesByInputAPI("ff");

  if (res.data.code === 200) {
    console.log(res.data.data);
    status.value = 0
    
  } else ElMessage.error(res.data.message);
};

onMounted(() => { });

const books: BooksList = reactive<BooksList>([
  {
    id: 1,
    url: "https://ts1.cn.mm.bing.net/th/id/R-C.e9fa8feabe46d6e152abb7f1ddc7b1fd?rik=mNYsgrcZ1C92AQ&riu=http%3a%2f%2fwww.tup.tsinghua.edu.cn%2fupload%2fbigbookimg3%2f071040-01.jpg&ehk=RKcHc2x4SN%2bloxgZL9Y%2b9e%2bsGtILKO4d3WlrPywgZ3o%3d&risl=&pid=ImgRaw&r=0",
    title: "计算机组成原理",
    author: "薛胜军",
    authorAvatar: "https://p1.ssl.qhimg.com/t01756df1144c3735b9.jpg",
    rate: 3,
  },
  {
    id: 1,
    url: "https://ts1.cn.mm.bing.net/th/id/R-C.fab963342e911224b83e2f15ebee40aa?rik=ndgIbDvnA9563Q&riu=http%3a%2f%2fwww.tup.tsinghua.edu.cn%2fupload%2fbigbookimg%2f066067-01.jpg&ehk=EhvlpsZI5Lfi1pb%2bWv3GZ4Tdz0LPAMHFe8MPARyRlqQ%3d&risl=&pid=ImgRaw&r=0",
    title: "计算机网络",
    author: "刘勇",
    authorAvatar:
      "https://ts1.cn.mm.bing.net/th/id/R-C.4068fb7069f96f38ff669da6ce9baa88?rik=Nb1L6gStCRYqYg&riu=http%3a%2f%2fi2.sinaimg.cn%2fcj%2f2015%2f0915%2fU2104P31DT20150915183635.jpg&ehk=2igWpCVSa3O3fvLXVX8aZFTPf%2bIoNtIEsxQx5d7sRyk%3d&risl=&pid=ImgRaw&r=0",
    rate: 4,
  },
  {
    id: 1,
    url: "https://tse1-mm.cn.bing.net/th/id/OIP-C.YQRzz8b4Ecppvo7xPzJaPgHaJV?rs=1&pid=ImgDetMain",
    title: "啊哈算法",
    author: "啊哈磊",
    authorAvatar:
      "https://tse3-mm.cn.bing.net/th/id/OIP-C.T2NuKq64WBvu-FNeiYudaQAAAA?rs=1&pid=ImgDetMain",
    rate: 5,
  },
  {
    id: 1,
    url: "https://ts1.cn.mm.bing.net/th/id/R-C.2255a7098d1207e189c411ef829c3507?rik=XPHaAhcg9f%2bqGw&riu=http%3a%2f%2fwww.chinacion.cn%2fuploads%2farticle%2fimages%2f2018-10-17%2fe7ecd460QWuu1B.jpg&ehk=g9rEjK6sXuKXKw581SIOtFImmWz8ttDXZfmK4fBfmIA%3d&risl=&pid=ImgRaw&r=0",
    title: "大话数据结构",
    author: "程杰",
    authorAvatar:
      "https://bkimg.cdn.bcebos.com/pic/37d3d539b6003af33a87223f4d7bd15c103853431868?x-bce-process=image/format,f_auto/watermark,image_d2F0ZXIvYmFpa2UyNzI,g_7,xp_5,yp_5,P_20/resize,m_lfit,limit_1,h_1080",
    rate: 5,
  },
  {
    id: 1,
    url: "https://tse4-mm.cn.bing.net/th/id/OIP-C.0iTBisAc1fC7bXQYZ421zwHaJi?rs=1&pid=ImgDetMain",
    title: "MySQL从入门到精通",
    author: "",
    authorAvatar:
      "https://tse2-mm.cn.bing.net/th/id/OIP-C.O5nA6LBWi8OJNhMDQ1AQvQAAAA?rs=1&pid=ImgDetMain",
    rate: 5,
  },
  {
    id: 1,
    url: "https://img3.doubanio.com/lpic/s28649134.jpg",
    title: "离散数学",
    author: "",
    authorAvatar:
      "https://math.tongji.edu.cn/__local/9/3E/E0/044B5F9C8AE9CAF26596777DB50_3DD5536D_AAE1F.png?e=.png",
    rate: 5,
  },
  {
    id: 1,
    url: "https://ts1.cn.mm.bing.net/th/id/R-C.ae43c95bdb6e38360841e38d9617f9fd?rik=OxCAmbd5waeNSQ&riu=http%3a%2f%2fwww.java1234.com%2fuploads%2fallimg%2f220831%2f1-220S1145405244.jpg&ehk=xUwqEVXQbEBTQDw%2bAvVO0gZRQGS9HiBT6vpEKmuVwH0%3d&risl=&pid=ImgRaw&r=0",
    title: "Java开发从入门到精通",
    author: "扶松柏",
    authorAvatar: "https://tgi13.jia.com/119/653/19653879.jpg",
    rate: 5,
  },
  {
    id: 1,
    url: "https://pic1.zhimg.com/v2-d4bdb1b2f672119002b851d9181e5b28_r.jpg",
    title: "线性代数",
    author: "同济大学数学系",
    authorAvatar:
      "https://abook.hep.com.cn/ICourseFiles/MaterialsLibCovers/MrAyejphXj.jpg",
    rate: 5,
  },
  {
    id: 1,
    url: "https://ts1.cn.mm.bing.net/th/id/R-C.65a6c71786600f58570d9cbe138e9876?rik=TGWz2pF%2fc7bUVw&riu=http%3a%2f%2fwww.tup.tsinghua.edu.cn%2fupload%2fbigbookimg2%2f078611-01.jpg&ehk=v%2b9Hc39M9Ps4tjjQUA0AKrzmy2cWSNidLqbhf6llJAE%3d&risl=&pid=ImgRaw&r=0",
    title: "Java Web开发实战",
    author: "千峰教育高数产品研发部",
    authorAvatar:
      "https://ts1.cn.mm.bing.net/th/id/R-C.8e83e6bbe14c631dd3d3014a8c7bfc38?rik=jPgF6nzTYJuotg&riu=http%3a%2f%2f10.idqqimg.com%2feth%2fajNVdqHZLLBjPkChVsk4JNVcDBkaCK7mo0GYs2icM8YYJumWeqHDzP43LasrbK7UNkk0XqOoeonI%2f&ehk=fGl0RC354rUxdgyv93rlH5y6azs%2bp8Z5dyHt5knzuTw%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1",
    rate: 5,
  },
  {
    id: 1,
    url: "https://ts1.cn.mm.bing.net/th/id/R-C.e144bd79c0318ecb055115c85664cecf?rik=ezHahRlbw%2fMl7g&riu=http%3a%2f%2fwww.njupco.com%2fubook%2fbookimgs%2f201472213449%e6%a6%82%e7%8e%87%e8%ae%ba%e4%b8%8e%e6%95%b0%e7%90%86%e7%bb%9f%e8%ae%a1%e6%95%99%e7%a8%8b.jpg&ehk=pql3XpiymnWwC2C%2bsaEG2zu%2fUWg8KDO0K68thQAIEKk%3d&risl=&pid=ImgRaw&r=0",
    title: "概率论与数理统计教程",
    author: "刘磊",
    authorAvatar:
      "https://ts1.cn.mm.bing.net/th/id/R-C.41e34d725c1cbd7200735a3b2482d0b9?rik=Sw5Wjw2SYjj2FQ&riu=http%3a%2f%2fwww.ce.gxnu.edu.cn%2f_upload%2farticle%2fimages%2fed%2f3d%2f4d7f8d384aab9abfab94b1554cf2%2fde2bdca6-19be-4897-b7ae-64721db7587a.jpg&ehk=eo4SkB2PknWrfnvoNlLNHNAuJgxIaiMsWoQkArzqeag%3d&risl=&pid=ImgRaw&r=0",
    rate: 5,
  },
  {
    id: 1,
    url: "https://www.vrrw.net/uploads/allimg/191229/1-191229211J53Y.jpg",
    title: "活着",
    author: "余华",
    authorAvatar:
      "https://ts1.cn.mm.bing.net/th/id/R-C.7bc43aa0601854f31a258e5c95e48a2e?rik=wPgVDHIOqnPurA&riu=http%3a%2f%2fpuui.qpic.cn%2fvpic_cover%2fk3266xwyezg%2fk3266xwyezg_hz.jpg%2f1280&ehk=%2fHUMpzp5g%2fY3cVoPY2pdx2kw3tZ837eWKcObwN3Q2vc%3d&risl=&pid=ImgRaw&r=0",
    rate: 5,
  },
]);

const toGetStudyRoute = () => {
  router.push("/studentRoute");
};

const toGetMistakes = async () => {
  getMistakes();
  dialogTableVisible.value = true;

  startWS()
};

const userStore = useUserStore()

let ws = null
const questionsList = ref([])

import {wsUrl} from '@/utils/baseUrl'

const startWS = () => {
  ws = new WebSocket(wsUrl+"/apk-info/websocket/" + userStore.getUserInfo().roleId + "?k=v")
  ws.onmessage = (event) => {
    console.log("收到了消息" + event.data)

    if (event.data !== '连接建立成功') questionsList.value = JSON.parse(event.data)
  }

  ws.onerror = () => {
    ElMessage.error("网络连接出错")
  }
}


const saveQuestion = async (index) => {
    console.log(questionsList.value[index])

    const res = await teacherAddSingleQuestionAPI({
        id: null,
        type: questionsList.value[index].type,
        title: JSON.stringify({
            text: questionsList.value[index].text,
            options: JSON.stringify(questionsList.value[index].options)
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
.head {
  display: flex;

  .studyRoute,
  .questions {
    background: $primary-white-color;
    display: flex;
    margin-right: 20px;
    border-radius: 5px;
    // box-shadow: 0 0 2px #ccc;
    width: 320px;
    height: 200px;
    align-items: center;
    justify-content: center;

    img {
      width: 160px;
    }

    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 10px;

      .title1 {
        color: $primary-color;
        font-weight: bold;
        font-size: 24px;
      }

      .title2 {
        color: black;
        font-weight: bold;
        margin-top: 24px;
      }
    }
  }

  .studyRoute:hover,
  .questions:hover {
    background-color: #eaecfd;
  }
}

.bottom {
  margin-top: 30px;

  .title {
    color: $primary-color;
    margin-bottom: 20px;
  }

  .books {
    display: grid;
    grid-template-columns: repeat(auto-fill, 220px);
    gap: 20px;
  }
}

.questionContent {
  min-width: 500px;
  margin-right: 30px;
  flex: 1;
  overflow-y: scroll;
  max-height: calc(100vh - 300px);
  padding: 10px;
  // margin-top: 20px;


  .text {
    color: #3B90FF;
    font-weight: bold;
    // margin-left: 20px;
    display: block;
    // margin-bottom: 20px;
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
}

.questionArea {

  box-sizing: border-box;
  //padding: 20px;

  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 5px;

  span {
    font-weight: bold;
  }
}
</style>
