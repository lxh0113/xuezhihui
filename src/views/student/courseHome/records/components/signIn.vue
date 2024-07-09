<template>
  <div class="backBox">
    <div class="header">
        <span>签到</span>
        <span>详情></span>
    </div>
    <div class="bottom">
        <div class="left">
            <el-progress width="100" type="circle" :percentage="25" />
        </div>
        <div class="right">
            <div class="top">
                <span>18</span>
                <span>/19次</span>
            </div>
            <div class="gray">
                已签
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// withDefaults(
//   defineProps<
    
//   >(), // 注意这里不再传入参数
//   {
   
//   }
// );
</script>

<style lang="scss" scoped>
.backBox{
    height:100%;
    background-color: $primary-white-color;
    box-sizing: border-box;
    padding:20px 30px 20px 30px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;

    .header{
        display: flex;
        font-size: 16px;
        justify-content: space-between;
        color:$primary-gray-text-color;

        span:nth-child(1){
            color:$primary-color;
            font-size:20px;
        }
    }

    .bottom{
        // margin-top:20px;
        flex:1;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .top{
            font-weight: bold;

            span:nth-child(1)
            {
                font-size: 26px;
            }
        }

        .gray{
            color:$primary-gray-text-color;
            margin-top: 20px;
        }
    }
}
</style>
