<template>
  <div class="signInBox">
    <span class="gestureText">手势签到</span>
    <div
      id="container"
      ref="container"
      style="width: 360px; height: 600px"
    ></div>
    <div class="button">
      <el-button type="primary" @click="clearLocker">重新绘制</el-button>
      <el-button type="success" @click="ensureLocker">确定</el-button>
    </div>
    
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import Locker from "@/canvas/locker.js";
import { studentSignInAPI, uploadImageAPI } from "@/apis/activity";
import { useUserStore } from "../../../../../stores/userStore";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();
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

let answerImage = "";

const uploadImage = async () => {
  let data = new FormData();
  data.append("image", locker.toSavaFile());

  const res = await uploadImageAPI(data);

  if (res.data.code === 200) {
    answerImage = res.data.data;
    return true;
  } else {
    ElMessage.error(res.data.message);
    return false;
  }
};

const ensureLocker = async () => {
  if (locker === null) return;
  else {
    const flag = await uploadImage();

    if (flag === false) return;

    console.log(locker.currentPath.map((item) => item.id));
    let answer = locker.currentPath.map((item) => item.id);
    // 进行签到
    const res = await studentSignInAPI(
      parseInt(route.params.activityId as string),
      userStore.getUserInfo().roleId,
      2,
      JSON.stringify(answer),
      answerImage
    );

    if (res.data.code === 200) {
      ElMessage.success('签到成功')
      return 
    } else {
      ElMessage.error(res.data.message)
    }
  }
};

const toSaveImage = () => {
  // container.value.
  console.log(locker.toSaveImage());
  imageDemo.value.src = locker.toSaveImage();
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

  .gestureText {
    color: $primary-color;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
