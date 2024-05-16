<template>
  <div class="bigBox">
    <div class="left">
        <div class="square" v-bind:style="{background:color[item.type]}">
            {{ item.name }}
        </div>
        <slot name="mid">
        </slot>
    </div>
    <div class="right">
        <slot name="right"></slot>
    </div>
  </div>
</template>

<script lang='ts' setup>

let color={
    success:'#43cf7c',
    primary:'#2a82e4',
    info:'#c4c9cc'
}

defineProps<{
    item:{
        type:'success'|'primary'|'info',
        name:string
    }
}>()
</script>

<style lang='scss' scoped>
.bigBox{
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // background-color: aqua;


    .left{
        height: 50px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .square{
            height: 50px;
            width: 50px;
            border-radius:5px;
            display: flex;
            justify-content: center;
            align-items: center;
            color:white;
            margin-right: 10px;
        }
    }

    .right{
        font-size: 12px;
        display: flex;
        align-items: flex-end;
    }
}
</style>