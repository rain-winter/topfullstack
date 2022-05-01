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
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default="scope">
        <el-button type="text" size="small" @click="handleEdit(scope.row)"
          >编辑</el-button
        >

        <el-button type="text" size="small" @click="handleDelete(scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
    class="pagination"
    background
    layout="prev, pager, next"
    :total="state.totalPage"
    @current-change="handleCurrentChange"
  />
</template>

<script setup>
import $api from '../../utils/request'

import { ElMessage, ElMessageBox } from 'element-plus'
import { Timer } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'

const visible = ref(false)
let state = reactive({
  tableData: [],
  currentPage: 1,
  pageSize: 10,
  totalPage: 0,
})

const getUserList = (
  currentPage = state.currentPage,
  pageSize = state.pageSize
) => {
  $api.get('/users', { params: { currentPage, pageSize } }).then((res) => {
    state.tableData = res.data
    state.totalPage = res.total
    console.log(res)
  })
}

const handleEdit = (row) => {
  console.log(row)
}

const handleDelete = (row) => {
  $api.delete(`/users/${row._id}`).then((res) => {
    if (res.data == 1) {
      ElMessage({
        message: `成功删除${row.username}`,
        type: 'success',
      })
      getUserList() // 获取用户列表
    }
  })
}

const handleCurrentChange = (val) => {
  getUserList(val, state.pageSize) // 获取用户列表
}

getUserList() // 获取用户列表
</script>
