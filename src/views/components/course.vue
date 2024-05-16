<template>
  <div class="bigBox">
    <img :src="course.url" />
    <div class="bottomInfo">
        <h7>{{ course.course }}</h7>
        <p>{{ course.school }}</p>
        <div class="tag">
            <span class="bottomText">{{ course.object }}</span>
            <el-tag v-if="course.status===1" size="small" type="primary">进行中</el-tag>
            <el-tag v-else size="small" type="success">已结束</el-tag>
        </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { type course } from '@/types/home'

const {course}=defineProps<{
    course:course
}>();


</script>

<style lang='scss' scoped>
.bigBox{
    height: 280px;
    width: 320px;
    background: $primary-white-color;
    border-radius:10px;
    box-sizing: border-box;
    padding:10px;

    img{
        width: 300px;
        height: 180px;
        border-radius: 10px;
    }

    .bottomInfo{
        font-size: 14px;
        width: 300px;

        h7{
            font-weight: bold;
        }

        p{
            color:$primary-gray-color;
        }

        .tag{
            display: flex;
            width: 300px;
            justify-content: space-between;
            align-items: center;
        }

        .bottomText{
            color:$primary-gray-text-color;
        }
    }
}
</style>