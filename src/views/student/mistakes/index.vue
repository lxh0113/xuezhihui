<template>
  <div class="backBox">
    <div class="header">
      <el-input
        v-model="input"
        style="width: 240px"
        placeholder="请输入关键词"
        :prefix-icon="Search"
      />
      <el-button icon="Delete" style="margin-left: 20px">删除</el-button>
    </div>
    <hr />
    <el-table
      :data="tableData"
      :default-sort="{ prop: 'date', order: 'descending' }"
      style="width: 100%; margin-top: 20px"
      size="large"
    >
      <!-- <el-table-column type="selection" width="55" /> -->
      <!-- <el-table-column prop="title" label="题目" sortable width="600" /> -->
      <el-table-column label="题目">
        <template #default="scope">
          <p v-html="JSON.parse(scope.row.title).text"></p>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="题型" sortable/>
      <el-table-column prop="courseName" label="课程" sortable />
      <el-table-column label="操作">
        <template #default="scope">
          <span @click="viewSingle(scope.row.questionId)" style="color: #2f3ced">查看</span>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog v-model="dialogFormVisible" title="查看错题" width="700">
    <div class="questionBox" style="color:black;font-size:16px;;">
      <!-- <h3>{{ mistakeData.type }}
        <span style="font-weight:normal;color:#2f3ced;font-size:16px;margin-left:30px;">课程：{{ mistakeData.courseName }}</span>
      </h3> -->
      <div class="question" style="margin-top:20px;">
        题目：<p style="margin-top:10px;" v-html="JSON.parse(mistakeData.title).text"></p>
      </div>
      <div style="color:red;margin-top:20px;">
        正确答案：{{ mistakeData.answer }}
      </div>
      <div style="color:green;margin-top:20px;">
        我的答案：{{ mistakeData.studentAnswer }}
      </div>
      <div class="analysis" style="margin-top:20px;background:#eaecfd;padding:15px;border-radius:10px">
        解析：{{ mistakeData.answerAnalysis }}
      </div>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { Folder, FolderChecked, Search } from "@element-plus/icons-vue";
// import { studentViewCourseMistakesAPI,studentViewMistakesDetails } from "@/apis/student";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import { ElMessage } from "element-plus";
import { studentViewAllQuestionAPI, studentViewQuestionDetailsAPI } from "@/apis/question";

const dialogFormVisible = ref(false)
const route = useRoute();
const userStore = useUserStore();
const input = ref("");

interface Mistakes {
  questionId: number;
  courseName: string;
  type: string;
  title: string;
}

const mistakeData=ref({
  type:'1',
  title:'111',
  answer:'123',
  answerAnalysis:'123',
  studentAnswer:'222',
  courseName:'21212'
})
const tableData = ref<Mistakes>();

const viewSingle=async(id:number)=>{

  console.log(id)
  const res=await studentViewQuestionDetailsAPI(id);
  if(res.data.code===200)
  {
    console.log(res.data.data)
    mistakeData.value=res.data.data
    console.log(mistakeData.value)
    dialogFormVisible.value=true
  }
  else {
    ElMessage.error(res.data.code)
  }
}

const getMistakes = async() => {
  const res = await studentViewAllQuestionAPI(
    userStore.getUserInfo().roleId
  );

  if(res.data.code===200)
  {
    console.log(res.data.data)
    tableData.value=res.data.data
  }
  else ElMessage.error(res.data.message)
};

onMounted(() => {
  getMistakes();
});
</script>

<style lang="scss" scoped>
.backBox {
  height: calc(100vh - 120px);
  margin-right: 20px;
  background-color: $primary-white-color;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 20px;

  .header {
    margin-bottom: 20px;
    display: flex;
  }
}
</style>
