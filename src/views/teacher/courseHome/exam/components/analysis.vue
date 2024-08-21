<template>
  <div class="backBox">
    <!-- <div class="title">学情分析</div> -->
    <div class="chart">
      <div id="oneChart"></div>
      <div id="twoChart"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, getCurrentInstance, ref } from "vue";
import { ElMessage } from "element-plus";
import { examAnalysisAPI } from "@/apis/assignment";
import { useRoute } from 'vue-router'

const route = useRoute()

const chartData1 = ref({
  title: {
    text: "此次考试各班平均分分布",
  },
  legend: {},
  dataZoom: [
    {
      type: "slider",
      throttle: "50",
      minValueSpan: 6,
      start: 1,
      end: 50,
      zoomLock: false,
    },
  ],
  color: [
    "#63b2ee",
    "#76da91",
    "#f8cb7f",
    "#f89588",
    "#7cd6cf",
    "#9192ab",
    "#7898e1",
    "#efa666",
    "#eddd86",
    "#9987ce",
    "#63b2ee",
    "#76da91",
  ],
  tooltip: {
    trigger: "axis", // 设置触发类型为坐标轴触发，即鼠标移动到坐标轴上时触发提示
    axisPointer: {
      type: "cross", // 坐标轴指示器类型，可以是 line（直线指示器）、shadow（阴影指示器）、cross（十字准星指示器）、none（无指示器）
    },
  },
  xAxis: {
    data: [],
  },
  yAxis: {},
  series: [],
});

const chartData2 = ref({
  title: {
    text: "各班级及格人数",
  },
  legend: {
    data: [],
  },
  dataZoom: [
    {
      type: "slider",
      throttle: 50,
      minValueSpan: 6,
      start: 1,
      end: 50,
      zoomLock: false,
    },
  ],
  color: [
    "#63b2ee",
    "#76da91",
    "#f8cb7f",
    "#f89588",
    "#7cd6cf",
    "#9192ab",
    "#7898e1",
    "#efa666",
    "#eddd86",
    "#9987ce",
    "#63b2ee",
    "#76da91",
  ],
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  xAxis: {
    data: [],
  },
  yAxis: {
    type: "value",
  },
  series: [],
});


let internalInstance = getCurrentInstance();
let echarts = internalInstance.appContext.config.globalProperties.$echarts;

const setChart = () => {
  const dom1 = document.querySelector("#oneChart");
  const myChart1 = echarts.init(dom1);
  const dom2 = document.querySelector("#twoChart");
  const myChart2 = echarts.init(dom2);

  // 指定图表的配置项和数据
  var option1 = chartData1.value;
  var option2 = chartData2.value;

  // 使用刚指定的配置项和数据显示图表。
  myChart1.setOption(option1);
  myChart2.setOption(option2);
  window.addEventListener("resize", () => {
    myChart1.resize();
    myChart2.resize();
  });

  // onUnmounted(() => {
  //   myChart1.dispose();
  //   myChart2.dispose();
  // });
};

const setChartData1 = async () => {
  console.log(route.params)
  const res = await examAnalysisAPI(parseInt(route.params.id as string));

  if (res.data.code === 200) {
    console.log(res.data.data)
    // console.log(res.data.data[0])

    // 横坐标
    chartData1.value.xAxis.data = res.data.data[0].classScoreList?.map(item => {
      return item.className
    })

    chartData1.value.series = res.data.data.map(item => {
      return {
        name: item.title,
        type: 'line',
        data: [],
        label: {
          show: false,
          position: 'top',
          textStyle: {
            fontSize: 14
          }
        },
        emphasis: {
          label: {
            show: true
          }
        }
      }
    })

    for (let i = 0; i < chartData1.value.series?.length; i++) {
      chartData1.value.series[i].data = res.data.data[i].classScoreList.map(item => {
        return item.avgScore || 0
      })
    }

    console.log(chartData1.value)
    // setChart()

  }
  else {
    ElMessage.error(res.data.message)
  }
}

const setChartData2 = async () => {
  const res = await examAnalysisAPI(parseInt(route.params.id as string));

  if (res.data.code === 200) {
    console.log(res.data.data)

    chartData2.value.xAxis.data = res.data?.data[0]?.classScoreList?.map(item => {
      return item.className
    })

    chartData2.value.series = res.data?.data?.map(item => {
      return {
        name: item.className,
        type: 'bar',
        data: [],
        label: {
          show: true,
          position: 'top',
          textStyle: {
            fontSize: 14
          }
        },
        emphasis: {
          label: {
            show: true
          }
        }
      }
    })

    for (let i = 0; i < chartData2.value.series?.length; i++) {
      chartData2.value.series[i].data = res.data.data[i].classScoreList.map(item => {
        return item.passingStudentsCount || 0
      })
    }
    // setChart()

  }
  else {
    ElMessage.error(res.data.message)
  }
}

const initChart = async() => {
  await setChartData1()
  await setChartData2()

  setChart()
}

onMounted(() => {
  // setChart();
  initChart()
});
</script>

<style lang="scss" scoped>
.backBox {
  background: white;
  box-sizing: border-box;
  padding: 20px;
  min-height: calc(100vh - 120px);
  // margin-bottom: 20px;
  margin-right: 20px;
  border-radius: 5px;

  .title {
    font-size: 20px;
    line-height: 50px;
    padding-left: 20px;
    color: #3a63f3;
    background-color: white;
  }

  .chart {
    display: flex;
    width: 100%;
    flex-direction: column;
    // background-color: antiquewhite;
    height: 100%;
    // flex-wrap: wrap;

    #oneChart,
    #twoChart {
      flex: 1;
      background-color: #fff;
      min-width: 400px;
      margin-right: 10px;
      margin-bottom: 10px;
      min-height: 420px;
      box-sizing: border-box;
      padding: 20px;

      transition: all 0.5s;
    }
  }
}
</style>
