<template>
  <div class="bigBox">
    <!-- 视频 -->
    <!-- <div class="video-container">
      <myVideo src="https://media.w3.org/2010/05/sintel/trailer.mp4" />
    </div> -->

    <!-- <iframe class="ppt" :src="'http://view.officeapps.live.com/op/view.aspx?src='+pathUrl" frameborder="0"></iframe> -->

    <div class="text">
      Donec facilisis tortor ut augue lacinia, at viverra est semper. Sed sapien metus, scelerisque nec pharetra id, tempor a tortor. Pellentesque non dignissim neque. Ut porta viverra est, ut dignissim elit elementum ut. Nunc vel rhoncus nibh, ut tincidunt turpis. Integer ac enim pellentesque, adipiscing metus id, pharetra odio. Donec bibendum nunc sit amet tortor scelerisque luctus et sit amet mauris. Suspendisse felis sem, condimentum ullamcorper est sit amet, molestie mollis nulla. Etiam lorem orci, consequat ac magna quis, facilisis vehicula neque.
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import myVideo from "@/views/components/video.vue";
import { ref } from "vue"

const pathUrl=ref("https://yuejuanpt.oss-cn-zhangjiakou.aliyuncs.com/%E6%BC%94%E7%A4%BA.pptx")
</script>

<style lang="scss" scoped>
.video-container {
  width: 100%;
  // width: 1200px;
  height: 500px;
}

.ppt{
  width: 100%;
  height:500px;
}

.text {
  width: 100%;
  box-sizing: border-box;
  padding:30px;
  background: $primary-white-color;
}
</style>
