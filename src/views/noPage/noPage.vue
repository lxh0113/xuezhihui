<template>
  <div class="bigBox">
    <img src="../../assets/image/404.svg" alt="">
    <!-- <p>
        您所找到界面不存在……
    </p> -->
  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.bigBox{
    width: 100%;
    height: 100vh;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img{
        height: 500px;
    }

    p{
        color:#3b62f3;
        font-size: 30px;
        margin-top: 20px;
        font-family: "小楷";
    }
}
</style>