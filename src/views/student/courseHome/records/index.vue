<template>
  <div class="recordsBox">
    <div class="left">
      <Task
        :allTaskPointNum="data.allTaskPointNum"
        :finishTaskPointNum="data.finishTaskPointNum"
        :classRank="data.classRank"
      ></Task>
    </div>
    <div class="mid">
      <div class="signIn">
        <SignIn></SignIn>
      </div>
      <div class="homework">
        <Homework
          :allAssignmentNum="data.allAssignmentNum"
          :finishAssignmentNum="data.finishAssignmentNum"
          :avgAssignmentScore="data.avgAssignmentScore"
        ></Homework>
      </div>
    </div>
    <div class="right">
      <Exam
        :allExamNum="data.allExamNum"
        :avgExamScore="data.avgExamScore"
        :examHistoryVoList="data.examHistoryVoList"
      ></Exam>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Task from "./components/task.vue";
import SignIn from "./components/signIn.vue";
import Homework from "./components/homework.vue";
import Exam from "./components/exam.vue";
import { onMounted, ref } from "vue";
// import { studentGetAllStudyRecordsAPI } from "@/apis/student";
import { useUserStore } from "@/stores/userStore";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";

const route = useRoute();
const userStore = useUserStore();

const data = ref({
  allTaskPointNum: 1,
  finishTaskPointNum: 1,
  classRank: 1,
  allAssignmentNum: 10,
  finishAssignmentNum: 1,
  avgAssignmentScore: 1,

  allExamNum: 20,
  avgExamScore: 92,
  examHistoryVoList: [
    {
      id: 1,
      examTitle: "1",
      studentScore: 1,
    },
  ],
});

const getRecords = async () => {
  // const res = await studentGetAllStudyRecordsAPI(
  //   userStore.getUserInfo().roleId,
  //   parseInt(route.params.id as string)
  // );

  // if (res.data.code === 200) {
  //   console.log(res.data.data);
  //   data.value = res.data.data;
  // } else {
  //   ElMessage.error(res.data.message);
  // }
};

onMounted(() => {
  getRecords();
});
</script>

<style lang="scss" scoped>
.recordsBox {
  display: flex;
  flex-wrap: wrap;
  height: 500px;

  .left {
    flex: 1.5;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .mid {
    flex: 1;
    display: flex;
    flex-direction: column;

    .signIn,
    .homework {
      flex: 1;
      margin-right: 20px;
      margin-bottom: 20px;
      border-radius: 5px;
    }
  }

  .right {
    flex: 1.5;
    margin-bottom: 20px;
    margin-right: 20px;
  }
}
</style>
