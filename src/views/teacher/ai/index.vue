<template>
  <div class="aiBox">
    <div style="height: 30px; width: 10%"></div>
    <div class="top">
      AI出题&nbsp;&nbsp;&nbsp;
      <!-- <router-link to="/student/ai/generate"> 生成 </router-link> -->
    </div>
    <div class="bottom">
      <router-view> </router-view>
    </div>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.aiBox {
  min-width: calc(100vw - 260px);
  min-height: 760px;
  background-color: #fff;
  box-sizing: border-box;
  // padding:30px;
  margin-right: 20px;
  margin-bottom: 20px;

  .top {
    margin-left: 30px;
    font-size: 20px;
    font-weight: bold;
    border-bottom: 1px solid #c4c4c4;
    padding-bottom: 15px;
    color:$primary-color;

    a {
      color: #c4c4c4;
      text-decoration: none;
      margin-left: 30px;
      font-size: 18px;
      font-weight: normal;
    }

    .router-link-active {
      text-decoration: underline;
      color: #3a63f3;
    }
  }
}
</style>
