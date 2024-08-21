<template>
  <div class="head">
    <router-link active-class="active" to="/teacher/course/teach">
      <span>我教的课</span>
    </router-link>
    <!-- <router-link active-class="active" to="/teacher/course/learn">
      <span>我学的课</span>
    </router-link> -->
  </div>

  <div class="bottom">
    <router-view></router-view>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
a {
  text-decoration: none;
  color:$primary-gray-text-color;
}

.active {
  color: $primary-color!important;
}

.head {
  span {
    // color: black;
    margin-right: 40px;
    font-size: 16px;
  }
}
.bottom {
  width: 100%;
  min-height: calc(100vh - 120px);
  margin-bottom: 20px;
}
</style>
