<template>
  <div class="backBox">
    <div class="head">
      <el-select tag-type="primary" @change="setCurrentClass" v-model="myClass" style="width: 240px">
        <el-option
          v-for="item in classList"
          :key="item.id"
          :value="item.id"
          :label="item.className"
        ></el-option>
      </el-select>
      <el-button
        style="margin-left: 30px; font-size: 18px"
        type="primary"
        text="primary"
        :icon="Checked"
        @click="toSignIn"
        >签到</el-button
      >
      <el-button
        style="margin-left: 30px; font-size: 18px"
        type="primary"
        text="primary"
        :icon="UserFilled"
        @click="toChoosePeople"
        >选人</el-button
      >
    </div>

    <div class="activities">
      <div class="title">
      活动
        <!-- <el-radio-group v-model="radio" class="ml-4">
          <el-radio value="1" size="large">全部</el-radio>
          <el-radio value="2" size="large">进行中</el-radio>
          <el-radio value="3" size="large">已结束</el-radio>
        </el-radio-group> -->
      </div>
      <hr />
      <div class="interactions">
        <interaction
          v-for="(item,index) in activitiesList"
          :key="item.id"
          :item="activities[index]"
          @click="toView(item.id)"
        >
          <template #mid>
            <p>{{item.title}}</p>
          </template>

          <template #right>
            {{item.beginTime}}&nbsp;&nbsp;至&nbsp;&nbsp;{{item.endTime}}
          </template>
        </interaction>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Checked, UserFilled } from "@element-plus/icons-vue";
import { onMounted, ref } from "vue";
// @ts-ignore
import interaction from "@/views/components/interaction.vue";
import { useRouter, useRoute } from "vue-router";
import { teacherGetAllClassAPI } from "@/apis/assignment";
import { ElMessage } from "element-plus";
import { teacherGetAllActivityAPI } from "../../../../apis/activity";
import { useClassStore } from '../../../../stores/classStore';

const classStore=useClassStore()
const route = useRoute();
const router = useRouter();
const radio = ref("1");
interface typeList
  extends Array<{ type: "success" | "primary" | "info"; name: string }> {}

let activities = ref<typeList>([
  { type: "success", name: "签到" },
  { type: "primary", name: "选人" },
]);

const setCurrentClass=()=>{
  classStore.setCurrentClass(myClass.value)

  getAllActivity()
}

const activitiesList = ref([]);

const myClass = ref();
const classList = ref([]);

const toSignIn = () => {
  router.push("/course/" + route.params.id + "/activities/signIn");
};

const toChoosePeople = () => {
  router.push("/course/" + route.params.id + "/activities/choosePeople");
};

const toView = (id: number) => {
  router.push("/course/" + route.params.id + "/activities/" + id);
};

const setClassList = async () => {
  const res = await teacherGetAllClassAPI();

  if (res.data.code === 200) {
    classList.value = res.data.data;
    myClass.value = res.data.data[0].id;

    classStore.setCurrentClass(myClass.value)
  } else {
    ElMessage.error(res.data.message);
  }
};

const getAllActivity = async () => {
  const res = await teacherGetAllActivityAPI(
    parseInt(route.params.id as string),
    myClass.value
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

onMounted(async() => {
  await setClassList();

  getAllActivity();
});
</script>

<style lang="scss" scoped>
.backBox {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 120px);
  // background: red;
  margin-right: 20px;
  margin-bottom:20px;

  .head {
    display: flex;
    background: $primary-white-color;
    height: 100px;
    align-items: center;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 5px;
    margin-right: 20px;
    margin-bottom: 20px;
  }

  .activities {
    // display: flex;
    flex: 1;
    background-color: $primary-white-color;
    // width:100%;
    margin-right: 20px;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 20px;
    border-radius: 5px;

    .title {
      display: flex;
      align-items: center;
      // height: 50px;
      margin-bottom: 10px;

      .text {
        font-size: 18px;
        margin-right: 20px;
      }
    }
  }
}

.interactions {
  margin-top: 20px;
}
</style>
