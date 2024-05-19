<template>
  <div class="backBox">
    <div class="head">
      <div class="button">
        <el-button type="primary">保存</el-button>
        <el-button type="success">完成</el-button>
      </div>
      <div class="setting">
        <div class="contentSetting">
          <el-button :icon="Plus" type="primary" text="primary"
            >同级目录</el-button
          >
          <el-button type="primary" text="primary" :icon="Plus"
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
      <div class="right">
        <Editor
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          class="editor"
          style="height: calc(100vh - 420px); overflow-y: scroll; padding: 20px"
          @onCreated="handleCreated"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref, shallowRef, onMounted } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { Plus } from "@element-plus/icons-vue";

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("<p>hello</p>");

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = "<p>模拟 Ajax 异步设置内容</p>";
  }, 1500);
});

// 编辑器配置
const editorConfig = {
  placeholder: "请输入内容...",
  MENU_CONF: {
    /* 菜单配置，下文解释 */
  },
};

const handleCreated = (editor: any) => {
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
  children?: Tree[];
}

const handleNodeClick = (data: Tree) => {
  console.log(data);
};

const data: Tree[] = [
  {
    label: "引言",
    children: [
      {
        label: "哇卡卡卡",
        children: [
          {
            label: "想鼠",
          },
        ],
      },
    ],
  },
  {
    label: "我爱你",
    children: [
      {
        label: "神经",
        children: [
          {
            label: "哎",
          },
        ],
      },
      {
        label: "嘎",
        children: [
          {
            label: "无语",
          },
        ],
      },
    ],
  },
  {
    label: "哇啊啊啊",
    children: [
      {
        label: "飒飒飒飒",
        children: [
          {
            label: "男大",
          },
        ],
      },
      {
        label: "女大",
        children: [
          {
            label: "哈哈哈哈",
          },
        ],
      },
    ],
  },
];

const defaultProps = {
  children: "children",
  label: "label",
};
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
<style lang="scss" scoped>
.el-tree {
  --el-tree-node-content-height: 40px;
  --el-tree-text-color: black;
  --el-font-size-base: 16px;
}

:root {
  --el-fill-color-light: #2f3ced;
  --el-color-primary-light-9: #2f3ced;
}

.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  // 设置颜色
  background-color: #f0f6ff; // 透明度为0.2的skyblue，作者比较喜欢的颜色
  color: #3a8bff!important; // 节点的字体颜色
  font-weight: bold; // 字体加粗
}

.el-tree-node:focus > .el-tree-node__content {
  background-color: #f0f6ff; // 透明度为0.2的skyblue，作者比较喜欢的颜色
  color: #3a8bff!important; // 节点的字体颜色
  font-weight: bold!important; // 字体加粗
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
    }
  }
}
</style>
