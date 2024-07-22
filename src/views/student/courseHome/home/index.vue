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

  <el-dialog
    v-model="dialogTableVisible"
    top="10%"
    title="推荐错题集"
    width="90%"
  >
    <el-table :data="tableData">
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
    </el-table>
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
          <el-input
            v-model="query2"
            style="width: 400px; height: 60px"
          ></el-input>
          <el-button
            :disabled="flag"
            @click="submit"
            style="height: 60px"
            type="primary"
            >提交</el-button
          >
        </div>
      </el-form-item>
    </el-form>
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
import { teacherSavePaperAnswerAPI } from "../../../../apis/paper";

const router = useRouter();
const dialogTableVisible = ref(false);
const route = useRoute();

const query2 = ref("");

const tableData = ref([]);

const getMistakes = async () => {
  const res = await generateMistakesByInputAPI("ff");

  if (res.data.code === 200) {
    console.log(res.data.data);
    tableData.value = res.data.data;

    for (let i = 0; i < tableData.value.length; i++) {
      tableData.value[i].title = JSON.parse(tableData.value[i].title);
      console.log(tableData.value[i]);
      if (
        tableData.value[i].type === "单选题" ||
        tableData.value[i].type === "多选题"
      ) {
        tableData.value[i].title.options = JSON.parse(
          tableData.value[i].title.options
        );
      }
    }
  } else ElMessage.error(res.data.message);
};

onMounted(() => {});

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
  await getMistakes();
  dialogTableVisible.value = true;
};
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
</style>
