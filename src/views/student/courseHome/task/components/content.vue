<template>
  <div class="backBox">
    <div class="title">课程目录</div>
    <!-- <br> -->
    <div class="content">
      <el-tree
        :data="treeData"
        :props="defaultProps"
        :show-checkbox="false"
        :default-expand-all="true"
        :highlight-current="true"
        :expand-on-click-node="false"
        :indent="22"
      >
        <template #default="{ node, data }">
          <span v-if="!node.isLeaf" style="display: flex; align-items: center">
            <el-icon v-if="node.expanded" style="margin: 0 6px 0 2px" size="20"
              ><FolderOpened
            /></el-icon>
            <el-icon v-else style="margin: 0 6px 0 2px" size="20"
              ><Folder
            /></el-icon>
            <large @click="handleNodeClick(node, data)">{{ node.label }}</large>
            <el-icon
              v-if="node.disabled"
              style="margin: 0 6px 0 20px"
              color="#2f3ced"
              size="20"
            >
              <SuccessFilled />
            </el-icon>
          </span>

          <span v-else style="display: flex; align-items: center">
            <el-icon style="margin: 0 6px 0 2px" size="20"
              ><Document
            /></el-icon>
            <large @click="handleNodeClick(node, data)">{{ node.label }}</large>
          </span>
        </template>
      </el-tree>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter,useRoute } from "vue-router";
import { onMounted, ref } from "vue";

// 代理对象
//  const { proxy } = getCurrentInstance()

const route=useRoute()
const router=useRouter()

// 树型数据
const treeData = ref([
  {
    label: "如果爱忘了",
    expanded: true,
    done: false,
    path: "1",
    children: [
      {
        label: "小幸运",
        path: "2",
        children: [
          {
            label: "瞬",
            path: "3",
          },
          {
            label: "句号",
            path: "4",
          },
        ],
      },
      {
        label: "后端开发技术",
        done: true,
        path: "5",
        children: [
          {
            label: "Java编程技术",
            path: "6",
          },
          {
            label: "Python编程技术",
            path: "6",
          },
        ],
      },
      {
        label: "数据库",
        done: true,
        path: "7",
        children: [
          {
            label: "关系型数据库",
            children: [
              {
                label: "MySQL",
                path: "8",
              },
              {
                label: "Oracle",
                path: "9",
              },
            ],
          },
          {
            label: "非关系型数据库",
            done: true,
            path: "10",
            children: [
              {
                label: "Redis",
                path: "11",
              },
              {
                label: "Elasticsearch",
                path: "12",
              },
            ],
          },
        ],
      },
      {
        label: "AI人工智能",
      },
    ],
  },
  {
    label: "火腿 iPad 泡面",
  },
]);

// 树节点属性映射关系
const defaultProps = {
  children: "children",
  label: "label",
  disabled: "done"
};

/**
 * 树组件点击事件句柄方法
 */
const handleNodeClick = (node: any, data: any) => {
  console.log(
    "%c 树组件点击事件句柄方法 %c handleNodeClick",
    "padding: 1px; background-color: #35495e; color: #fff",
    "padding: 1px; background-color: #5e7ce0; color: #fff"
  );
  console.log(
    "%c ∟ %c node %c =>",
    "text-indent: 10px",
    "padding: 1px; background-color: #41b883; color: #fff",
    "color: #000",
    node
  );
  console.log(
    "%c ∟ %c data %c =>",
    "text-indent: 10px",
    "padding: 1px; background-color: #41b883; color: #fff",
    "color: #000",
    data
  );

  router.push('/course/'+route.params.id+'/task/'+data.path)
};

onMounted(() => {
  // ...
});
</script>

<style lang="scss" scoped>
.el-tree {
  --el-tree-node-content-height: 60px;
  --el-tree-text-color: #626467;
}

:root {
  --el-fill-color-light: #2f3ced;
  --el-color-primary-light-9: #2f3ced;
}

.backBox {
  width: 400px;
  height: calc(100vh - 120px);
  background: $primary-white-color;
  border-radius: 5px;
  margin-right: 20px;
  margin-bottom: 20px;

  .title {
    display: block;
    font-weight: bold;
    height: 50px;
    line-height: 50px;
    margin-left: 20px;
    // background: red;
  }

  .content{
    height: calc(100vh - 150px);
    overflow-y: scroll;
  }
}

.element-plus-tree {
  padding: 100px;

  :deep(.el-tree) {
    .el-tree-node {
      /* ^ 所有节点 */
      i.el-tree-node__expand-icon {
        padding: 6px;

        &::before {
          font-family: element-ui-icons;
          font-style: normal;
          content: "\e6d9";
          color: #000000;
          border: 1px solid #606266;
          border-radius: 2px;
        }

        svg {
          display: none; // 隐藏所有节点的 svg 图标
        }
      }
      /* / 所有节点 */

      /* ^ 已展开的父节点 */
      i.el-tree-node__expand-icon.expanded {
        transform: rotate(0deg); // 取消旋转
        -webkit-transform: rotate(0deg); // 取消旋转

        &::before {
          font-family: element-ui-icons;
          font-style: normal;
          content: "\e6d8";
          color: #000000;
          border: 1px solid #606266;
          border-radius: 2px;
        }
      }
      /* / 已展开的父节点 */

      /* ^ 叶子节点 */
      i.el-tree-node__expand-icon.is-leaf {
        &::before {
          display: none;
        }
      }
      /* / 叶子节点 */

      /* ^ 复选框 */
      .el-checkbox {
        margin: 0 7px 0 2px;

        .el-checkbox__inner {
          width: 20px;
          height: 20px;
          border-radius: 2px;
          border: 1px solid #bbb;
        }

        .el-checkbox__input.is-checked .el-checkbox__inner,
        .el-checkbox__input.is-indeterminate .el-checkbox__inner {
          border: 1px solid #5e7ce0;
        }
      }
      /* / 复选框 */

      .el-tree-node__content {
        small {
          font-size: 20px;
        }
      }
    }
  }
}
</style>
