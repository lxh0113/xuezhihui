<template>
  <div class="doBox">
    <el-result
      v-if="data.signInStatus === '已签'"
      icon="success"
      title="签到成功"
      sub-title="您已经签到成功！^ _ ^"
    >
      <template #extra>
        <el-button type="primary" @click="back">返回</el-button>
      </template>
    </el-result>

    <el-result v-else-if="data.timeState === 1" icon="info" title="签到信息">
      <template #sub-title>
        <p>您未签到，是{{ data.signinStatus }}状态</p>
      </template>
      <template #extra>
        <el-button type="primary" @click="back">返回</el-button>
      </template>
    </el-result>

    <div class="signInBox">
      <div
        v-if="data.signInStatus !== '已签' && data.type === 1"
        class="ordinaryBox"
      >
        <span>普通签到</span>
        <el-button type="primary" @click="toOrdinarySignIn">点击签到</el-button>
      </div>

      <div
        v-else-if="data.signInStatus !== '已签' && data.type === 3"
        class="signInNumberBox"
      >
        <span>签到码签到</span>
        <el-input v-model="number" style="width: 200px" placeholder="输入签到码签到"></el-input>
        <el-button
          style="margin-top: 20px"
          type="primary"
          @click="toNumberSignIn"
          >签到</el-button
        >
      </div>

      <div
        v-else-if="data.signInStatus !== '已签' && data.type === 0"
        class="aiBox"
      >
        <span>智能考勤，请耐心等待</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { studentGetSignInDetailsAPI, studentSignInAPI } from "@/apis/activity";
import { onMounted, ref } from "vue";
import { useUserStore } from "../../../../../stores/userStore";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import Locker from "@/canvas/locker.js";
import { type } from "../../../../../../auto-imports";

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const container = ref(null);
const imageDemo = ref("");

const number=ref('')

const data = ref({});

const getActivityDetails = async () => {
  const res = await studentGetSignInDetailsAPI(
    parseInt(route.params.activityId as string),
    userStore.getUserInfo()!.roleId
  );

  if (res.data.code === 200) {
    console.log(res.data.data);
    data.value = res.data.data;

    if (data.value.type === 2)
      router.push(
        "/course/" +
          route.params.id +
          "/interaction/gesture/" +
          route.params.activityId
      );
  } else ElMessage.error(res.data.message);
};

const back = () => {
  router.push("/course/" + route.params.id + "/interaction");
};

const toOrdinarySignIn = async () => {
  const res = await studentSignInAPI(
    parseInt(route.params.activityId as string),
    userStore.getUserInfo().roleId,
    1,
    null,
    null
  );

  if (res.data.code === 200) {
    ElMessage.success("签到成功");

    getActivityDetails();
  } else {
    ElMessage.error(res.data.message)
  }
};

const toNumberSignIn = async() => {

  if(number.value===''){
    ElMessage.error('您还未输入任何内容')
    return
  }

  const res = await studentSignInAPI(
    parseInt(route.params.activityId as string),
    userStore.getUserInfo().roleId,
    3,
    number.value,
    null
  );

  if (res.data.code === 200) {
    ElMessage.success("签到成功");

    getActivityDetails();
  } else {
    ElMessage.error(res.data.message)

  }
};

onMounted(() => {
  getActivityDetails();
});
</script>

<style scoped lang="scss">
.doBox {
  margin-right: 20px;
  min-height: calc(100vh - 120px);
  background-color: $primary-white-color;
  box-sizing: border-box;
  padding: 30px;
  border-radius: 5px;

  .opacityBox {
    opacity: 1;
  }

  .signInBox {
    width: 100%;
    display: flex;
    justify-content: center;
    height: 100%;

    .ordinaryBox,
    .signInNumberBox {
      display: flex;
      flex-direction: column;

      span {
        color: $primary-color;
        font-size: 16px;
        font-weight: bold;
        line-height: 50px;
      }
    }

    .gestureBox {
      opacity: 0;
    }

    .aiBox {
      margin: 20px auto;
      color: $primary-color;
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>
