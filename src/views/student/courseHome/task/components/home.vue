<template>
  <div class="top">
    <Accompany></Accompany>
    <Homework></Homework>
  </div>
  <div class="bottom">
    <Details></Details>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import Accompany from "./accompany.vue";
// @ts-ignore
import Homework from "./homework.vue";
// @ts-ignore
import Details from "./details.vue";
</script>

<style lang="scss" scoped>
.top {
  display: grid;
  grid-template-columns: 1fr 2fr;
}
</style>
