<template>
  <div class="bigBox">
    <div class="left">
      <img src="@/assets/image/accompany.png" alt="" />
    </div>
    <div class="right">
      <span class="title"> 虚拟人陪伴 </span>
      <p class="systemText">系统</p>
      <p class="content">
        虚拟人陪伴系统在学习方面可以提供定制化的学习计划、答疑解惑、学习资源推荐等功能，通过智能对话和个性化指导，增强用户的学习动力和效率，提升学习体验。
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.bigBox {
  display: flex;
  background-color: $primary-white-color;
  min-width: 320px;
  height: 320px;
  border-radius: 5px;
  align-items: center;
  padding: 20px;
  margin-right: 20px;
  margin-bottom: 20px;


  img {
    width: 160px;
  }

  .right {
    margin-left: 20px;

    .title {
      color: $primary-color;
      font-size: 22px;
      font-weight: bold;
      line-height: 50px;
    }

    .systemText {
      color: #000;
      font-size: 18px;
      font-weight: bold;
      line-height: 50px;
    }

    .content {
      font-size: 14px;
      text-indent: 2rem;
      margin-top: 20px;
      color: $primary-gray-text-color;
    }
  }
}
</style>
