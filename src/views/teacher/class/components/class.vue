<template>
  <div class="classBox">
    <div class="header">
      <div class="title">软件一班</div>
      <div class="button">
        <el-button type="primary" :icon="Download">批量导入</el-button>
        <el-button type="primary" @click="toDeal(1)" :icon="Plus">新建</el-button>
        <!-- <el-button type="primary" :icon="Delete">删除</el-button> -->
      </div>
    </div>
    <hr />
    <div class="choose">
      <!-- <el-button style="font-size:16px;margin-right:20px;" type="primary" :icon="Upload" text="primary">上传</el-button> -->
      <el-input
        v-model="search"
        style="width: 240px"
        placeholder="请输入关键词"
        :prefix-icon="Search"
      />
    </div>
    <!-- <hr /> -->
    <el-table :data="filterTableData" style="margin-top: 20px">
      <el-table-column label="学号" prop="sno" sortable />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="className" label="班级" />

      <el-table-column prop="faceImage" label="图片">
        <template #default="scope">
          <img style="width: 50px; height: 50px" :src="scope.row.faceImage" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <!-- <el-button type="primary" text="primary">学情分析</el-button> -->
          <el-button
            type="primary"
            @click="toDeal(2, scope.row)"
            :icon="Edit"
            text="primary"
            >编辑</el-button
          >
          <el-button type="primary" @click="deleteStudent(scope.row.id)" :icon="Delete" text="primary">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog
    v-model="dialogVisible"
    :title="dialogText"
    width="500"
    :before-close="handleClose"
  >
    <el-form :model="studentInfoForm" :rules="rules" ref="ruleFormRef">
      <el-form-item label="学生姓名" prop="name">
        <el-input v-model="studentInfoForm.name"></el-input>
      </el-form-item>
      <el-form-item label="学生学号" prop="sno">
        <el-input v-model="studentInfoForm.sno"></el-input>
      </el-form-item>
      <el-form-item label="人脸图片" prop="faceImage">
        <el-upload
          class="avatar-uploader"
          :auto-upload="false"
          :on-change="uploadImage"
          :show-file-list="false"
          accept=".jpg,.jpeg,.png"
        >
          <img
            style="width: 100px; height: 100px"
            v-if="studentInfoForm.faceImage"
            :src="studentInfoForm.faceImage"
            class="avatar"
          />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deal"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>

  
</template>

<script lang="ts" setup>
import { Plus, Delete, Search, Download, Edit } from "@element-plus/icons-vue";
import { ref, computed, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMenu, ElMessage, TableColumnCtx } from "element-plus";
import {
  teacherGetClassInfoAPI,
  teacherGetClassByIdAPI,
  teacherAddStudentAPI,
  teacherModifyStudentAPI,
  teacherDeleteStudentAPI,
} from "@/apis/class";
import { uploadImageAPI } from "@/apis/activity";
import type { FormInstance } from "element-plus";

const dialogText = ref("新建");

const dialogVisible = ref(false);
const imageUrl = ref("");
const ruleFormRef = ref<FormInstance>();

const route = useRoute();
const router = useRouter();
const search = ref("");

const className = ref("");

const classRules = reactive({
  name: [
    {
      required: true,
      message: "不能为空",
      trigger: "change",
    },
  ],
});

const studentInfoForm = ref({
  studentId: null,
  name: "",
  sno: "",
  classId: parseInt(route.params.classId as string),
  faceImage: "",
});

const rules = reactive({
  name: [
    {
      required: true,
      message: "不能为空",
      trigger: "change",
    },
  ],
  sno: [
    {
      required: true,
      message: "不能为空",
      trigger: "change",
    },
  ],
  faceImage: [
    {
      required: true,
      message: "不能为空",
      trigger: "change",
    },
  ],
});

interface User {
  id: number;
  name: string;
  schoolId: number;
  sno: string;
  classId: number;
  className: string;
  faceImage: string;
}

const tableData = ref<User[]>([]);

const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value || data.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

const getClassInfoById = async () => {
  const res = await teacherGetClassByIdAPI(parseInt(route.params.classId as string));

  if (res.data.code === 200) {
    className.value = res.data.data.className;
  } else {
    ElMessage.error(res.data.message);
  }
};

const getAllStudent = async () => {
  const res = await teacherGetClassInfoAPI(parseInt(route.params.classId as string));

  if (res.data.code === 200) {
    tableData.value = res.data.data;
  } else {
    ElMessage.error(res.data.message);
  }
};

const uploadImage = async (uploadFile) => {
  console.log(uploadFile);

  let data = new FormData();

  data.append("image", uploadFile.raw);

  console.log(uploadFile.raw);

  console.log(data);

  const res = await uploadImageAPI(data);

  if (res.data.code === 200) {
    imageUrl.value = res.data.data;
    studentInfoForm.value.faceImage = res.data.data;
  }
};

const toDeal = (flag: number, row?: any) => {
  if (flag === 1) {
    dialogText.value = "新建+";

    studentInfoForm.value.name = "";
    studentInfoForm.value.sno = "";
    studentInfoForm.value.faceImage = null;

    studentInfoForm.value.studentId = null;
  } else {
    dialogText.value = "编辑";

    studentInfoForm.value.name = row.name;
    studentInfoForm.value.sno = row.sno;
    studentInfoForm.value.faceImage = row.faceImage;

    studentInfoForm.value.studentId = row.id;
  }

  dialogVisible.value = true;
};

const deal = async () => {
  let flag = await submitForm(ruleFormRef.value);

  if (flag === false) return;

  if (dialogText.value === "新建+") {
    const res = await teacherAddStudentAPI(
      studentInfoForm.value.name,
      studentInfoForm.value.sno,
      studentInfoForm.value.classId,
      studentInfoForm.value.faceImage
    );

    if (res.data.code === 200) {
      ElMessage.success("添加成功");
      getAllStudent();
    } else {
      ElMessage.error(res.data.message);
    }
  } else {
    // 编辑

    const res = await teacherModifyStudentAPI(
      studentInfoForm.value.studentId,
      studentInfoForm.value.name,
      studentInfoForm.value.sno,
      studentInfoForm.value.classId,
      studentInfoForm.value.faceImage
    );

    if (res.data.code === 200) {
      ElMessage.success("编辑成功");
      getAllStudent();
    } else {
      ElMessage.error(res.data.message);
    }
  }

  dialogVisible.value=false
};

const deleteStudent=async(id:number)=>{

  let flag = confirm('您确定要删除吗')

  if(flag===false) return

  const res = await teacherDeleteStudentAPI(id);

  if(res.data.code===200)
  {
    ElMessage.success('新增成功')
    getAllStudent()
  }
  else {
    ElMessage.error(res.data.message)
  }
}

const submitForm = async (formEl: FormInstance | undefined) => {
  let flag = false;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
      flag = true;
    } else {
      console.log("error submit!", fields);
    }
  });

  return flag;
};

onMounted(() => {
  getAllStudent();

  getClassInfoById();
});
</script>

<style lang="scss" scoped>
.classBox {
  background: $primary-white-color;
  margin-right: 20px;
  min-height: calc(100vh - 120px);
  box-sizing: border-box;
  padding: 20px;

  .header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 18px;
      color: $primary-color;
    }
  }

  .choose {
    margin-top: 20px;
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  text-align: center;
  border: 1px dotted #000;
  border-radius: 5px;
}
</style>
