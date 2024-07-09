<template>
  <div class="homeworkBox">
    <div class="title">
      <span class="text">筛选</span>
      <el-radio-group v-model="radio" class="ml-4">
        <el-radio :value="0" size="large">全部</el-radio>
        <el-radio :value="1" size="large">已完成</el-radio>
        <el-radio :value="2" size="large">未完成</el-radio>
      </el-radio-group>
    </div>
    <hr />
    <div class="interactions">
      <interaction
        v-for="item in homeworkList"
        @click="toView(item)"
        :key="item"
        :item="getItem(item)"
      >
        <template #mid>
          <div>
            <p style="margin-bottom: 5px">{{ item.title }}</p>
            <el-tag
              v-if="item.state === '已完成'"
              type="primary"
              size="small"
              >{{ item.state }}</el-tag
            >
            <el-tag
              v-else-if="item.state === '未完成'"
              type="danger"
              size="small"
              >{{ item.state }}</el-tag
            >
            <el-tag
              v-if="item.state === '待批阅'"
              type="success"
              size="small"
              >{{ item.state }}</el-tag
            >
          </div>
        </template>
        <template v-if="getTime(item)" #right>
          <p style="color: #ffc082">还剩下{{ getDeathTime(item) }}小时</p>
        </template>
      </interaction>
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import interaction from "@/views/components/interaction.vue";
import { onMounted, ref, watch } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { studentGetAssignmentAPI } from "@/apis/assignment";

const radio = ref(1);
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const getTime = (item: any) => {
  const endTime = new Date(item.endTime); // 将截止日期转换为日期对象

  const currentDate = new Date(); // 获取当前日期

  // 检查截止日期是否晚于当前日期
  const isDeadlinePassed = endTime > currentDate;

  return isDeadlinePassed;
};

const getDeathTime = (item: any) => {
  // 获取结束时间
  let endDate = new Date(item.endDate);

  // 计算当前时间
  let now = new Date();

  // 计算剩余时间（毫秒）
  let timeRemaining = endDate - now;

  // 计算剩余小时数
  let hoursRemaining = Math.floor(timeRemaining / (1000 * 60 * 60));

  // 计算剩余分钟数
  let minutesRemaining = Math.floor(
    (timeRemaining % (1000 * 60 * 60)) / (1000 * 60)
  );

  return hoursRemaining + "小时" + minutesRemaining + "分钟";
};

const getItem = (item: any) => {
  console.log(item.endTime);
  const endTime = new Date(item.endTime); // 将截止日期转换为日期对象

  const currentDate = new Date(); // 获取当前日期

  // 检查截止日期是否晚于当前日期
  const isDeadlinePassed = endTime > currentDate;

  // 根据截止日期是否晚于当前日期来设置 type 属性
  const type = isDeadlinePassed ? "primary" : "info";

  return {
    type,
    name: "作业",
  };
};

const homeworkList = ref([
  {
    assignmentId: 1,
    endDate: "2024-12-2",
    title: "12",
    state: "已完成",
  },
]);

watch(radio, (newValue, oldValue) => {
  getHomework();
});

const getHomework = async () => {
  let courseId = route.params.id as string;

  const res = await studentGetAssignmentAPI(
    userStore.getUserInfo().roleId,
    parseInt(courseId),
    parseInt(radio.value),
    1
  );

  if (res.data.code === 200) {
    console.log(res.data.data);
    // if(radio.value==)
    homeworkList.value = res.data.data;

    // 处理一下
    
  } else {
    ElMessage.error(res.data.message);
  }
};

const toView = (assignment) => {
  router.push("/course/"+route.params.id+"/dohomework/" + assignment.assignmentId);
};

onMounted(() => {
  getHomework();
});
</script>

<style lang="scss" scoped>
.homeworkBox {
  // width: 100%;
  margin-right: 20px;
  min-height: calc(100vh - 120px);
  background-color: $primary-white-color;
  box-sizing: border-box;
  padding: 30px;
  border-radius: 5px;

  .title {
    display: flex;
    align-items: center;
    height: 50px;

    .text {
      font-size: 18px;
      margin-right: 20px;
    }
  }
}

.interactions {
  margin-top: 20px;
}
</style>
