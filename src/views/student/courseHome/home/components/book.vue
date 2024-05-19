<template>
    <div class="bigBox">
      <img :src="book.url" alt="">
      <p class="bookName">
          {{ book.title }}
      </p>
      <div class="author">
          <img :src="book.authorAvatar" alt="">
          <span>{{ book.author }}</span>
      </div>
      <div class="rate">
          <el-rate size="small" :model-value="book.rate" disabled allow-half />
      </div>
    </div>
  </template>
  
  <script lang='ts' setup>
  import { ref } from 'vue'
  import { type Book, type BooksList } from "@/types/home";
  const value = ref(1)
  
  defineProps<{
      book:Book
  }>()
  
  </script>
  
  <style lang='scss' scoped>
  .bigBox{
      width: 200px;
      height: 420px;
      background: $primary-white-color;
      padding:10px;
  
      display: flex;
      flex-direction: column;
      border-radius: 5px;
      
  
      img{
          width: 200px;
          height: 300px;
          border-radius:5px;
      }
  
      .bookName{
          height: 50px;
          // background: red;
          // display: flex;
          margin-top: 10px;
      }
  
      .author{
          margin-top: 10px;
          display: flex;
          justify-content: left;
          align-items: center;
  
          img{
              width: 40px;
              height: 40px;
              border-radius: 50%;
          }
  
          span{
              margin-left: 10px;
              font-size:14px;
          }
      }
  
      .rate{
          margin-top:10px;
      }
  }
  </style>