<template>
  <el-table :data="state.tableData" style="width: 100%" table-layout="fixed">
    <el-table-column type="index" />
    <el-table-column label="用户名">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="课程封面" width="180">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-image class="img" width="80" :src="scope.row.cover" />
        </div>
      </template>
    </el-table-column>
    <el-table-column label="创建时间">
      <template #default="scope">
        {{ scope.row.createdAt }}
      </template>
    </el-table-column>
    <el-table-column label="更新时间">
      <template #default="scope">
        {{ scope.row.updatedAt }}
      </template>
    </el-table-column>

    <el-table-column label="Operations">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import axios from 'axios'

import { Timer } from '@element-plus/icons-vue'
import { reactive } from 'vue'
let state = reactive({
  tableData: [],
})
const getUserList = () => {
  axios.get('/courses').then((res) => {
    state.tableData = res.data.data
    console.log(state.tableData)
  })
}
getUserList()

const handleEdit = (index, row) => {
  console.log(index, row)
}
const handleDelete = (index, row) => {
  console.log(index, row)
}
</script>
<style>
.img {
  width: 80px;
}
</style>
