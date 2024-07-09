<template>
  <div class="signInBox">
    <div class="right">
      <el-form :data="ordinaryForm" label-width="120" label-position="left">
        <el-form-item label="输入4-8位数字">
          <el-input style="width: 260px" v-model="form.answer"></el-input>
        </el-form-item>

        <el-form-item label="截止时间">
          <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择" />
        </el-form-item>

        <el-form-item label="开始时间">
          <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择" />
        </el-form-item>
      <el-button type="primary" @click="toSignIn">确定</el-button>

      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElMessage, TabsPaneContext } from "element-plus";
import { useRouter, useRoute } from "vue-router";
import { teacherCreateSignInAPI } from "../../../../../apis/activity";
import { useClassStore } from "../../../../../stores/classStore";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const classStore = useClassStore();

const route = useRoute();
const router = useRouter();
const number = ref("");

const form = ref({
  answer: "",
  startTime: "",
  endTime: "",
});

const toSignIn = async () => {

  if (form.value.startTime === "") {
    ElMessage.error("您还没设置时间");
    return;
  }
  if (form.value.endTime === "") {
    ElMessage.error("您还没设置时间");
    return;
  }

  if (form.value.answer === "") {
    ElMessage.error("您还没设置签到码");
    return;
  }


  // 发布签到
  const res = await teacherCreateSignInAPI(
    parseInt(route.params.id as string),
    classStore.getCurrentClass(),
    userStore.getUserInfo().roleId,
    "普通签到",
    form.value.startTime,
    form.value.endTime,
    1,
    form.value.answer,
    null
  );

  if (res.data.code === 200) {
    ElMessage.success("发布成功");
    router.push("/course/" + route.params.id + "/activities");
    // setTimeout(()=>{
    //   router.push('/course/'+route.params.id+"/activities")
    // },2000)
  }
};
</script>

<style scoped lang="scss">
.signInBox {
  background: $primary-white-color;
  min-height: calc(100vh - 140px);
  margin-top: 20px;
  border-radius: 5px;
  margin-right: 20px;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
}
</style>
