<template>
  <div class="bigBox">
    <span class="textTitle">知识图谱</span>
    <el-button @click="deleteCurrentNode" type="primary" style="margin-left: 20px">删除当前节点</el-button>
    <el-button @click="dealEdit" type="primary" style="margin-left: 20px">编辑当前节点</el-button>
    <el-button @click="addDialog = true" type="primary" style="margin-left: 20px">新建</el-button>
    <el-button type="primary" style="margin-left: 20px" @click="getKnowledge">生成知识图谱</el-button>

    <div>
      <div style="
          border: #efefef solid 1px;
          height: calc(100vh - 200px);
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
        ">
        <relation-graph :on-node-click="onNodeClick" ref="graphRef$" :options="options" :on-line-click="onLineClick">
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
        <el-select-v2 v-model="addForm.parentNodes" placeholder="选中父级节点" :options="nodesList" style="width: 240px"
          multiple>
        </el-select-v2>
      </el-form-item>
      <el-form-item label="子节点">
        <el-select-v2 v-model="addForm.childrenNodes" placeholder="选中子节点" style="width: 240px" :options="nodesList"
          multiple>
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
  // graphRef$.value.refresh()
  addDialog.value = false;
};

// 示例生成唯一ID的函数，实际项目中可能会用到 UUID 库等
function generateUniqueId() {
  return Math.random().toString(36).substr(2, 9); // 生成随机字符串作为ID
}


const deleteCurrentNode = () => {
  console.log(jsonData)
  if (!jsonData || !Array.isArray(jsonData.nodes) || !Array.isArray(jsonData.lines)) {
    console.error("Invalid jsonData structure. Ensure jsonData.nodes and jsonData.lines are arrays.");
    return;
  }

  let flag = confirm("您确定要删除当前节点吗？这将删除当前节点以及子节点。");

  if (currentNode.value.id === jsonData.rootId) {
    ElMessage.error("根节点不能删除");
    return;
  }

  if (flag) {
    const currentNodeId = currentNode.value.id; // 获取当前节点的ID

    const removeNodeAndChildren = (nodeId) => {
      if (!Array.isArray(jsonData.lines) || !Array.isArray(jsonData.nodes)) {
        console.error("Invalid jsonData structure inside removeNodeAndChildren.");
        return;
      }

      // 删除与当前节点相关的线条
      jsonData.lines = jsonData.lines.filter(
        (line) => line.from !== nodeId && line.to !== nodeId
      );

      const nodeIndex = jsonData.nodes.findIndex((node) => node.id === nodeId);
      if (nodeIndex !== -1) {
        jsonData.nodes.splice(nodeIndex, 1); // 删除节点
      }

      // 递归删除子节点
      const children = jsonData.lines
        .filter((line) => line.from === nodeId)
        .map((line) => line.to);

      children.forEach((childId) => removeNodeAndChildren(childId));
    };

    removeNodeAndChildren(currentNodeId);

    // 更新图形数据
    if (graphRef$.value && typeof graphRef$.value.setJsonData === 'function') {
      graphRef$.value.setJsonData(jsonData);
      // graphRef$.value.refresh()
    } else {
      console.error("graphRef$ is not properly initialized.");
    }
  }
};


const dealEdit = () => {
  if (currentNode.value === null) {
    ElMessage.error("您还未选中任何节点");
    return;
  }
  editForm.value.id = currentNode.value.id;
  editForm.value.text = currentNode.value.text;

  editDialog.value = true;
};

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
    // graphRef$.value.refresh()

    // 关闭编辑对话框等其他操作
    editDialog.value = false;
  } else {
    ElMessage.error("未找到当前节点");
  }

  editDialog.value = false;
};

const onNodeTextChange = (node: RGNode, newNodeText: string) => {
  node.text = newNodeText;
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
  // graphRef$.value.refresh()

  editLinesDialog.value = false; // Close the edit lines dialog
};

onMounted(() => {
  jsonData = {
    rootId: "a",
    nodes: [
      { id: "a", text: "暂无知识图谱，可以点击生成知识图谱创建" }
    ],
    lines: [

    ]
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
  // alert(1)
  const res = await getKnowledgeChartAPI(
    parseInt(route.params.id as string)
  );

  if (res.data.code === 200) {

    console.log(res.data.code);
    if (res.data.data === null) return false
    {
      setChart(res.data.data)
      return true;
    }
  } else return false;
};

const setChart = (data) => {
  if (Array.isArray(data.nodes)) {
    data.nodes = data.nodes.map((item) => {
      return {
        id: item.id + "",
        text: item.name,
        courseId: item.courseId,
      };
    });
  }

  if (Array.isArray(data.lines)) {
    data.lines.forEach((item) => {
      item.from = item.from + "";
      item.to = item.to + "";
    });
  }

  let rootId = data.roodId;
  jsonData = {
    rootId,
    nodes: data.nodes, // Assign nodes and lines directly if they are arrays
    lines: data.lines,
  };

  nodesList.value = jsonData.nodes.map((item) => {
    return {
      label: item.text,
      value: item.id,
    };
  });

  graphRef$.value.setJsonData(jsonData);
}

const getKnowledge = async () => {
  // alert(2)
  const res = await teacherGetKnowledgeChartByCourseAPI(parseInt(route.params.id as string));

  if (res.data.code === 200) {
    console.log(res.data.data);

    setChart(res.data.data)

  } else {
    ElMessage.error(res.data.message);
  }
};

onMounted(async () => {
  let flag = await generate();

  if (flag === false) {
    ElMessage.error('暂无知识图谱，可以点击生成')
    return;
  }
  else {
    // getKnowledge()
  }

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
