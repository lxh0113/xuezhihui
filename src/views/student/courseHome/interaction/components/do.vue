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

    <el-result v-if="data.timeState === 1" icon="info" title="签到信息">
      <template #sub-title>
        <p>您未签到，是{{ data.signinStatus }}状态</p>
      </template>
      <template #extra>
        <el-button type="primary" @click="back">返回</el-button>
      </template>
    </el-result>

    <div class="signInBox">
      <div v-if="data.type === 1" class="ordinaryBox">
        <span>普通签到</span>
        <el-button type="primary">点击签到</el-button>
      </div>

      <div v-else-if="data.type === 3" class="signInNumberBox">
        <span>签到码签到</span>
        <el-input style="width: 200px" placeholder="输入签到码签到"></el-input>
        <el-button style="margin-top:20px" type="primary">签到</el-button>
      </div>

      <div v-else-if="data.type === 0" class="aiBox">
        <span>智能考勤，请耐心等待</span>
      </div>

      <!-- <div  class="gestureBox" :class="{opacityBox:data.type===2}">
        <span>手势签到</span>
        <div id="container" ref="container" style="width: 360px; height: 600px"></div>
        <div class="button">
          <el-button type="primary" @click="clearLocker">重新绘制</el-button>
          <el-button type="success" @click="ensureLocker">确定</el-button>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import { studentGetSignInDetailsAPI } from "@/apis/activity";
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
        "/course/" + route.params.id + "/interaction/gesture/" + route.params.activityId
      );
  } else ElMessage.error(res.data.message);
};

const back = () => {
  router.push("/course/" + route.params.id + "/interaction");
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
