<template>
  <div class="backBox">
    <div class="header">章节任务点</div>
    <div class="mid">
      <div>
        <span class="span1">{{ finishTaskPointNum }}</span>
        <span class="span2">/{{ allTaskPointNum }}个</span>
      </div>
      <div>
        <span class="span1">{{ classRank }}</span>
        <span class="span2">名</span>
      </div>
      <div>
        <el-progress width="80" type="circle" :percentage="finishTaskPointNum/allTaskPointNum*100" />
      </div>
    </div>
    <div class="bottom">
      <div class="title">任务点进度</div>
      <hr />
      <el-table
        :data="tableData"
        :default-sort="{ prop: 'date', order: 'descending' }"
        style="width: 100%; margin-top: 10px"
      >
        <el-table-column prop="name" label="任务点" sortable />
        <el-table-column label="状态">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 1" size="mid" type="success"
              >已完成</el-tag
            >
            <el-tag v-else-if="scope.row.status === 2" size="mid" type="danger"
              >已完成</el-tag
            >
            <el-tag v-else size="mid" type="primary">已完成</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <span style="color: #2f3ced">查看</span>
          </template>
        </el-table-column>
      </el-table>

      <!-- <div class="example-demonstration">When you have few pages</div> -->
      <div style="display: flex;justify-content: right;margin-top:20px;">
        <el-pagination layout="prev, pager, next" :total="50" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { TableColumnCtx } from "element-plus";

interface User {
  status: number;
  name: string;
}

const tableData: User[] = [
  {
    name: "web开发",
    status: 1,
  },
  {
    name: "web开发",
    status: 2,
  },
  {
    name: "web开发",
    status: 3,
  },
];

const props = withDefaults(
  defineProps<{
    allTaskPointNum:number;
    finishTaskPointNum:number;
    classRank:number;
  }>(), // 注意这里不再传入参数
  {
    allTaskPointNum:1,
    finishTaskPointNum:1,
    classRank:1
  }
);
</script>

<style lang="scss" scoped>
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
  
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}

.backBox {
//   height: 520px;
  background-color: $primary-white-color;
  box-sizing: border-box;
  padding: 20px;

  .header {
    color: $primary-color;
    // font-weight: bold;
  }

  .mid {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 30px 0px 20px;
    // min-width: 150px;

    div .span1 {
      font-size: 32px;
    }

    div .span2 {
      font-size: 16px;
      margin-left: 5px;
    }
  }

  .bottom {
    margin-top: 20px;
    .title {
      height: 30px;
      font-size: 14px;
    }
  }
}
</style>
