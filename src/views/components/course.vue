<template>
  <div class="courseBox">
    <img :src="course.image" />
    <div class="bottomInfo">
        <h7>{{ course.courseName }}</h7>
        <p>{{ course.createTime }}</p>
        <div class="tag">
            <span class="bottomText">{{ course.userId }}</span>
            <el-tag size="small" type="primary">进行中</el-tag>
            <!-- <el-tag v-else size="small" type="success">已结束</el-tag> -->
        </div>
    <div class="deleteButton">
        <el-button size="16" @click.stop="deleteItem(course)" style="border-radius:0 5px 0px 5px;font-size:16px" :icon="Delete" type="primary" plain></el-button>
    </div>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { type course } from '@/types/home'
import { Delete } from '@element-plus/icons-vue';

const {course}=defineProps<{
    course:course
}>();

const emits = defineEmits<{
  (e: 'delete', item: typeof course): void
}>()


function deleteItem(item: typeof course) {
  emits('delete', item)
}


</script>

<style lang='scss' scoped>
.courseBox{
    height: 280px;
    width: 320px;
    background: $primary-white-color;
    border-radius:10px;
    box-sizing: border-box;
    padding:10px;
    position: relative;

    &:hover .deleteButton{
        display: block;
    }

    .deleteButton{
        position: absolute;
        top:0;
        right:0;
        display: none;
    }

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