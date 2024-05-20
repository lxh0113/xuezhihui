<template>
  <div class="backBox">
    <div class="head">
      <div class="leftSetting">
        <el-table :model="form" label-width="auto">
          <el-form-item label="试卷名称">
            <el-input v-model="form.name" />
          </el-form-item>
          <el-form-item label="题目编号">
            <el-radio-group v-model="form.choose">
              <el-radio value="1">连续编号</el-radio>
              <el-radio value="2">按题型编号</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-table>
      </div>
      <div class="png"></div>
    </div>
    <div class="bottom">
      <div class="left"></div>
      <div class="right">
        <div class="choose"></div>
        <div class="questionsDetails"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref,reactive } from 'vue'

const form=reactive({
    name:'',
    choose:'1'
})
</script>

<style lang="scss" scoped>
.backBox {
  margin-right: 20px;
  min-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;

  .head {
    background: $primary-white-color;
    border-radius: 5px;
    height: 200px;
  }
}
</style>
