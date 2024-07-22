<template>
  <div class="signInBox">
    <el-form :data="ordinaryForm" label-width="120" label-position="left">
      <!-- <el-form-item label="要求参与人拍照">
        <el-switch v-model="ordinaryForm.photo" />
      </el-form-item> -->
      <el-form-item label="结束时间">
        <el-date-picker
          v-model="ordinaryForm.endTime"
          
          type="datetime"
          placeholder="选择"
        />
      </el-form-item>
      <!-- <el-form-item label="定时发放">
        <el-switch v-model="ordinaryForm.isFixed" />
      </el-form-item> -->
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="ordinaryForm.startTime"
          
          type="datetime"
          placeholder="选择"
        />
      </el-form-item>

      <el-button type="primary" @click="toSignIn">确定</el-button>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import { ElMessage, TabsPaneContext } from "element-plus";
import { onMounted } from "vue";
import Locker from "@/canvas/locker.js";
import { setTimeout } from "timers";
import { useRouter, useRoute } from "vue-router";
import { teacherCreateSignInAPI } from "../../../../../apis/activity";
import { useClassStore } from "../../../../../stores/classStore";
import { useUserStore } from "@/stores/userStore";

const userStore = useUserStore();
const classStore = useClassStore();

const route = useRoute();
const router = useRouter();
const ordinaryForm = ref({
  isFixed: false,
  startTime: new Date(),
  endTime: "",
});

const value = ref(true);

const toSignIn = async () => {
  // 发布签到
  const res = await teacherCreateSignInAPI(
    parseInt(route.params.id as string),
    classStore.getCurrentClass(),
    userStore.getUserInfo().roleId,
    "普通签到",
    ordinaryForm.value.startTime,
    ordinaryForm.value.endTime,
    1,
    null,
    null
  );

  if (res.data.code === 200) {
    ElMessage.success("发布成功");
    router.push("/course/" + route.params.id + "/activities/"+res.data.data.id);
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
}
</style>
