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
      <!-- <el-form-item>
        <el-switch v-model="ordinaryForm.photo" />
        <span style="margin-left: 10px; margin-right: 20px">手动结束</span>
      </el-form-item> -->

      <el-form-item label="开始时间">
        <el-date-picker
          v-model="ordinaryForm.startTime"
          type="datetime"
          placeholder="选择"
        />
      </el-form-item>
    </el-form>

    <div id="container" ref="container" style="width: 360px; height: 600px"></div>
    <div class="button">
      <el-button type="primary" @click="clearLocker">重新绘制</el-button>
      <el-button type="success" @click="ensureLocker">确定</el-button>
    </div>
    <!-- <el-button v-if="false" @click="toSaveImage">demo</el-button>
    <img  style="width:300px;height:300px" ref="imageDemo" src="" alt=""> -->
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import Locker from "@/canvas/locker.js";
import { teacherCreateSignInAPI, uploadImageAPI } from "@/apis/activity";
import { useRoute, useRouter } from "vue-router";
import { useClassStore } from "@/stores/classStore";
import { useUserStore } from "@/stores/userStore";
import { ElMessage } from "element-plus";

const classStore = useClassStore();
const userStore = useUserStore();

const route = useRoute();
const router = useRouter();

const container = ref(null);
const imageDemo = ref("");

let locker = null;

const newLocker = () => {
  locker = new Locker(container.value, {
    radius: 30, // 圆圈半径
    columnSpacing: 50, // 圆圈列间距
    rowsSpacing: 90, // 圆圈行间距
    stroke: "#b5b5b5", // 圆圈描边颜色
    lineStroke: "#2f3ced", // 路径描边颜色
    selectedFill: "#2f3ced", // 图案选中填充颜色
    backgroundColor: "#ffffff", // 画布背景颜色
  });
};

const clearLocker = () => {
  if (locker === null) return;
  else {
    console.log(locker);
    locker.ctx.clearRect(0, 0, "300px", "600px"); // 清空画布
    locker.restoreImageData(locker.cellImageData); // 恢复背景宫格快照
    // that.drawText(text) // 绘制提示文字
    locker.currentPath = []; // 清空当前绘制路径
    locker.lastImageData = locker.cellImageData; // 重置上一次绘制的画布快照
  }
};

let answer = null;
const url = ref("");

const ensureLocker = async () => {
  if (ordinaryForm.value.startTime === "") {
    ElMessage.error("您还没设置时间");
    return;
  }
  if (ordinaryForm.value.endTime === "") {
    ElMessage.error("您还没设置时间");
    return;
  }

  if (locker === null) {
    ElMessage.error("您还没设置手势");
    return;
  } else {
    console.log(locker.currentPath.map((item) => item.id));

    answer = locker.currentPath.map((item) => item.id);
    if (answer.length === 0) {
      ElMessage.error("您还没设置手势");
      return;
    }

    let flag = await toSaveImage();

    if (flag) toSignIn();
  }
};

const toSaveImage = async () => {
  // container.value.
  console.log(locker.toSaveImage());
  // imageDemo.value.src = locker.toSaveImage();

  // 上传图片

  let data = new FormData();
  data.append("image", locker.toSavaFile());

  const res = await uploadImageAPI(data);

  if (res.data.code === 200) {
    console.log(res.data.data);

    const response = await teacherCreateSignInAPI(
      parseInt(route.params.id as string),
      classStore.getCurrentClass(),
      userStore.getUserInfo().roleId,
      "手势签到",
      ordinaryForm.value.startTime,
      ordinaryForm.value.endTime,
      2,
      JSON.stringify(answer),
      res.data.data
    );

    if (response.data.code === 200) {
      ElMessage.success("发布成功");
      router.push("/course/" + route.params.id + "/activities/" + response.data.data.id);
      // setTimeout(()=>{
      //   router.push('/course/'+route.params.id+"/activities")
      // },2000)
    }

    return true;
  } else {
    ElMessage.error(res.data.message);

    return false;
  }
};

const ordinaryForm = ref({
  isFixed: false,
  startTime: "",
  endTime: "",
});

const toSignIn = async () => {
  // 发布签到
  // const res = await teacherCreateSignInAPI(
  //   parseInt(route.params.id as string),
  //   classStore.getCurrentClass(),
  //   userStore.getUserInfo().roleId,
  //   "手势签到",
  //   ordinaryForm.value.startTime,
  //   ordinaryForm.value.endTime,
  //   2,
  //   JSON.stringify(answer),
  //   url.value
  // );
  // if (res.data.code === 200) {
  //   ElMessage.success("发布成功");
  //   router.push("/course/" + route.params.id + "/activities/"+res.data.data.id);
  //   // setTimeout(()=>{
  //   //   router.push('/course/'+route.params.id+"/activities")
  //   // },2000)
  // }
};

onMounted(() => {
  newLocker();
});
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
