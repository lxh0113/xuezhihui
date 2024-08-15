<template>
  <div class="uploadExamBox">
    <el-steps style="width: 100%;" :space="300" :active="activeIndex" finish-status="success">
      <el-step title="上传原试卷" @click="activeIndex = 0">
      </el-step>

      <el-step title="上传试卷答案" @click="() => { activeIndex = maxIndex >= 1 ? 1 : activeIndex }">
      </el-step>

      <el-step title="批量上传学生试卷" @click="() => { activeIndex = maxIndex >= 2 ? 2 : activeIndex }">
      </el-step>

      <el-step title="识别及批阅" @click="() => { activeIndex = maxIndex >= 3 ? 3 : activeIndex }">
      </el-step>

    </el-steps>

    <div style="height:20px;"></div>

    <div v-if="activeIndex === 0">
      <el-select v-model="originPaperType" style="width: 150px; margin-bottom: 20px">
        <el-option label="图片" :value="0"></el-option>
        <el-option label="文档" :value="1"></el-option>
      </el-select>
      <el-upload v-if="originPaperType === 0" action="http://localhost:8079/activity/getImagePath" method="post"
        name="image" :file-list="originFileList" list-type="picture-card" :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove" :auto-upload="true" :on-success="(response: any) => {
          return successUploadOriginImage(response);
        }">
        <el-icon>
          <Plus />
        </el-icon>
      </el-upload>

      <el-button v-if="originPaperType === 0" @click="uploadOriginPaper" type="primary"
        style="margin-top: 20px">确认试卷上传完毕</el-button>

      <el-dialog width="80%" height="600px" v-model="originDialog">
        <img w-full style="width: 100%; height: 600px" :src="originDialogImageUrl" alt="" />
      </el-dialog>

      <el-upload v-if="originPaperType === 1" ref="originUpload" class="upload-demo" :limit="1" :auto-upload="false"
        style="margin-left: 20px" :on-change="originSubmit" accept=".doc,.docx">
        <template #trigger>
          <el-button type="primary">选择文件</el-button>
        </template>
        <el-button style="margin-left: 20px" class="ml-3" type="success" @click="originSubmitUpload">
          上传
        </el-button>

        <template #tip>
          <div class="el-upload__tip text-red">只能上传一个文件</div>
        </template>
      </el-upload>

      <el-result v-if="originFlag === 1" icon="success" title="识别成功" sub-title="识别成功啦，(*^_^*)">
        <template #extra>
          <el-button type="primary" @click="toViewOrigin">识别成功，去编辑识别结果</el-button>
        </template>
      </el-result>

      <el-result v-else-if="originFlag === 0" icon="error" title="识别识别" sub-title="识别失败，/(ㄒoㄒ)/~~">
        <template #extra>
          <el-button type="primary" @click="originFlag = -1">识别失败，请再次尝试</el-button>
        </template>
      </el-result>
    </div>

    <div v-else-if="activeIndex === 1">
      <el-upload ref="upload" class="upload-demo" :limit="1" :auto-upload="false" style="margin-left: 20px"
        :on-change="answerSubmit" accept=".doc,.docx">
        <template #trigger>
          <el-button type="primary">选择文件</el-button>
        </template>
        <el-button style="margin-left: 20px" class="ml-3" type="success" @click="answerSubmitUpload">
          上传
        </el-button>

        <template #tip>
          <div class="el-upload__tip text-red">
            只能上传一个文件,后缀名为doc，docx
          </div>
        </template>
      </el-upload>

      <el-result v-if="answerFlag === 1" icon="success" title="识别成功" sub-title="识别成功啦，(*^_^*)">
        <template #extra>
          <el-button type="primary" @click="toViewAnswer">识别成功，去编辑识别结果</el-button>
        </template>
      </el-result>

      <el-result v-else-if="answerFlag === 0" icon="error" title="识别失败" sub-title="识别失败，(；′⌒`)">
        <template #extra>
          <el-button type="primary" @click="answerFlag = -1">识别失败，请再次尝试</el-button>
        </template>
      </el-result>
    </div>

    <div v-else-if="activeIndex === 2">
      <el-upload ref="upload" class="upload-demo" :limit="1" :auto-upload="false" style="margin-left: 20px"
        :on-change="studentSubmit" accept=".zip,.rar">
        <template #trigger>
          <el-button type="primary">选择文件</el-button>
        </template>
        <el-button style="margin-left: 20px" class="ml-3" type="success" @click="studentSubmitUpload">
          上传
        </el-button>

        <template #tip>
          <div class="el-upload__tip text-red">
            只能上传一个文件,后缀名为zip,rar
          </div>
        </template>
      </el-upload>

      <el-result v-if="studentFlag === 1" icon="success" title="上传成功" sub-title="识别成功啦，(*^_^*)">
        <template #extra>
          <el-button type="primary" @click="toViewStudent">识别成功，去编辑识别结果</el-button>
        </template>
      </el-result>

      <el-result v-else-if="studentFlag === 1" icon="error" title="识别失败" sub-title="识别失败，请再次尝试">
        <template #extra>
          <el-button type="primary" @click="studentFlag = -1">识别失败，请再次尝试</el-button>
        </template>
      </el-result>
    </div>

    <div v-else-if="activeIndex === 3">
      <el-button type="primary" @click="toViewResult">开始批阅</el-button>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import type { TabsInstance } from "element-plus";
import { uploadImageAPI } from "@/apis/activity";
import { useRoute, useRouter } from "vue-router";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps, UploadUserFile, UploadRawFile } from "element-plus";
import {
  teacherGetAnswerByDocAPI,
  teacherGetPaperQuestionInfoAPI,
  teacherSavePaperInfoAPI,
  teacherUploadZipAPI,
  teacherSavePaperAnswerAPI
} from "@/apis/paper";
import { useOriginStore } from "@/stores/originStore";
import { useAnswerStore } from "@/stores/answerStore";
import { useStudentStore } from "@/stores/studentStore";
import { teacherSaveStudentAnswerAPI } from '../../../../../apis/paper';
import { useUploadPaperStore } from "@/stores/uploadPaperStore";

const baseUrl = '192.168.50.199:5173'

const maxIndex = ref(0)
const activeIndex = ref(0)

const originStore = useOriginStore();
const answerStore = useAnswerStore();
const studentStore = useStudentStore()

const route = useRoute();
const router = useRouter();

// 原试卷代码部分

const originFlag = ref(-1);

const originPaperType = ref(0);
const originFileList = ref<UploadUserFile[]>([]);

const originDialogImageUrl = ref("");
const originDialog = ref(false);

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles);
};

const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  originDialogImageUrl.value = uploadFile.url!;
  originDialog.value = true;
};

const successUploadOriginImage = (response: any) => {
  console.log(response);

  originFileList.value.push({
    name: response.data,
    url: response.data,
  });

  console.log(originFileList.value);
};

let originFile = new FormData();

const originUpload = ref();
const originSubmit = async (rawFile: UploadRawFile) => {
  console.log(rawFile);

  originFile.append("image", rawFile);
};
const originSubmitUpload = async () => {
  const res = await uploadImageAPI(originFile);

  if (res.data.code === 200) {
    originFileList.value = [];

    originFileList.value.push({
      name: res.data.data,
      url: res.data.data,
    });

    uploadOriginPaper();

    ElMessage.success("上传成功");
  } else {
    ElMessage.error("上传失败,请重新再试");
  }
};

const saveOrigin = async () => {

  let score = originStore.getOriginPaperData().questions.reduce((accumulator, question) => {
    // 这里假设每个问题对象有一个 score 属性来表示分数
    return accumulator + question.questionScore;
  }, 0);

  const res = await teacherSavePaperInfoAPI(
    parseInt(route.params.paperId as string),
    'test',
    JSON.stringify(originStore.getOriginPaperData().files),
    JSON.stringify(originStore.getOriginPaperData().questions),
    score
  );

  if (res.data.code === 200) {
    // ElMessage.success("保存成功");
  } else {
    ElMessage.error("保存失败");
  }
}

const uploadOriginPaper = async () => {
  let files = originFileList.value.map((item) => item.url);

  console.log(files);
  const res = await teacherGetPaperQuestionInfoAPI(
    files,
    originPaperType.value
  );

  if (res.data.code === 200) {
    originFlag.value = 1;

    console.log(res.data.data);

    originStore.setOriginPaperData({
      questions: res.data.data,
      files,
      type: originPaperType.value,
    });

    ElMessage.success("上传成功");

    activeIndex.value = 1;

    // 设置maxIndex
    maxIndex.value = Math.max(maxIndex.value, activeIndex.value);

    // 保存一下
    saveOrigin()

  } else {
    originFlag.value = 0;

    ElMessage.error('上传失败,请重新再试');
  }

  uploadPaperStore.setUploadResultByIndex(0, originFlag.value)
};

const toViewOrigin = () => {

  window.open("http://" + baseUrl + "/upload/origin/" + route.params.paperId);
};

// 上传试卷答案部分

let answerFile = new FormData();
let answerUrl = ref("");
let answerFlag = ref(-1);

const answerSubmit = async (rawFile: UploadRawFile) => {
  console.log(rawFile);

  answerFile.append("image", rawFile.raw);
};
const answerSubmitUpload = async () => {
  const res = await uploadImageAPI(answerFile);

  if (res.data.code === 200) {
    answerUrl.value = res.data.data;

    getAnswer();

    ElMessage.success("上传成功");
  } else {
    ElMessage.error("上传失败");
  }
};

const saveAnswer = async () => {
  const res = await teacherSavePaperAnswerAPI(
    parseInt(route.params.paperId as string),
    answerStore.getAnswerData().answerUrl,
    JSON.stringify(answerStore.getAnswerData().answerList)
  )

  if (res.data.code === 200) {
    // ElMessage.success("保存成功");
  } else {
    ElMessage.error("保存失败");
  }
}

const getAnswer = async () => {
  const res = await teacherGetAnswerByDocAPI(answerUrl.value);

  if (res.data.code === 200) {

    answerFlag.value = 1;

    console.log(res.data.data);
    // console.log(JSON.parse(res.data.data))
    answerStore.setAnswerData({
      answerList: res.data.data,
      answerUrl: answerUrl.value,
    });

    ElMessage.success("获取成功");

    activeIndex.value = 2;

    // 设置maxIndex
    maxIndex.value = Math.max(maxIndex.value, activeIndex.value);
    saveAnswer()

  } else {
    answerFlag.value = 0;

    ElMessage.error(res.data.message);
  }

  uploadPaperStore.setUploadResultByIndex(1, answerFlag.value)
};

const toViewAnswer = () => {
  window.open("http://" + baseUrl + "/upload/answer/" + route.params.paperId);
};

// 批量上传学生试卷
const studentFlag = ref(-1);
const studentFile = new FormData();

const studentSubmit = async (rawFile: UploadRawFile) => {
  console.log(rawFile);

  studentFile.append("file", rawFile.raw);
};

const studentSubmitUpload = async () => {
  uploadZip()
};


const uploadZip = async () => {
  const res = await teacherUploadZipAPI(
    parseInt(route.params.paperId as string),
    studentFile
  );

  if (res.data.code === 200) {
    studentFlag.value = 1
    studentStore.setStudentList(res.data.data)

    ElMessage.success('上传成功')

    activeIndex.value = 3;

    // 设置maxIndex
    maxIndex.value = Math.max(maxIndex.value, activeIndex.value);

    // 保存

  } else {
    studentFlag.value = 0
    ElMessage.error(res.data.message);
  }

  uploadPaperStore.setUploadResultByIndex(2, studentFlag.value)
};

const toViewStudent = () => {

  window.open("http://" + baseUrl + "/upload/student/" + route.params.paperId);
};

const toViewResult = () => {
  window.open("http://" + baseUrl + "/upload/result/" + route.params.paperId);
};

// 查看批阅接口

// 设置本地保存上传

const uploadPaperStore = useUploadPaperStore()

const setInitData = () => {

  let paperId = parseInt(route.params.paperId as string);

  if (uploadPaperStore.getPaperId() !== paperId) {
    uploadPaperStore.setPaperId(paperId)
    uploadPaperStore.clear()
    return
  }

  if (uploadPaperStore.getCurrentUploadStep() !== 0) {
    // 如果不为0就需要修改
    activeIndex.value = uploadPaperStore.getCurrentUploadStep() + 1
    maxIndex.value = Math.max(maxIndex.value, activeIndex.value);

    if (activeIndex.value > 0) {
      // 第一个

      originFlag.value = uploadPaperStore.getUploadResult()[0]
    }

    if (activeIndex.value > 1) {
      answerFlag.value = uploadPaperStore.getUploadResult()[1]
    }

    if (activeIndex.value > 2) {
      studentFlag.value = uploadPaperStore.getUploadResult()[2]
    }
  }
}

onMounted(() => {
  setInitData()
})
</script>

<style lang="scss" scoped>
.uploadExamBox {
  background: $primary-white-color;
  box-sizing: border-box;
  padding: 20px;
  min-height: calc(100vh - 120px);
  // margin-bottom: 20px;
  margin-right: 20px;
  border-radius: 5px;

  .titleText {
    color: $primary-color;
    font-weight: bold;
    line-height: 60px;
  }
}

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.el-tabs--right .el-tabs__content,
.el-tabs--left .el-tabs__content {
  height: 100%;
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
  width: 600px;
  height: 400px;
  text-align: center;
  border: 1px dotted #000;
  border-radius: 5px;
}
</style>
