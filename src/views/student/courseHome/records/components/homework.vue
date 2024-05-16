<template>
  <div class="backBox">
    <div class="header">
      <span>签到</span>
      <span>详情></span>
    </div>
    <div class="bottom">
      <div class="right">
        <div class="top">
          <span>6</span>
          <span>/7次</span>
        </div>
        <div class="gray">完成进度</div>
      </div>
      <div class="right">
        <div class="top">
          <span>92.2</span>
          <span>分</span>
        </div>
        <div class="gray">平均分</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.backBox {
  height: 100%;
  background-color: $primary-white-color;
  box-sizing: border-box;
  padding:20px 30px 20px 30px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;

  .header {
    display: flex;
    font-size: 16px;
    justify-content: space-between;
    color: $primary-gray-text-color;

    span:nth-child(1) {
      color: $primary-color;
      font-size: 20px;
    }
  }

  .bottom {
    flex: 1;
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
}
</style>
