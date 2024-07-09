<template>
  <div class="classManageBox">
    <div class="left">
      <el-button type="primary" :icon="Plus" @click="toDeal(1)">新建班级</el-button>
      <br />
      <div v-for="(item, index) in classList" :key="index" class="link">
        <router-link
          class="myRouterLink"
          active-class="active"
          :to="'/teacher/class/' + item.id"
          style="display: flex; justify-content: space-between"
        >
          <span>
            {{ item.className }}
          </span>
          <span style="margin-right: 10px; display: none">
            <el-icon size="20" @click="toDeal(2, item)"><Edit /></el-icon>
            <el-icon style="margin-left: 10px" size="20" @click="deleteClass(item.id)"
              ><Delete
            /></el-icon>
          </span>
        </router-link>
      </div>
    </div>
    <div class="right">
      <router-view :key="$route.path"></router-view>
    </div>
  </div>

  <el-dialog
    v-model="classDialog"
    :title="classDialogText"
    width="500"
    :before-close="handleClose"
  >
    <el-form :model="classForm" :rules="classRules">
      <el-form-item label="班级名称" prop="name">
        <el-input v-model="classForm.name"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="classDialog = false">取消</el-button>
        <el-button type="primary" @click="deal"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Plus, Edit, Delete } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { onMounted, reactive } from "vue";
import {
  teacherAddClassAPI,
  teacherDeleteClassAPI,
  teacherGetAllClassAPI,
  teacherModifyClassNameAPI,
} from "../../../apis/class";
import { useUserStore } from "../../../stores/userStore";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";

const classDialogText = ref("新建+");

const classDialog = ref(false);
const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const classList = ref([]);

const classForm = ref({
  name: "",
  id: null,
});

const classRules=reactive({
  name:[{
    required:true,message:'不能为空',trigger:'blur'
  }]
})

const getAllClass = async () => {
  const res = await teacherGetAllClassAPI(userStore.getUserInfo().roleId);

  if (res.data.code === 200) {
    classList.value = res.data.data;
  } else ElMessage.error(res.data.message);
};

const toDeal = (flag: number, item?: any) => {
  if (flag === 1) {
    classDialogText.value = "新建+";
    classForm.value.id = null;
    classForm.value.name = "";
  } else {
    classDialogText.value = "编辑";
    classForm.value.id = item.id;
    classForm.value.name = item.className;
  }

  classDialog.value = true;
};

const deal = async () => {
  if (classDialogText.value === "新建+") {
    // 新建
    const res = await teacherAddClassAPI(
      classForm.value.name,
      userStore.getUserInfo().roleId
    );

    if (res.data.code === 200) {
      ElMessage.success("新增成功");
      getAllClass();
    } else {
      ElMessage.error(res.data.message);
    }
  } else {
    const res = await teacherModifyClassNameAPI(classForm.value.name, classForm.value.id);
    if (res.data.code === 200) {
      ElMessage.success("编辑成功");
      getAllClass();
    } else {
      ElMessage.error(res.data.message);
    }
  }
  classDialog.value = false
};

const deleteClass=async(id:number)=>{

  let flag=confirm('您确定要删除当前班级吗');
  if(flag===false) return 

  const res = await teacherDeleteClassAPI(id);
  if(res.data.code===200)
  {
    ElMessage.success('新增成功')
    getAllClass()
  }
  else {
    ElMessage.error(res.data.message)
  }
}

onMounted(() => {
  getAllClass();
});
</script>

<style lang="scss" scoped>
.classManageBox {
  min-height: calc(100vh - 120px);
  margin-right: 20px;
  display: flex;
  margin-bottom: 20px;

  .myRouterLink:hover > span {
    display: block !important;
  }

  .left {
    width: 200px;
    box-sizing: border-box;
    padding: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
    background-color: $primary-white-color;
  }

  .active {
    background: $primary-selected-background-color;
    color: $primary-color !important;
    border-radius: 5px;
  }

  .link {
    margin-top: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    // padding:10px;

    a {
      text-decoration: none;
      color: black;
      display: flex;
      height: 50px;
      width: 100%;
      align-items: center;
      // margin-left:10px;
      padding-left: 20px;
    }
  }

  .right {
    flex: 1;
  }
}
</style>
