<template>
  <div class="head">
    <div class="studyRoute">
      <div class="left">
        <img src="@/assets/image/studyRoute.png" alt="" />
      </div>
      <div class="right">
        <p class="title1">学习路线</p>
        <p class="title2">个性化推荐</p>
      </div>
    </div>
    <div class="questions">
      <div class="left">
        <img src="@/assets/image/questions.png" alt="" />
      </div>
      <div class="right">
        <p class="title1">习题</p>
        <p class="title2">个性化推荐</p>
      </div>
    </div>
  </div>
  <div class="bottom">
    <div class="title">推荐书籍</div>
    <div class="books">
      <BookVue v-for="item in books" :key="item.id" :book="item"></BookVue>
    </div>
  </div>
</template>

<script lang="ts" setup>
// @ts-ignore
import BookVue from "./components/book.vue";
import { type Book, type BooksList } from "@/types/home";
import { reactive } from "vue";

const books: BooksList = reactive<BooksList>([
  {
    id: 1,
    url: "https://huaban.com/pins/4505788537?modalImg=https%3A%2F%2Fgd-hbimg.huaban.com%2F2557b9ffd7fb88d4671d642fa31e0419bd90a9c411cf83-XPCAJN",
    title: "fuleijiashu",
    author: "fulei",
    authorAvatar: "111",
    rate: 3,
  },
  {
    id: 1,
    url: "",
    title: "fuleijiashu",
    author: "fulei",
    authorAvatar: "111",
    rate: 3,
  },
  {
    id: 1,
    url: "",
    title: "fuleijiashu",
    author: "fulei",
    authorAvatar: "111",
    rate: 3,
  },
]);
</script>

<style lang="scss" scoped>
.head {
  display: flex;

  .studyRoute,
  .questions {
    background: $primary-white-color;
    display: flex;
    margin-right: 20px;
    border-radius: 5px;
    // box-shadow: 0 0 2px #ccc;
    width: 320px;
    height: 200px;
    align-items: center;
    justify-content: center;

    img {
      width: 160px;
    }

    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 10px;

      .title1 {
        color: $primary-color;
        font-weight: bold;
        font-size: 24px;
      }

      .title2 {
        color: black;
        font-weight: bold;
        margin-top: 24px;
      }
    }
  }
}

.bottom {
  margin-top: 30px;

  .title {
    color: $primary-color;
    margin-bottom: 20px;
  }

  .books {
    display: grid;
    grid-template-columns: repeat(auto-fill, 220px);
    gap: 20px;
  }
}
</style>
