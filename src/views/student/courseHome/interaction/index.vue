<template>
  <div class="interactionBox">
    <div class="title">
      <span class="text">活动</span>
      <!-- <el-tag size="small" type="primary">进行中</el-tag> -->
    </div>
    <hr />
    <div class="interactions">
      <interaction
        v-for="(item, index) in activitiesList"
        :key="item.id"
        :item="activities[index]"
        @click="toView(item)"
      >
        <template #mid>
          <p>{{ item.title }}</p>
        </template>
        <template #right>
          {{ item.beginTime }}&nbsp;&nbsp;至&nbsp;&nbsp;{{ item.endTime }}
        </template>
      </interaction>
    </div>
    <br />
  </div>

  <el-dialog
    v-model="dialogVisible"
    title="Tips"
    width="500"
    :before-close="handleClose"
  >
    <span>This is a message</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
// @ts-ignore
import { studentGetAllActivityAPI } from "@/apis/activity";
import interaction from "@/views/components/interaction.vue";
import { ElMessage } from "element-plus";
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "../../../../stores/userStore";

const dialogVisible = ref(false);
const userStore = useUserStore();
const route = useRoute();
const router = useRouter();
interface typeList extends Array<{ type: string; name: string }> {}

let activities = ref<typeList>([
  { type: "success", name: "签到" },
  { type: "primary", name: "选人" },
]);

const activitiesList = ref([]);

const getAllActivity = async () => {
  const res = await studentGetAllActivityAPI(
    parseInt(route.params.id as string),
    userStore.getUserInfo().roleId
  );
  if (res.data.code === 200) {
    console.log(res.data.data);
    //
    activitiesList.value = res.data.data;
    activities.value = activitiesList.value.map((item) => {
      return {
        type: item.activityType === 0 ? "success" : "primary",
        name: item.activityType === 0 ? "签到" : "选人",
      };
    });
  } else {
    ElMessage.error(res.data.message);
  }
};

const toView = (item: any) => {
  if (item.activityType === 0) {
    // 签到
    router.push("/course/" + route.params.id + "/interaction/" + item.id);
  } else {
    // 选人
    router.push(
      "/course/" + route.params.id + "/interaction/choose/" + item.id
    );
  }
};

onMounted(() => {
  getAllActivity();
});
</script>

<style lang="scss" scoped>
.interactionBox {
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
