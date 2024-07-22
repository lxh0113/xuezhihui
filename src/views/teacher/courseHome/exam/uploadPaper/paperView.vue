<template>
    <div class="fullScreen" :z-index="20">
    <div class="left">
        <el-scrollbar style="display: flex;max-width:1000px;justify-content: center;align-items: center;margin-top:10px">
          <img @click="()=>showImagePreview=true" class="imagePapers" :src="url[0]" alt="">
        </el-scrollbar>
        <div class="fixed">
          <el-button :icon="DArrowLeft" :disabled="teacherPaperStore.getTeacherPaperList().index==0" @click="toPapers(0)" :title="teacherPaperStore.getTeacherPaperList().index===0?'':teacherPaperStore.getTeacherPaperList().list[teacherPaperStore.getTeacherPaperList().index-1]?.naame">上一套</el-button>
          <el-button :icon="ArrowLeft" :disabled="currentIndex===0" @click="setMinusIndex" style="margin-right: 20px"></el-button>
          第<span>{{ currentIndex+1 }}</span>页 共<span>{{ paperList.length }}</span>页
          <el-button :icon="ArrowRight" :disabled="currentIndex===paperList.length-1" @click="setAddIndex" style="margin-left: 20px"></el-button>
          <el-button :icon="DArrowRight" :disabled="teacherPaperStore.getTeacherPaperList().index===teacherPaperStore.getTeacherPaperList().list.length-1" @click="toPapers(1)" :title="currentIndex===teacherPaperStore.getTeacherPaperList().list.length-1?'':teacherPaperStore.getTeacherPaperList()[teacherPaperStore.getTeacherPaperList().index+1]?.name">下一套</el-button>
          <el-popover :visible="visible" placement="top" :width="320" style="height: 150px;">
            <el-input size="large" type="textarea" :rows="6" placeholder="请输入评语" v-model="comment" resize="false" style="margin-bottom: 20px;" />
            <div style="text-align: right; margin: 0">
              <el-button size="small" text @click="visible = false">取消</el-button>
              <el-button size="small" type="primary" @click="changeComment">确认</el-button>
            </div>
            <template #reference>
              <el-button @click="visible = true" v-if="userStore.user.identity==='teacher'">评语</el-button>
            </template>
          </el-popover>
        </div>
    </div>

    <div class="right">
      <div class="title">
        <div class="text">
          阅卷
        </div>
        <div style="color:red;font-weight: bold;">
          <!-- <span style="color:black">姓名:</span> -->
          {{ teacherPaperStore.getTeacherPaperList()?.list[teacherPaperStore.getTeacherPaperList()?.index]?.name }}
        </div>
        <div class="score">
          分值：{{ getScore() }}
        </div>
      </div>
      <el-scrollbar>
        <div class="questions" v-for="(item,index) in currentPages" :key="item">
          <div class="kind">
            {{ item.type }}
          </div>
          <div class="question">
            {{ item.question }}
          </div>
          <div class="options" v-if="item.type==='选择题'">
            <div class="option" v-for="littleItem in item.options" :key="littleItem">
              {{ littleItem }}
            </div>
          </div>
          
          <div class="options" v-else-if="简答题">
            <div class="option">
              <span class="answer">学生答案：</span>{{ item.studentResponse }}
            </div>
          </div>

          <div class="correctAnswer">
            正确答案：{{ item.ans }}
          </div>

          <div class="details" v-if="item.type==='选择题'">
            <div class="answer">
              学生答案：{{ item.studentResponse }}
            </div>
            <div class="score" v-if="userStore.user.identity==='teacher'">
              分值：<el-input min="0" max="3" @change="updateScore(index)" style="width: 60px" placeholder="0-3" v-model="scoreList[index]" />
            </div>
            <div class="score" v-else>
              分值：{{ item.score }}
            </div>
          </div>
          <div class="details" v-else-if="item.type==='填空题'">
            <div class="answer">
              学生答案：{{ item.studentResponse }}
            </div>
            <div class="score" v-if="userStore.user.identity==='teacher'">
              分值：<el-input min="0" max="3" @change="" style="width: 60px" placeholder="0-3" v-model="scoreList[index]" />
            </div>
            <div class="score" v-else>
              分值：{{ item.score }}
            </div>
          </div>
          <div class="details" v-else>
            <div class="answer">
            </div>
            <div class="score" v-if="userStore.user.identity==='teacher'">
              分值：<el-input min="0" max="10" style="width: 60px" @change="" placeholder="0-10" v-model="scoreList[index]" />
            </div>
            <div class="score" v-else>
              分值：{{ item.score }}
            </div>
          </div>


          <div class="analysis">
            {{ item.analyzing }}
          </div>
          <hr>
        </div>
        <hr>
      </el-scrollbar>
    </div>
    
    <el-image-viewer v-if="showImagePreview" :url-list="url" hide-on-click-modal @close="closePreview" style="z-index: 3000"/>
  </div>
</template>

<script setup>
import { ArrowLeft,ArrowLeftBold,ArrowRight, DArrowLeft, DArrowRight } from '@element-plus/icons-vue';
import { onMounted, ref } from 'vue'
import { useRoute,useRouter } from "vue-router"
import { useUserStore } from '@/stores/userStore';
import { getPaperAPI,teacherModifyPapersAPI,teacherModifyCommentAPI } from '@/apis/examPaper.js'
import { ElMessage } from 'element-plus';
import { useExamStore } from '@/stores/examStore';
import { useTeacherPaperStore } from '@/stores/teacherPaperStore';

const teacherPaperStore=useTeacherPaperStore()
const showImagePreview=ref(false)
const visible = ref(false)
const comment=ref('')
const userStore=useUserStore()
const examStore=useExamStore()
const scoreList=ref([])

const router=useRouter()
const route = useRoute();

let url = ref(['']);

const showViewer = ref(false);
const currentIndex=ref(0);
const paperList=ref([])
const currentPages=ref([])

// const currentPaperIndex=ref()

const updateScore=async(index) => {
    console.log(scoreList.value[index])
    console.log(currentPages.value[index].score)

    // currentPages.value[index].score=scoreList.value
    let newList=teacherPaperStore.getTeacherPaperList().list;

    let score = parseInt(newList[teacherPaperStore.getTeacherPaperList().index].score) + (scoreList.value[index] - parseInt(currentPages.value[index].score));

    let content=JSON.stringify(currentPages.value)

    let pageId=paperList.value[currentIndex.value].id;

    const res = await teacherModifyPapersAPI(route.params.id,pageId,score,content);

    if(res.data.code===200)
    {
        ElMessage.success('修改分数成功')
        currentPages.value[index].score=scoreList.value[index]
        newList[teacherPaperStore.getTeacherPaperList().index].score=score;
    }
    else return ElMessage.error(res.data.message)

}

const changeComment=async()=>{

  if(comment.value.trim()===teacherPaperStore.getTeacherPaperList().list[teacherPaperStore.getTeacherPaperList().index].comment)
  {
    ElMessage.error('您未做出任何修改')
    return 
  }
  // TODO 这里少一个 试卷id 
  const res = await teacherModifyCommentAPI(route.params.id,comment.value.trim())

  if(res.data.code===200)
  {
    ElMessage.success('修改成功')
    teacherPaperStore.getTeacherPaperList().list[teacherPaperStore.getTeacherPaperList().index].comment=comment.value
  }
  else 
  {
    ElMessage.error(res.data.message)
  }
  visible.value = true
}


const getScore=()=>{
  if(userStore.getUserInfo().identity==='student'||userStore.getUserInfo().identity==='parents')
  {
    return teacherPaperStore.getTeacherPaperList().list[teacherPaperStore.getTeacherPaperList().index].scored
  }
  else return teacherPaperStore.getTeacherPaperList().list[teacherPaperStore.getTeacherPaperList().index].score
}

const closePreview=()=>{
  showImagePreview.value=false
}

const setAddIndex=()=>{
  if(currentIndex.value>=paperList.length-1)
  {
    return
  }

  currentIndex.value++
  // alert(currentIndex)
  url.value[0]=paperList.value[currentIndex.value].path

  console.log(url.value[0])

  let newStr=paperList.value[currentIndex.value].content.replaceAll('\n','');
  newStr=paperList.value[currentIndex.value].content.replaceAll('\'','\"');
  currentPages.value=JSON.parse(newStr)
  scoreList.value=currentPages.value.map(item=>{
    return item.score
  })
  console.log(currentPages)
}

const setMinusIndex=()=>{
  if(currentIndex.value<=0)
  {
    return
  }
  currentIndex.value--
  url.value[0]=paperList.value[currentIndex.value].path

  let newStr=paperList.value[currentIndex.value].content.replaceAll('\n','');
  newStr=paperList.value[currentIndex.value].content.replaceAll('\'','\"');
  currentPages.value=JSON.parse(newStr)
  scoreList.value=currentPages.value.map(item=>{
    return item.score
  })
  console.log(currentPages)
}

const getPaperDetails=async()=>{
  let id=route.params.id
  const res=await getPaperAPI(id);

  if(res.data.code===200)
  {
    console.log(res.data.data)
    paperList.value=res.data.data
    currentIndex.value=0;
    
    url.value[0]=paperList.value[currentIndex.value].path
    let newStr=paperList.value[currentIndex.value].content.replaceAll('\n','');
    newStr=paperList.value[currentIndex.value].content.replaceAll('\'','\"');
    console.log(newStr)
    currentPages.value=JSON.parse(newStr)
    scoreList.value=currentPages.value.map(item=>{
      return item.score
    })
    console.log(currentPages)
  }
  else {
    ElMessage.error(res.data.message)
  }
}

const toPapers=(flag)=>{
  let index=teacherPaperStore.getTeacherPaperList().index
  if(flag===0)
  {
    if(index==0) return 
    index--
    teacherPaperStore.changeIndex(index-1)
  }
  else {
    if(index==teacherPaperStore.getTeacherPaperList().list.length-1) return
    index++
    teacherPaperStore.changeIndex(index+1)
  }
  
  currentIndex.value=0;
  router.push('/paper/'+teacherPaperStore.getTeacherPaperList().list[index].id)

  getPaperDetails()

  setComment()
}

const setComment=()=>{
  comment.value=teacherPaperStore.getTeacherPaperList().list[teacherPaperStore.getTeacherPaperList().index].comment||''  

}

onMounted(()=>{
  getPaperDetails()

  setComment()
})
</script>

<style lang="scss" scoped>
.fullScreen{
    height: 100vh;
    overflow: hidden;
    display: flex;
    position: relative;
    background-color: #fff;
    // height: 100%;
    justify-content: space-evenly;

    .left{
      // background-color: antiquewhite;
      margin-left: 10px;
      flex:1;
      min-width: 520px;
      display: flex;
      height: 100%;
      // background-color: #ce6509;
      justify-content: center;
      // align-items: center;
      // margin-bottom: 60px;

      .fixed{
        position: fixed;
        bottom:30px;
        font-size: 16px;

        transition: all .5s;

        span{
          color:#3a63f3;
          font-weight: bold;
        }
      }
    }

    .right{
      // position:fixed;
      // background-color: aqua;
      max-width: 700px;
      min-width: 420px;
      padding-left: 20px;
      padding-right: 10px;
      padding-bottom: 60px;
    
      box-sizing: border-box;

      .title{
        color: #3a63f3;
        font-size: 20px;
        display: flex;
        justify-content: space-between;
        line-height: 60px;

        .score{
          padding-right: 30px;
          font-weight: bold;
          color:red;
        }
        // height: 60px;
        // margin-left: 20px;
      }

      .questions{
        // width: 400px;
        box-sizing: border-box;
        margin-right: 20px;

        .kind{
          line-height: 40px;
          font-size: 15px;
          font-weight: bold;
          margin-left: 10px;
        }

        .question{
          border:1px solid #dcdfe6;
          padding:10px;
          border-radius: 10px;
        }

        .options{
          display: flex;
          flex-direction: column;

          .option{
            padding:10px;
            background-color: #eceffe;
            margin-top:10px;
            border-radius: 10px;

            .answer{
              color:red;
              font-size: 16px;
              font-weight: bold;
            }
          }
        }

        .correctAnswer{
            color:green;
            font-size: 16px;
            line-height: 30px;
            font-weight: bold;
            padding:10px;
        }
    
        .details{
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          padding:10px;
          font-weight: bold;
          font-size: 16px;
        
          .answer{
            color:red;
            display: flex;
            align-items: center;
          }
      
          .score{
            color:green;
            // float:right;
            display: flex;
            align-items: center;
          }
        }
    
        .analysis{
          border: 1px solid #3a63f3;
          padding:10px;
          border-radius: 10px;
          // margin-top:10px;
        }
      }

    }


    .imagePapers{
      width: 600px;
      // height: 900px;
      // height: 100%;
      // background-color: #3a63f3;
      height: fit-content;
    }

}

</style>