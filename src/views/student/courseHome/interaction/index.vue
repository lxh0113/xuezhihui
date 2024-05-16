<template>
  <div class="backBox">
    <div class="title">
      <span class="text">进行中（2）</span>
      <el-tag size="small" type="primary">进行中</el-tag>
    </div>
    <hr>
    <div class="interactions">
      <interaction v-for="item in activities" :item="item">
        <template #mid>
          <p>二维码签到</p>
        </template>
      </interaction>
    </div>
    <br>
    <div class="title">
      <span class="text">已结束（2）</span>
      <el-tag size="small" type="success">已结束</el-tag>
    </div>
    <hr>
    <div class="interactions">
      <interaction v-for="item in activities" :item="item">
        <template #mid>
          <p>二维码签到</p>
        </template>
        <template #right>
          <p style="color:#A4ADC8">2024-3-20 至 2024-4-1</p>
        </template>
      </interaction>
    </div>
  </div>
</template>

<script lang='ts' setup>
// @ts-ignore
import interaction from '@/views/components/interaction.vue';

interface typeList extends Array<{type:'success'|'primary'|'info',name:string}>{}

const activities:typeList=[{type:'success',name:'签到',},{type:'primary',name:'选人'}]

</script>

<style lang='scss' scoped>
.backBox{
  // width: 100%;
  margin-right: 20px;
  height: calc(100vh - 120px);
  background-color: $primary-white-color;
  box-sizing: border-box;
  padding:30px;
  border-radius: 5px;

  .title{
    display: flex;
    align-items: center;
    height: 50px;

    .text{
      font-size: 18px;
      margin-right: 20px;
    }
  }
}

.interactions{
  margin-top:20px;
}
</style>