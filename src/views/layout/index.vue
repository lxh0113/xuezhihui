<template>
  <div>
    这是首页
  </div>
  <h3 @click="$router.push('/student')">
    点我去学生端
  </h3>
  <h3 @click="$router.push('/teacher')">
    点我去教师端
  </h3>
</template>

<script lang='ts' setup>
</script>

<style lang='scss' scoped>

</style>