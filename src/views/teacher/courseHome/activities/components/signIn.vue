<template>
  <div class="signInBox">
    
    <div class="header">
      <router-link :to="toSign('intelligent')" active-class="active">智能考勤</router-link>
      <router-link :to="toSign('ordinary')" active-class="active">普通签到</router-link>
      <router-link :to="toSign('gesture')" active-class="active">手势签到</router-link>
      <!-- <router-link :to="toSign('erCode')" active-class="active">二维码签到</router-link> -->
      <router-link :to="toSign('number')" active-class="active">签到码签到</router-link>
    </div>
    <div class="bottom">
      <router-view></router-view>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import type { TabsPaneContext } from "element-plus";
import { onMounted } from "vue";
import { setTimeout } from "timers";
import {useRouter,useRoute} from "vue-router"

const router=useRouter()
const route=useRoute()

const activeName = ref("first");
const value = ref(true);

const ordinaryForm = ref({
  photo: true,
});

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
  console.log(tab.props.name);

  // newLocker()
};

const container = ref();
watch(container,(newValue)=>{
  console.log(container.value.clientHeight)
})

const newLocker = () => {
  // 新建一个解锁器
};

const toSign=(type:string)=>{
  return '/course/'+route.params.id+'/activities/signIn/'+type
}

onMounted(() => {});
</script>

<style scoped lang="scss">

a{
  color:$primary-gray-text-color;
  text-decoration: none;
  padding:20px;
  font-size: 16px;

}

.active{
  color:$primary-color;
  font-weight: bold;
}

.signInBox{
  display: flex;
  flex-direction: column;
}

</style>
