<template>
  <div class="head">
    <router-link active-class="active" to="/student/course/learn">
      <span>我学的课</span>
    </router-link>
    <router-link active-class="active" to="/student/course/teach">
      <span>我教的课</span>
    </router-link>
  </div>

  <div class="bottom">
    <router-view></router-view>
  </div>
</template>

<script lang='ts' setup>

</script>

<style lang='scss' scoped>
a{
  text-decoration: none;
  color:$primary-gray-text-color;
}

.active{
  color:$primary-color;
}

.head{
  span{
    // color:$primary-color;
    margin-right: 40px;
    font-size: 16px;
  }

  
}
.bottom{
  width: 100%;
  height:calc(100vh - 120px)
}
</style>