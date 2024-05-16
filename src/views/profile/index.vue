<template>
  <div class="bigBox">
    <div class="left">
      <router-view></router-view>
    </div>
    <div class="right">
      <div class="title">
        我的设置
      </div>

      <div class="link">
        <div class="linkItem">
          <router-link active-class="active" to="/student/profile/information">基本信息</router-link>
        </div>
        <div class="linkItem">
          <router-link active-class="active" to="/student/profile/changePassword">修改密码</router-link>
        </div>
        <div class="linkItem">
          <router-link active-class="active" to="/student/profile/verifySchool">学习认证</router-link>
        </div>
        <div class="linkItem">
          <router-link active-class="active" to="/student/profile/byebye">注销账号</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.bigBox{
  display: flex;

  .left{
    flex:1;
    margin-right: 20px;
  }
  
  .right{
    width: 300px;
    margin-right:20px;
    background-color: $primary-white-color;
    height: 500px;
    box-sizing: border-box;
    padding:20px;

    .title{
      font-size: 18px;
    }
  }

  .link{
    margin-top:40px;

    a{
      text-decoration: none;
      color:black;
    }

    .linkItem{
      height: 60px;
    }

    .active{
      color:$primary-color;
    }
  }
}
</style>
