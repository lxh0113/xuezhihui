<template>
  <div class="backBox">
    <div class="header">
      <div class="title">试卷管理</div>
      <div class="button">
        <el-button @click="dialogFormVisible = true" type="primary" :icon="Plus"
          >组卷</el-button
        >
      </div>
    </div>
    <hr />
    <div class="choose">
      <!-- <el-button style="font-size:16px;margin-right:20px;" type="primary" :icon="Upload" text="primary">上传</el-button> -->
      <el-input
        style="width: 200px"
        placeholder="请输入关键词"
        :prefix-icon="Search"
      />
      <el-date-picker
        style="margin-left: 30px"
        v-model="start"
        type="datetime"
        placeholder="开始时间"
        :default-time="defaultTime"
      />

      <el-date-picker
        style="margin-left: 30px"
        v-model="end"
        type="datetime"
        placeholder="开始时间"
        :default-time="defaultTime"
      />
      <!-- <el-date></el-date> -->

      <el-select style="width: 200px; margin-left: 30px"> </el-select>
    </div>
    <!-- <hr /> -->
    <el-table
      :data="tableData"
      :default-sort="{ prop: 'date', order: 'descending' }"
      style="width: 100%; margin-top: 20px"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="试卷名称" prop="name" sortable />
      <el-table-column prop="questionsBank" label="题库" />
      <el-table-column prop="builder" label="创建人" />

      <el-table-column prop="questionsNumber" label="题量" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" text="primary">发布考试</el-button>
          <el-button type="primary" text="primary">查看</el-button>
          <el-button type="primary" text="primary">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>

  <el-dialog v-model="dialogFormVisible" title="新建试卷" width="500">
    <el-form :model="form">
      <el-form-item label="试卷名称" label-width="80">
        <el-input v-model="form.name" autocomplete="off" />
      </el-form-item>
      <el-form-item label="题库选择" label-width="80">
        <el-select-v2
          v-model="value"
          :options="options"
          multiple
          clearable
          collapse-tags
          placeholder="选择题库"
          popper-class="custom-header"
          :max-collapse-tags="1"
        >
          <template #header>
            <el-checkbox
              v-model="checkAll"
              :indeterminate="indeterminate"
              @change="handleCheckAll"
            >
              所有
            </el-checkbox>
          </template>
        </el-select-v2>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="addNewPaper">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Plus, Delete, Search } from "@element-plus/icons-vue";
import { ref, reactive,watch } from "vue";
import type { CheckboxValueType } from 'element-plus'
import { useRouter } from "vue-router";
const input = ref("");

const start = ref("");
const end = ref("");
const defaultTime = new Date(2000, 1, 1, 12, 0, 0);
const dialogFormVisible = ref(false);
const router=useRouter()


import type { TableColumnCtx } from "element-plus";

interface Paper {
  name: string;
  questionsBank: string;
  builder: string;
  questionsNumber: number;
  date: string;
}

const tableData: Paper[] = [
  {
    name: "哇卡卡卡",
    questionsBank: "1222",
    builder: "lzy",
    date: "2024-12-2",
    questionsNumber: 12,
  },
];

const form = reactive({
  name: "",
  region: "",
  date1: "",
  date2: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});

const initials = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
const checkAll = ref(false)
const indeterminate = ref(false)
const value = ref<CheckboxValueType[]>([])
const options = ref(
  Array.from({ length: 1000 }).map((_, idx) => ({
    value: `Option ${idx + 1}`,
    label: `${initials[idx % 10]}${idx}`,
  }))
)

watch(value, (val) => {
  if (val.length === 0) {
    checkAll.value = false
    indeterminate.value = false
  } else if (val.length === options.value.length) {
    checkAll.value = true
    indeterminate.value = false
  } else {
    indeterminate.value = true
  }
})

const handleCheckAll = (val: CheckboxValueType) => {
  indeterminate.value = false
  if (val) {
    value.value = options.value.map((_) => _.value)
  } else {
    value.value = []
  }
}

const addNewPaper=()=>{
  dialogFormVisible.value = false

  router.push('/teacher/paper/1')
}
</script>

<style lang="scss" scoped>
.backBox {
  background: $primary-white-color;
  margin-right: 20px;
  height: calc(100vh - 120px);
  box-sizing: border-box;
  padding: 20px;

  .header {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 18px;
      // color: $primary-color;
    }
  }

  .choose {
    margin-top: 20px;
    display: flex;
  }
}
</style>
