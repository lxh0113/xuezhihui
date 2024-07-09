<template>
  <div class="bigBox">
    <div class="title">
      <span>作业得分情况</span>
      <span>平均分:87分</span>
    </div>
    <div id="homework"></div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, onUnmounted } from "vue";
let internalInstance = getCurrentInstance();
let echarts = internalInstance!.appContext.config.globalProperties.$echarts;

onMounted(() => {
  var myChart = echarts.init(document.getElementById("homework"));

  myChart.setOption({
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "第一次作业",
        "第二次作业",
        "第三次作业",
        "第四次作业",
        "第五次作业",
        "第六次作业",
        "第七次作业",
        "第八次作业",
      ],
    },
    color: ["#2f3ced"],
    yAxis: {
      type: "value",
      color: ["#ff0000"],
    },
    grid: {
      top: 10,
      x: 0,
      x2: 0,
      y2: 0,
    },
    series: [
      {
        data: [60, 76, 80, 75, 90, 100, 69, 87],
        type: "line",
        smooth: true,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "#2f3ced", // 开始颜色
            },
            {
              offset: 1,
              color: "rgba(47, 60, 237, 0)", // 结束颜色（透明）
            },
          ]),
        },
      },
    ],
  });

  window.addEventListener('resize',()=>{
    // alert(1)
    myChart.resize()

  })

  onUnmounted(() => {
    myChart.dispose();
  });
});

// 绘制图表
</script>

<style lang="scss" scoped>
.bigBox {
  min-width: 520px;
  height: 320px;
  padding: 20px;
  background-color: $primary-white-color;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-right: 20px;
  border-radius: 5px;
  margin-bottom: 20px;

  .title {
    height: 30px;
    min-width: 520px;
    display: flex;
    justify-content: space-between;

    span {
      font-weight: bold;
      font-size: 18px;
    }

    span:nth-child(1) {
      color: $primary-color;
    }

    span:nth-child(2) {
      color: $primary-gray-text-color;
    }
  }

  #homework {
    min-width: 520px;
    flex: 1;
  }
}
</style>
