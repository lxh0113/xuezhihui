<template>
  <div class="backBox">
    <div class="header">
      <span>在线考试</span>
      <span>详情></span>
    </div>
    <div class="mid">
      <div class="right">
        <div class="top">
          <!-- <span></span> -->
          <!-- <span>{{ allExamNum }}次</span> -->
           <span>1次</span>
        </div>
        <div class="gray">完成进度</div>
      </div>
      <div class="right">
        <div class="top">
          <span>{{ avgExamScore }}</span>
          <span>分</span>
        </div>
        <div class="gray">平均分</div>
      </div>
    </div>

    <div id="examChart"></div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, onUnmounted, ref,watch } from "vue";

let internalInstance = getCurrentInstance();
let echarts = internalInstance!.appContext.config.globalProperties.$echarts;


const options = ref({
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
    top: 0,
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

const setChart = () => {

  const dom = document.querySelector('#examChart');
  const myChart = echarts.init(dom);


  options.value.xAxis.data=props.examHistoryVoList.map(item=>{
    return item.examTitle
  })

  options.value.series[0].data=props.examHistoryVoList.map(item=>{
    return item.studentScore
  })

  myChart.setOption(options.value);

  window.addEventListener("resize", () => {
    // alert(1)
    myChart.resize();
  });

  onUnmounted(() => {
    myChart.dispose();
  });
};


const props = withDefaults(
  defineProps<{
    allExamNum: number;
    avgExamScore: number;
    examHistoryVoList: {
      examId: number;
      examTitle: string;
      studentScore: number;
    }[];
  }>(),
  {
    
  }
);



watch(props,()=>{
  setChart()
})

onMounted(() => {
  setChart();
});
</script>

<style lang="scss" scoped>
.backBox {
  height: 100%;
  background-color: $primary-white-color;
  border-radius: 5px;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;

  .header {
    font-size: 16px;
    color: $primary-gray-text-color;
    display: flex;
    justify-content: space-between;

    span:nth-child(1) {
      color: $primary-color;
      font-size: 20px;
    }
  }

  .mid {
    margin-top: 20px;
    // flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .top {
      font-weight: bold;

      span:nth-child(1) {
        font-size: 26px;
      }
    }

    .gray {
      color: $primary-gray-text-color;
      margin-top: 20px;
    }
  }

  #examChart {
    flex: 1;
    margin-top: 20px;
  }
}
</style>
