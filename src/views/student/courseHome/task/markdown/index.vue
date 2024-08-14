<template>
  <div class="bigBox">
    <span>思维导图</span>
    <div class="mind">
      <div class="svg-container">
        <svg ref="svgRef"></svg>
      </div>
      <div class="controls">
        <el-button type="primary" @click="zoomIn">放大</el-button>
        <el-button type="primary" @click="zoomOut">缩小</el-button>
        <el-button type="primary" @click="fitToScreen">适应屏幕</el-button>
        <el-button type="primary" @click="onSave">下载</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUpdated } from "vue";
import { Transformer } from "markmap-lib";
import { Markmap } from "markmap-view";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import { createMindMapByCourseIdAPI, getMindMapByCourseIdAPI } from "../../../../../apis/course";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";

const route = useRoute()
const transformer = new Transformer();

let initValue = `
# STM32 GPIO原理与项目实践

## 1. STM32 GPIO 基础原理

   - GPIO 概述
   - 寄存器操作与位操作
   - GPIO 模式 (输入 / 输出)
   - GPIO 控制寄存器 (CRx)
   - GPIO 数据寄存器 (IDR, ODR)

## 2. GPIO 配置与初始化

   - GPIO 初始化函数
   - GPIO 设置模式 (推挽输出、开漏输出、输入模式)
   - 中断控制与配置

## 3. GPIO 实时操作与示例

   - GPIO 输出操作
   - GPIO 输入操作
   - 实时状态监控

## 4. STM32 GPIO 项目实践

   - LED 控制项目
     - 软件开发流程
     - 硬件连接图
     - GPIO 配置代码示例

   - 按钮输入项目
     - 软件开发流程
     - 硬件连接图
     - GPIO 中断配置示例

## 5. GPIO 调试与优化

   - GPIO 状态监控与调试工具
   - 性能优化与电流消耗分析

## 6. 总结与展望

   - GPIO 在嵌入式系统中的重要性
   - STM32 GPIO 的应用领域
   - 未来发展趋势


`;

const mm = ref();
const svgRef = ref();

const zoomIn = () => mm.value.rescale(4);

const zoomOut = () => mm.value.rescale(0.8);

const fitToScreen = () => mm.value.fit();

const onSave = async () => {
  const dataUrl = await htmlToImage.toPng(svgRef.value);

  saveAs(dataUrl, "markmap.png");
};

const update = () => {
  const { root } = transformer.transform(initValue);
  mm.value.setData(root);
  mm.value.fit();
};

const init = async () => {
  const res = await getMindMapByCourseIdAPI(parseInt(route.params.id as string));

  if (res.data.code === 200) {
    initValue = res.data.data;
    update()
  } else {
    ElMessage.error(res.data.message);
  }
};

onMounted(() => {

  // 初始化markmap思维导图
  mm.value = Markmap.create(svgRef.value);
  // 更新思维导图渲染
  update();
  init()
});

onUpdated(update);
</script>

<style lang="scss" scoped>
.bigBox {
  background-color: #f5f7fd;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  span {
    color: $primary-color;
    line-height: 60px;
    font-weight: bold;
    font-size: 20px;
  }
}

.mind {
  width: 90%;
  max-width: 1200px;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;

  .svg-container {
    svg {
      min-height: 800px;
      width: 100%;
      height: 100%;
    }
  }

  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
  }
}

.controls {
  margin-top: 10px;
}
</style>
