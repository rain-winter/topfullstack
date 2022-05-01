<template>
  <el-table :data="state.tableData" style="width: 100%" table-layout="fixed">
    <el-table-column label="用户名">
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
  <!-- 分页 -->
  <el-pagination
    background
    layout="prev, pager, next"
    :total="state.totalPage"
    @current-change="handleCurrentChange"
  />
</template>
<script setup>
import $api from '../../utils/request'

import { Timer } from '@element-plus/icons-vue'
import { reactive } from 'vue'
let state = reactive({
  tableData: [],
  currentPage: 1,
  pageSize: 10,
  totalPage: 0,
})
const getUserList = (currentPage, pageSize) => {
  $api.get('/users', { params: { currentPage, pageSize } }).then((res) => {
    state.tableData = res.data
    state.totalPage = res.total
    console.log(res)
  })
}

const handleEdit = (index, row) => {
  console.log(index, row)
}
const handleDelete = (index, row) => {
  console.log(index, row)
}
const handleCurrentChange = (val) => {
  getUserList(val, state.pageSize) // 获取用户列表
}

getUserList(state.currentPage, state.pageSize) // 获取用户列表
</script>
