<template>
  <div class="bigBox">
    <span class="textTitle">知识图谱</span>

    <div>
      <div
        style="
          border: #efefef solid 1px;
          height: calc(100vh - 200px);
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
        "
      >
        <relation-graph
          :on-node-click="onNodeClick"
          ref="graphRef$"
          :options="options"
          :on-line-click="onLineClick"
        >
        </relation-graph>
      </div>
    </div>
  </div>

  <el-dialog v-model="editDialog" title="编辑节点" width="500">
    <el-form>
      <el-form-item label="内容">
        <el-input v-model="editForm.text"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="editDialog = false">取消</el-button>
        <el-button type="primary" @click="editCurrentNode"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog v-model="addDialog" title="新增节点" width="500">
    <el-form label-width="100" label-position="left">
      <el-form-item label="内容">
        <el-input v-model="addForm.text" style="width: 240px"></el-input>
      </el-form-item>
      <el-form-item label="父级节点">
        <el-select-v2
          v-model="addForm.parentNodes"
          placeholder="选中父级节点"
          :options="nodesList"
          style="width: 240px"
          multiple
        >
        </el-select-v2>
      </el-form-item>
      <el-form-item label="子节点">
        <el-select-v2
          v-model="addForm.childrenNodes"
          placeholder="选中子节点"
          style="width: 240px"
          :options="nodesList"
          multiple
        >
        </el-select-v2>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addDialog = false">取消</el-button>
        <el-button type="primary" @click="addNewNode"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog v-model="editLinesDialog" title="编辑线条文字" width="500">
    <el-form>
      <el-form-item label="内容">
        <el-input v-model="editLinesForm.text"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="editLinesDialog = false">取消</el-button>
        <el-button type="primary" @click="editCurrentLines"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import RelationGraph from "relation-graph-vue3";
import type { RGNode, RGUserEvent } from "relation-graph-vue3";
import { ElMessage } from "element-plus";
import {
  teacherGetKnowledgeChartByCourseAPI,
  getKnowledgeChartAPI,
} from "../../../../../apis/course";
import { useRoute } from "vue-router";

import { ElLoading } from "element-plus";

const route = useRoute();
const editDialog = ref(false);
const addDialog = ref(false);
const editLinesDialog = ref(false);

const nodesList = ref([]);

const editForm = ref({
  id: "",
  text: "",
});

const editLinesForm = ref({
  text: "",
});

const graphRef$ = ref<RelationGraph>();
const options = {
  defaultExpandHolderPosition: "right",
};

let jsonData = null;

const currentNode = ref(null);

//节点点击函数
const onNodeClick = (nodeObject, $event) => {
  console.log(nodeObject);
  currentNode.value = nodeObject;
};

const addForm = ref({
  id: "",
  text: "",
  parentNodes: [],
  childrenNodes: [],
});

const addNewNode = () => {
  if (currentNode.value === null) {
    ElMessage.error("您还未选中任何节点");
    return;
  }

  // 生成新节点的ID，这里可以根据需要生成唯一的ID，例如使用 UUID 库
  const newId = generateUniqueId();

  // 构造新节点对象
  const newNode = {
    id: newId,
    text: addForm.value.text,
  };

  // 更新 nodes 数据
  jsonData.nodes.push(newNode);

  // 更新 lines 数据，将新节点与每一个父节点相连
  addForm.value.parentNodes.forEach((parentId) => {
    jsonData.lines.push({ from: parentId, to: newId });
  });

  // 更新 lines 数据，将新节点与每一个子节点相连
  addForm.value.childrenNodes.forEach((childId) => {
    jsonData.lines.push({ from: newId, to: childId });
  });

  graphRef$.value.setJsonData(jsonData);

  addDialog.value = false;
};

// 示例生成唯一ID的函数，实际项目中可能会用到 UUID 库等
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9); // 生成随机字符串作为ID
}

const editCurrentNode = () => {
  if (currentNode.value === null) {
    ElMessage.error("您还未选中任何节点");
    return;
  }

  // 找到当前节点在节点数组中的索引
  const index = jsonData.nodes.findIndex(
    (node) => node.id === currentNode.value.id
  );

  if (index !== -1) {
    // 修改节点文本
    jsonData.nodes[index].text = editForm.value.text; // 假设编辑表单的文本值存储在editForm中

    // 更新图形数据
    graphRef$.value.setJsonData(jsonData);

    // 关闭编辑对话框等其他操作
    editDialog.value = false;
  } else {
    ElMessage.error("未找到当前节点");
  }

  editDialog.value = false;
};

const onLineClick = (linkObject, $event) => {
  console.log("onLineClick:", linkObject);
  editLinesForm.value.text = linkObject.text;
  editLinesDialog.value = true;
};

const editCurrentLines = (linkObject) => {
  // Find the corresponding line in jsonData.lines based on from and to IDs
  let lineToUpdateIndex = 0;

  for (let i = 0; i < jsonData.lines.length; i++) {
    if (
      linkObject.from === jsonData.lines[i].from &&
      linkObject.to === jsonData.lines[i].to
    ) {
      lineToUpdateIndex = i;
    }
  }

  console.log(lineToUpdateIndex);

  // Check if the lineToUpdate is found
  if (lineToUpdateIndex !== -1) {
    jsonData.lines[lineToUpdateIndex].text = editLinesForm.value.text;
  } else {
    console.warn(`Line not found for ${linkObject.from} to ${linkObject.to}`);
  }

  graphRef$.value.setJsonData(jsonData);

  editLinesDialog.value = false; // Close the edit lines dialog
};

onMounted(() => {
  jsonData = {
    rootId: "a",
    nodes: [
      { id: "a", text: "计算机硬件的发展" },
      { id: "b", text: "晶体管" },
      { id: "c", text: "集成电路和微处理器" },
      { id: "d", text: "电子管计算机" },
      { id: "e", text: "冯·诺依曼体系结构" },
    ],
    lines: [
      { from: "a", to: "b", text: "123 " },
      { from: "a", to: "c", text: "" },
      { from: "a", to: "d", text: "" },
      { from: "c", to: "e", text: "" },
    ],
  };

  nodesList.value = jsonData.nodes.map((item) => {
    return {
      label: item.text,
      value: item.id,
    };
  });

  currentNode.value = jsonData.nodes.find(
    (item: any) => item.id === jsonData.rootId
  );

  
  graphRef$.value.setJsonData(jsonData);
  
});

const generate = async () => {
  const res = await getKnowledgeChartAPI(
    parseInt(route.params.id as string)
  );

  if (res.data.code === 200) {
    // ElMessage.success('生成成功')
    console.log(res.data.code);
    return true;
  } else return false;
};

const getKnowledge = async () => {
  const res = await getKnowledgeChartAPI(parseInt(route.params.id as string));

  if (res.data.code === 200) {
    console.log(res.data.data);

    // Check if nodes and lines are arrays before using forEach
    if (Array.isArray(res.data.data.nodes)) {
      res.data.data.nodes = res.data.data.nodes.map((item) => {
        return {
          id: item.id + "",
          text: item.name,
          courseId: item.courseId,
        };
      });
    }

    if (Array.isArray(res.data.data.lines)) {
      res.data.data.lines.forEach((item) => {
        item.from = item.from + "";
        item.to = item.to + "";
      });
    }

    let rootId = res.data.data.roodId;
    let jsonData = {
      rootId,
      nodes: res.data.data.nodes, // Assign nodes and lines directly if they are arrays
      lines: res.data.data.lines,
    };

    graphRef$.value.setJsonData(jsonData);
  } else {
    ElMessage.error(res.data.message);
  }
};

const setKnowledge = () => {
  jsonData = {
    rootId: "a",
    nodes: [
      { id: "a", text: "计算机硬件的发展" },
      { id: "b", text: "晶体管" },
      { id: "c", text: "集成电路和微处理器" },
      { id: "d", text: "电子管计算机" },
      { id: "e", text: "冯·诺依曼体系结构" },
      { id: "f", text: "摩尔定律" },
      { id: "g", text: "存储技术发展" },
      { id: "h", text: "操作系统" },
      { id: "i", text: "计算机网络" },
      { id: "j", text: "云计算" },
      { id: "k", text: "量子计算" },
      { id: "l", text: "超级计算机" },
      { id: "m", text: "计算机图形学" },
      { id: "n", text: "嵌入式系统" },
      { id: "o", text: "人工智能芯片" },
      { id: "p", text: "并行计算架构" },
      { id: "q", text: "分布式系统" },
      { id: "r", text: "虚拟化技术" },
      { id: "s", text: "内存技术" },
      { id: "t", text: "显示技术" },
      { id: "u", text: "输入输出设备" },
    ],
    lines: [
      { from: "a", to: "b", text: "晶体管的发明与应用" },
      { from: "a", to: "c", text: "集成电路的演进" },
      { from: "a", to: "d", text: "电子管计算机的历史" },
      { from: "c", to: "e", text: "冯·诺依曼体系结构的提出" },
      { from: "b", to: "f", text: "摩尔定律对硬件发展的影响" },
      { from: "c", to: "g", text: "存储技术的发展与应用" },
      { from: "h", to: "a", text: "硬件与操作系统的关系" },
      { from: "i", to: "h", text: "操作系统在计算机网络中的作用" },
      { from: "i", to: "j", text: "云计算对硬件架构的影响" },
      { from: "j", to: "k", text: "量子计算在未来计算机中的潜力" },
      { from: "l", to: "h", text: "超级计算机与硬件架构的关系" },
      { from: "m", to: "h", text: "计算机图形学对硬件性能的要求" },
      { from: "n", to: "h", text: "嵌入式系统的硬件设计特点" },
      { from: "o", to: "c", text: "人工智能芯片与集成电路的结合" },
      { from: "p", to: "a", text: "并行计算与计算机硬件架构" },
      { from: "q", to: "i", text: "分布式系统中的硬件设计考量" },
      { from: "r", to: "h", text: "虚拟化技术对硬件资源的利用" },
      { from: "s", to: "g", text: "内存技术与集成电路的发展" },
      { from: "t", to: "h", text: "显示技术对计算机用户接口的影响" },
      { from: "u", to: "h", text: "输入输出设备在硬件系统中的角色" },
    ],
  };

  const loading = ElLoading.service({
    lock: true,
    text: "加载中……",
    background: "rgba(0, 0, 0, 0.7)",
  });

  setTimeout(() => {
    graphRef$.value.setJsonData(jsonData);
    loading.close();
  }, 5 * 1000);
};

onMounted(async () => {
 
  getKnowledge()

  // setKnowledge();
});
</script>

<style lang="scss" scoped>
.bigBox {
  background-color: #f5f7fd;
  min-height: 100vh;

  .textTitle {
    color: $primary-color;
    margin-left: 30px;
    margin-top: 30px;
    font-weight: bold;
    font-size: 20px;
    line-height: 100px;
  }
}
</style>
