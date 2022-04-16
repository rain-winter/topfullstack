<template>
  <el-table :data="state.tableData" style="width: 100%" table-layout="fixed">
    <el-table-column label="用户名" >
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <el-icon><timer /></el-icon>
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
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
  axios.get('/users').then((res) => {
    state.tableData = res.data.data
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
