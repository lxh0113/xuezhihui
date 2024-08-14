<template>
  <div class="bigBox">
    <div class="left">
      <div class="title">
        <el-progress width="50" color="#2f3ced" stroke-width="3" type="circle" :percentage="25" />
        <span>任务点完成情况</span>
      </div>
      <div id="leftTimeChart"></div>
    </div>

    <div class="right">

      <div class="rightContent">
        <div class="title">课程学习</div>

        <div class="data">
          <div class="analysis">
            <div class="bigNumber">0.0/0.0</div>
            <div class="smallText">当天/总时长(小时)</div>
          </div>
          <div class="analysis">
            <div class="bigNumber">0/186</div>
            <div class="smallText">已完成/总练习(个)</div>
          </div>
          <div class="analysis">
            <div class="bigNumber">0.0%</div>
            <div class="smallText">平均正确率</div>
          </div>
        </div>
      </div>

      <div class="knowledge">
        <div class="knowledgeChart" @click="toKnowledgeChart">
          <img src="../../../../../assets/image/knowledgeChart.png" alt=""  />
          <h3>课程知识图谱</h3>
        </div>

        <div class="braveChart" @click="toBraveChart">
          <img src="../../../../../assets/image/braveChart.png" alt=""  />
          <h3>课程思维导图</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, onMounted, onUnmounted } from "vue";
import { useRoute,useRouter } from 'vue-router'

const route=useRoute()
const router=useRouter()

let internalInstance = getCurrentInstance();
let echarts = internalInstance!.appContext.config.globalProperties.$echarts;

onMounted(() => {
  var myChart = echarts.init(document.getElementById("leftTimeChart"));

  myChart.setOption({
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    grid: {
      top: 10,
      x: 0,
      x2: 0,
      y2: 0,
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "70%"],
        // adjust the start and end angle
        startAngle: 180,
        endAngle: 360,
        data: [
          { value: 14, name: "8：00-12：00" },
          { value: 7, name: "12：00-18：00" },
          { value: 4, name: "18：00-20：00" },
          { value: 3, name: "20:00-24:00" },
          { value: 10, name: "24:00-8:00" },
        ],
      },
    ],
  });

  window.addEventListener('resize', () => {
    // alert(1)
    myChart.resize()

  })

  onUnmounted(() => {
    myChart.dispose();
  });
});

const toKnowledgeChart=()=>{
  router.push('/course/'+route.params.id+'/knowledge')
}

const toBraveChart=()=>{
  router.push('/course/'+route.params.id+'/braveChart')

}

</script>

<style lang="scss" scoped>
.el-progress-circle {
  width: 20px !important;
  height: 20px !important;
}

.bigBox {
  // margin-top:20px;
  // width: 700px;
  min-height: calc(100vh - 500px);
  margin-right: 20px;
  border-radius: 5px;
  box-sizing: border-box;
  // padding: 20px;
  display: flex;
  justify-content: space-between;
  // flex-direction: column;

  #leftTimeChart {
    width: 100%;
    height: 100%;
  }

  .left {
    background-color: $primary-white-color;
    flex: 1;
    margin-right: 20px;
    // margin:20px;
    padding: 20px;
    ;
  }

  .right {
    flex: 2;
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 500px);
  }

  .title {
    display: flex;
    // justify-content: center;
    align-items: center;
    height: 50px;


    span {
      margin-left: 20px;
      color: $primary-color;
      font-weight: bold;
      font-size: 20px;
    }
  }

  .rightContent {
    // margin-left: 20px;
    background-color: $primary-white-color;
    padding: 20px;
    flex: 1;

    .title {
      color: $primary-color;
      font-weight: bold;
      font-size: 18px;
    }

    .data {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      .analysis {
        width: 200px;
        margin-bottom: 20px;

        .bigNumber {
          font-size: 30px;
        }

        .smallText {
          color: $primary-gray-text-color;
          font-size: 14px;
        }
      }
    }
  }

  .knowledge {
    flex: 1;
    // background-color: red;
    border-radius: 5px;
    display: flex;
    align-items: center;


    .knowledgeChart,
    .braveChart {
      flex: 1;
      background-color: $primary-white-color;
      padding: 20px;
      display: flex;
      margin-top: 20px;
      flex-direction: column;
      align-items: center;

      h3 {
        color: $primary-color;
      }

      img {
        height: 120px;
        width: 120px;
      }
    }

    .knowledgeChart {
      margin-right: 20px;
    }

    .knowledgeChart:hover {
      background-color: #efebf5;
    }

    .braveChart:hover {
      background-color: #e4f9fe;
    }


  }

}
</style>
