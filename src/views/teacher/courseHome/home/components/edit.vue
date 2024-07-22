<template>
  <div class="backBox">
    <div class="head">
      <div class="button">
        <el-button type="primary" @click="toSave">保存</el-button>
        <el-button type="success">完成</el-button>
      </div>
      <div class="setting">
        <div class="contentSetting">
          <el-button
            :icon="Plus"
            type="primary"
            text="primary"
            @click="chooseNode"
            >同级目录</el-button
          >
          <el-button
            type="primary"
            text="primary"
            :icon="Plus"
            @click="chooseChildren"
            >子目录</el-button
          >
        </div>
        <Toolbar style="min-width: 400px; flex: 1" :editor="editorRef" />
      </div>
    </div>
    <div class="bottom">
      <div class="left">
        <el-tree
          style="max-width: 600px"
          :data="data"
          highlight-current
          :props="defaultProps"
          @node-click="handleNodeClick"
        />
      </div>
      <div class="right" style="min-width: 400px">
        <Editor
          v-if="chapterData.type === 'text'"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          class="editor"
          style="
            min-width: calc(100vh - 420px);
            overflow-y: scroll;
            box-sizing: border-box;
            adding: 20px;
          "
          @onCreated="handleCreated"
        />

        <myVideo
          :startTime="videoBeginTime"
          v-else-if="chapterData.type === 'video'"
          :src="currentUrl"
          style="min-height: 400px"
        />

        <iframe
          v-else
          style="min-width: 600px"
          class="ppt"
          :src="
            'http://view.officeapps.live.com/op/view.aspx?src=' +
            chapterData.content
          "
          frameborder="0"
        ></iframe>

        <div
          class="buttonOptions"
          style="display: flex; background: white; padding-top: 20px"
        >
          <el-upload
            ref="upload"
            class="upload-demo"
            :limit="1"
            :on-exceed="handleExceed"
            :auto-upload="false"
            style="margin-left: 20px"
            :on-change="submit"
            accept=".ppt,.pptx,.mp4,.avi,.mov,.flv,.wmv"
          >
            <template #trigger>
              <el-button type="primary">选择文件</el-button>
            </template>
            <el-button
              style="margin-left: 20px"
              class="ml-3"
              type="success"
              @click="submitUpload"
            >
              上传
            </el-button>

            <template #tip>
              <div class="el-upload__tip text-red">只能上传一个文件</div>
            </template>
          </el-upload>

          <el-button
            @click="deleteCurrentChapter"
            type="danger"
            style="margin-left: 20px"
            >删除当前章节</el-button
          >

          <el-button
            @click="addSubtitle"
            type="warning"
            style="margin-left: 20px"
            v-if="chapterData.type === 'video'"
            >添加字幕</el-button
          >
        </div>

        <div class="addSubtitleBox" v-if="chapterData.type === 'video'">
          <span class="titleText">知识切片</span>
          <el-timeline
            v-if="chapterData.knowledge !== null"
            style="max-width: 600px"
          >
            <el-timeline-item
              v-for="item in subTitleContent"
              :timestamp="item.beginTime"
              placement="top"
            >
              <el-card @click="changeCurrentTime(item.beginTime)">
                <!-- <h4></h4> -->
                <p>{{ item.knowledge }}</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
  </div>

  <el-dialog v-model="dialogVisible" title="新建章节" width="500">
    <el-form>
      <el-form-item label="章节名称">
        <el-input
          v-model="chapterData.chapterTitle"
          placeholder="请输入章节名称"
          style="width: 300px"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="toDeal"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
// @ts-ignore
import myVideo from "@/views/components/video.vue";

import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

import { Plus } from "@element-plus/icons-vue";
import {
  getAllChaptersAPI,
  teacherAddChapterAPI,
  teacherDeleteChapterAPI,
  teacherModifyChaptersAPI,
  videoAddSubtitleAPI,
} from "@/apis/course";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { genFileId } from "element-plus";
import type { UploadInstance, UploadProps, UploadRawFile } from "element-plus";
import { uploadImageAPI } from "../../../../../apis/activity";
import myEditor from "@/views/components/editor.vue";

const currentUrl=ref("https://yuejuanpt.oss-cn-zhangjiakou.aliyuncs.com/wisdomHub/05:11:26-29ebcc0e90cc445d9761ff3b6c808844out_video.mp4")
const route = useRoute();
const router = useRouter();
let cache = [];

// 1 代表同级 2 代表子级
let currentChoose = 1;

const dialogVisible = ref(false);
const chapterData = ref({
  id: null,
  chapterTitle: "",
  chapterNumber: 1,
  level: 1,
  fatherId: 1,
  courseId: parseInt(route.params.id as string),
  taskPointTitle: "",
  content: "新的内容",
  type: "text",
  knowledge: null,
});

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("<p>hello</p>");

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = "<p></p>";
  }, 1500);
});

// 编辑器配置
const editorConfig = {
  placeholder: "一个章节只能对应含有ppt，视频，文章",
  MENU_CONF: {
    /* 菜单配置，下文解释 */
  },
};

const handleCreated = (editor: any) => {
  if (editorRef.value != null) {
    editorRef.value.destroy();
  }

  editorRef.value = editor; // 记录 editor 实例，重要！
};

// 组件销毁时，及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

interface Tree {
  label: string;
  id: number;
  children?: Tree[];
}

const currentTreeData = ref(null);

const handleNodeClick = (node: any, data: Tree) => {
  console.log(node);
  currentTreeData.value = node;

  console.log("判断是不是空" + node.id === null);

  if (node.id === null) {
    console.log(node);
    chapterData.value.type = "text";
    chapterData.value.content = "";

    return;
  } else {
    console.log(cache);

    chapterData.value = cache.find((item) => item.id === node.id);

    if (chapterData.value.knowledge !== null) {
      subTitleContent.value = JSON.parse(chapterData.value.knowledge);

    }

    if(chapterData.value.type==='video'){
      currentUrl.value=chapterData.value.content
    }

    console.log(chapterData.value);

    if (chapterData.value.type === "text") {
      valueHtml.value = chapterData.value.content;
    }

  }



  // console.log(data)
  // 设置
};

const data = ref<Tree[]>([
  {
    label: "引言",
    id: 1,
    children: [
      {
        label: "哇卡卡卡",
        id: 2,

        children: [
          {
            id: 3,
            label: "想鼠",
          },
        ],
      },
    ],
  },
]);

const defaultProps = {
  children: "children",
  label: "label",
};

const toDeal = () => {
  dialogVisible.value = false;

  if (currentChoose === 1) {
    addNode();
  } else {
    addChildren();
  }

  // toSave()
};

const addNode = async () => {
  if (data.value.length === 0) {
    data.value.push({
      label: chapterData.value.chapterTitle,
      id: null,
      children: [],
    });

    chapterData.value.level = 1;
    chapterData.value.chapterNumber = 1;
    chapterData.value.fatherId = null;
    chapterData.value.taskPointTitle = chapterData.value.chapterTitle;

    return;
  }

  // 添加同级目录
  if (currentTreeData.value === null) {
    return;
  } else {
    console.log(currentTreeData.value);

    for (let i = 0; i < data.value.length; i++) {
      if (data.value[i].id === currentTreeData.value.id) {
        data.value.splice(i + 1, 0, {
          label: chapterData.value.chapterTitle,
          id: null,
          children: [],
        });

        chapterData.value.level = 1;
        chapterData.value.chapterNumber = data.value.length;
        chapterData.value.fatherId = null;
        chapterData.value.taskPointTitle = chapterData.value.chapterTitle;

        break;
      }
      let j = 0;
      for (; j < data.value[i].children.length; j++) {
        if (data.value[i].children[j].id === currentTreeData.value.id) {
          data.value[i].children.splice(j + 1, 0, {
            label: chapterData.value.chapterTitle,
            id: null,
            children: [],
          });

          chapterData.value.level = 2;
          chapterData.value.chapterNumber = data.value[i].children.length;
          chapterData.value.fatherId = data.value[i].id;
          chapterData.value.taskPointTitle = chapterData.value.chapterTitle;

          break;
        }
        let k = 0;
        for (; k < data.value[i].children[j].children.length; k++) {
          if (
            data.value[i].children[j].children[k].id ===
            currentTreeData.value.id
          ) {
            data.value[i].children[j].children.splice(k + 1, 0, {
              label: chapterData.value.chapterTitle,
              id: null,
              children: [],
            });

            chapterData.value.level = 3;
            chapterData.value.chapterNumber =
              data.value[i].children[j].children.length;
            chapterData.value.fatherId =
              data.value[i].children[j].children.length;
            chapterData.value.taskPointTitle = chapterData.value.chapterTitle;

            break;
          }
        }

        if (k < data.value[i].children[j].children.length) break;
      }

      if (j < data.value[i].children.length) break;
    }
  }

  chapterData.value.id = null;
};

const chooseNode = () => {
  currentChoose = 1;

  dialogVisible.value = true;
};

const chooseChildren = () => {
  currentChoose = 2;
  dialogVisible.value = true;
};

const addChildren = () => {
  // 添加儿子目录

  if (data.value.length === 0) {
    data.value.push({
      label: chapterData.value.chapterTitle,
      id: null,
      children: [],
    });

    chapterData.value.level = 1;
    chapterData.value.chapterNumber = 1;
    chapterData.value.fatherId = null;
    chapterData.value.taskPointTitle = chapterData.value.chapterTitle;

    return;
  }

  if (currentTreeData.value === null) {
    return;
  } else {
    console.log(currentTreeData.value);

    for (let i = 0; i < data.value.length; i++) {
      if (data.value[i].id === currentTreeData.value.id) {
        data.value[i].children.push({
          label: chapterData.value.chapterTitle,
          id: null,
          children: [],
        });

        chapterData.value.level = 2;
        chapterData.value.chapterNumber = data.value[i].children.length;
        chapterData.value.fatherId = data.value[i].id;
        chapterData.value.taskPointTitle = chapterData.value.chapterTitle;

        break;
      }
      let j = 0;
      for (; j < data.value[i].children.length; j++) {
        if (data.value[i].children[j].id === currentTreeData.value.id) {
          data.value[i].children[j].children.push({
            label: chapterData.value.chapterTitle,
            id: null,
            children: [],
          });

          chapterData.value.level = 3;
          chapterData.value.chapterNumber =
            data.value[i].children[j].children.length;
          chapterData.value.fatherId =
            data.value[i].children[j].children.length;
          chapterData.value.taskPointTitle = chapterData.value.chapterTitle;

          break;
        }
        let k = 0;
        for (; k < data.value[i].children[j].children.length; k++) {
          if (
            data.value[i].children[j].children[k].id ===
            currentTreeData.value.id
          ) {
            ElMessage.error("该节点不能创建新章节");
            break;
          }
        }

        if (k < data.value[i].children[j].children.length) break;
      }

      if (j < data.value[i].children.length) break;
    }
  }
};

const setTreeData = (value: any) => {
  // 第一层
  data.value = value
    .filter((item) => {
      if (item.level === 1)
        return {
          label: item.chapterTitle,
          id: item.id,
          children: [],
        };
    })
    .map((i) => {
      return {
        label: i.chapterTitle,
        id: i.id,
        children: [],
      };
    });

  console.log(data.value);

  data.value.map((item) => {
    item.children = value
      .filter((littleItem) => {
        return littleItem.fatherId === item.id;
      })
      .map((i) => {
        return {
          label: i.chapterTitle,
          id: i.id,
          children: [],
        };
      });
  });

  // console.log(data.value);

  for (let i = 0; i < data.value.length; i++) {
    for (let j = 0; j < data.value[i].children.length; j++) {
      data.value[i].children[j].children = value
        .filter((item) => {
          return item.fatherId === data.value[i].children[j].id;
        })
        .map((i) => {
          return {
            label: i.chapterTitle,
            id: i.id,
            children: [],
          };
        });
    }
  }

  console.log(data.value);
};

const getAllChapters = async () => {
  const res = await getAllChaptersAPI(parseInt(route.params.id as string));

  if (res.data.code === 200) {
    console.log(res.data.data);
    cache = res.data.data;
    setTreeData(res.data.data);
  } else {
  }
};

const upload = ref<UploadInstance>();

const handleExceed: UploadProps["onExceed"] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};

let file = new FormData();

const submit = async (rawFile: UploadRawFile) => {
  console.log(rawFile);

  var FileExt = rawFile.name.replace(/.+\./, "");
  if (["ppt", "pptx"].indexOf(FileExt.toLowerCase()) !== -1) {
    chapterData.value.type = "ppt";
  } else if (
    ["mp4", "avi", "mov", "flv", "wmv"].indexOf(FileExt.toLowerCase()) !== -1
  ) {
    chapterData.value.type = "video";
    
  } else {
    ElMessage.error("您必须上传ppt或者视频");
    return;
  }

  file.append("image", rawFile.raw);

  // 这里做个判断是视频还是ppt

  // const res = await uploadImageAPI()
};
const submitUpload = async () => {
  const res = await uploadImageAPI(file);

  if (res.data.code === 200) {
    ElMessage.success("上传成功");

    cache = res.data.data;
    console.log(res.data.data);

    chapterData.value.content = res.data.data;
    currentUrl.value=res.data.data
    toSave();
  } else {
    ElMessage.error("上传失败");
  }
};

const toSave = async () => {
  if (chapterData.value.chapterTitle.trim() === "") {
    return;
  }

  if (chapterData.value.type === "text") {
    chapterData.value.content = valueHtml.value;
  }

  console.log(chapterData.value);

  chapterData.value.knowledge=JSON.stringify(chapterData.value.knowledge)
    console.log(chapterData.value)

  if (chapterData.value.id === null) {
    // 新建
    
    const res = await teacherAddChapterAPI(chapterData.value);

    if (res.data.code === 200) {
      ElMessage.success("保存成功");
      getAllChapters();
    } else {
      ElMessage.error(res.data.message);
    }
  } else {
    // 编辑

    const res = await teacherModifyChaptersAPI(chapterData.value);

    if (res.data.code === 200) {
      ElMessage.success("修改成功");
      getAllChapters();
    } else ElMessage.error("修改失败");
  }
};

const deleteCurrentChapter = async () => {
  if (chapterData.value.id === null) {
    ElMessage.error("您未选中任何班级");
    return;
  }

  const res = await teacherDeleteChapterAPI(chapterData.value.id);

  if (res.data.code === 200) {
    ElMessage.success("删除成功");

    getAllChapters();
  } else {
    ElMessage.error(res.data.message);
  }
};

const subTitleContent = ref([]);

const addSubtitle = async () => {
  const res = await videoAddSubtitleAPI(chapterData.value.content);

  if (res.data.code === 200) {
    chapterData.value.content = res.data.data.videoPath;
    subTitleContent.value = res.data.data.knowledge;

    chapterData.value.knowledge = res.data.data.knowledge;
    chapterData.value.content = res.data.data.videoPath;
    
    currentUrl.value=res.data.data.videoPath
    ElMessage.success("获取含字幕视频成功");
    toSave();
  } else {
    ElMessage.error(res.data.message);
  }
};

const videoBeginTime = ref(0);

const changeCurrentTime = (beginTime: string) => {

  // 解析时间字符串
  let parts = beginTime.split(":");
  let secondsPart = parts[2].split(",")[0]; // 获取秒部分
  let millisecondsPart = parts[2].split(",")[1]; // 获取毫秒部分

  // 转换为数值
  let seconds = parseInt(secondsPart, 10); // 秒数部分
  let milliseconds = parseInt(millisecondsPart, 10); // 毫秒数部分

  // 计算总秒数
  let totalSeconds = seconds + milliseconds / 1000;
  console.log(totalSeconds)
  videoBeginTime.value=totalSeconds
};

onMounted(() => {
  getAllChapters();
});
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss" scoped>
.el-tree {
  --el-tree-node-content-height: 40px;
  --el-tree-text-color: black;
  --el-font-size-base: 16px;
}

.ppt {
  width: 100%;
  height: 500px;
}

:root {
  --el-fill-color-light: #2f3ced;
  --el-color-primary-light-9: #2f3ced;
}

.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  // 设置颜色
  background-color: #f0f6ff; // 透明度为0.2的skyblue，作者比较喜欢的颜色
  color: #3a8bff !important; // 节点的字体颜色
  font-weight: bold; // 字体加粗
}

.el-tree-node:focus > .el-tree-node__content {
  background-color: #f0f6ff; // 透明度为0.2的skyblue，作者比较喜欢的颜色
  color: #3a8bff !important; // 节点的字体颜色
  font-weight: bold !important; // 字体加粗
}

.backBox {
  // width: 100%;
  display: flex;
  flex-direction: column;

  .head {
    width: 100%;
    border-radius: 5px;
    background-color: $primary-white-color;
    // height: 240px;
    box-sizing: border-box;
    padding: 20px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;

    .setting {
      display: flex;
      // align-items: flex-start;

      .contentSetting {
        // background: red;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
      }
    }
  }

  .bottom {
    flex: 1;
    display: flex;

    .left {
      width: 240px;
      box-sizing: border-box;
      padding: 20px;
      // font-size: 16px;
      background-color: $primary-white-color;
      border-radius: 5px;
      margin-right: 20px;

      // span{
      //   font-size:16px!important;
      // }
    }

    .right {
      flex: 1;
      background-color: $primary-white-color;
      min-height: 450px;
      background-color: white;
    }
  }

  .addSubtitleBox {
    box-sizing: border-box;
    padding: 30px;

    .titleText {
      color: $primary-color;
      line-height: 50px;
      font-weight: bold;
    }
  }
}
</style>
