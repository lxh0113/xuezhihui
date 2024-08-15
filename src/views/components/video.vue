<template>
  <div style="height:600px;min-height:600px">
    <video crossOrigin="anonymous" id="my-player" ref="videoRef" :src="src" class="video-js w-full h-full">
      <source :src="src" />
      <track default kind="captions" srclang='zh' label='Chinese' :src="currentTrackUrl" />
    </video>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties, onMounted, ref } from "vue";
import videojs from "video.js";
// import type { VideoJsPlayerOptions } from "video.js";
import "video.js/dist/video-js.min.css";
type MyVideoProps = {
  /** 视频地址 */
  src: string;
  width?: string;
  height?: string;
  startTime?: number;
  trackUrl?: string;
};
const props = withDefaults(defineProps<MyVideoProps>(), {
  startTime: 0
});
// video标签
const videoRef = ref<HTMLElement | null>(null);
// video实例对象
let videoPlayer: typeof videojs.players | null = null;
const videoWrapStyles = computed<CSSProperties>(() => {
  return {
    width: props.width || "100%",
    height: props.height || "100%",

  };
});
// 初始化videojs
const initVideo = () => {
  // https://gitcode.gitcode.host/docs-cn/video.js-docs-cn/docs/guides/options.html
  const options: any = {
    language: "zh-CN", // 设置语言
    controls: true, // 是否显示控制条
    preload: "false", // 预加载
    autoplay: true, // 是否自动播放
    fluid: false, // 自适应宽高
    src: props.src, // 要嵌入的视频源的源 URL
    playbackRates: [0.5, 1.0, 1.5, 2.0]
  };
  if (videoRef.value) {
    // 创建 video 实例
    videoPlayer = videojs(videoRef.value, options, onPlayerReady)
  }
};

watch(() => props.startTime, (newValue) => {
  console.log(newValue)
  videoRef.value.currentTime = newValue
})

const currentTrackUrl=ref('')

watch(()=>props.trackUrl,(newValue)=>{
  // if(newValue!==null)
  console.log(newValue)
  currentTrackUrl.value=newValue
},{
  immediate:true
})

// video初始化完成的回调函数
const onPlayerReady = () => { };
onMounted(() => {
  initVideo();

  console.log(props.trackUrl)
});
</script>

<style lang="scss" scoped>
.w-full {
  width: 100%;
}

.h-full {
  height: 100%;
}
</style>
