<template>
  <div class="doBox">
    <el-table
      height="500"
      size="large"
      :data="filterSecondTableData"
      style="width: 100%"
    >
      <el-table-column label="学号" prop="sno" sortable> </el-table-column>
      <el-table-column label="姓名" prop="name" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="large" placeholder="搜索" />
        </template>
        <template #default="scope">
          <img
            style="width: 50px; height: 50px"
            :src="scope.row.faceImage"
            alt=""
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import {
  studentGetChooseDetailsAPI,
  studentGetSignInDetailsAPI,
  studentSignInAPI,
} from "@/apis/activity";
import { onMounted, ref } from "vue";
import { useUserStore } from "../../../../../stores/userStore";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();

const number = ref("");

const search=ref('')

const tableData=ref([])

const filterSecondTableData = computed(() =>
tableData.value.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const getActivityDetails = async () => {
  const res = await studentGetChooseDetailsAPI(
    parseInt(route.params.activityId as string)
  );

  if (res.data.code === 200) {
    tableData.value=res.data.data.students
  } else {
    ElMessage.error(res.data.message);
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
}
</style>
