<template>
  <span style="display: flex; margin-bottom: 20px">
    <el-button type="primary" @click="dialogTableVisible = true"
      >添加课程</el-button
    >
    <div class="search">
      <el-input
        v-model="key"
        clearable
        @clear="handleClear"
        placeholder="请输入关键字"
      />
      <el-button type="success" @click="handleSearch">搜索课程</el-button>
    </div>
  </span>
  <!-- 添加课程弹出框 -->
  <!-- 记得改后台的地址 -->
  <el-dialog v-model="dialogTableVisible" title="课程" destroy-on-close>
    <el-input v-model="name" placeholder="请输入课程名称" clearable />
    <el-input
      class="partition"
      v-model="partition"
      placeholder="请输入课程的分区"
      clearable
    />
    <el-upload
      class="avatar-uploader"
      action="http://localhost:3009/upload"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="cover" :src="cover" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon">
        <Plus />
      </el-icon>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取消</el-button>
        <el-button type="primary" @click="addCourse">确定</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 表格 -->
  <el-table :data="state.tableData" style="width: 100%" table-layout="fixed">
    <el-table-column type="index" />
    <el-table-column show-overflow-tooltip label="课程名">
      <template #default="scope">
        <div style="display: flex; align-items: center">
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
    <el-table-column show-overflow-tooltip label="分区">
      <template #default="scope">
        <div style="display: flex; align-items: center">
          <span style="margin-left: 10px">{{ scope.row.partition }}</span>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="创建时间">
      <template #default="scope">
        <el-icon>
          <timer />
        </el-icon>
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
        <el-button size="small" @click="EditCourse('update', scope.row)"
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
  <!-- 需要绑定 page-size 和 total-->
  <el-pagination
    class="pagination"
    background
    layout="prev, pager, next"
    :page-size="state.pageSize"
    :total="state.totalPage"
    @current-change="handleCurrentChange"
  />
</template>
<script setup>
import $api from '../../utils/request'
import { ElMessage } from 'element-plus'
import { Timer, Plus } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
let state = reactive({
  tableData: [],
  currentPage: 1,
  pageSize: 4,
  totalPage: 0,
})
let name = ref('')
let cover = ref('') // 图片路径
let partition = ref('')
let key = ref('') // 关键字搜索
let dialogTableVisible = ref(false) // 添加弹出框

const getCourseList = (
  currentPage = state.currentPage,
  pageSize = state.pageSize
) => {
  // 获取
  $api.get('/courses', { params: { currentPage, pageSize } }).then((res) => {
    console.log(res)
    res.data.map((item) => {
      item.cover = `http://localhost:3009/${item.cover}`
    })
    state.tableData = res.data
    state.totalPage = res.total
  })
}

const handleCurrentChange = (val) => {
  getCourseList(val, state.pageSize) // 获取用户列表
}

const handleSearch = () => {
  console.log(key.value)
  $api.get('/courses/search', { params: { key: key.value } }).then((res) => {
    if (res) {
      res.data.map((item) => {
        item.cover = item.cover = `http://localhost:3009/${item.cover}`
      })
      state.tableData = res.data
    }
  })
}
const handleClear = () => {
  getCourseList()
}

const addCourse = async () => {
  $api
    .post('/courses', {
      name: name.value,
      cover: cover.value,
      partition: partition.value,
    })
    .then((res) => {
      dialogTableVisible.value = false
    })

  // dialogTableVisible.value = true
  // const id = row._id
  // cover.value = row.cover
  // name.value = row.value
  // partition.value = row.value
  // console.log('cover.value', cover)
  // console.log('name.value', name.value)
  // console.log('partition.value', partition.value)
  // console.log(row.name)
  // console.log(row.cover)
  // console.log(row.partition)
  // return
  // $api
  //   .patch(`/courses/${id}`, {
  //     param: {
  //       cover: cover.value,
  //       name: name.value,
  //       partition: partition.value,
  //     },
  //   })
  //   .then((res) => {
  //     console.log(res)
  //   })

  getCourseList()
}

const handleAvatarSuccess = (response, uploadFile) => {
  console.log('uploadFile', uploadFile)
  if (uploadFile.status === 'success') {
    cover.value = response.url
  }
  // imageUrl.value = URL.createObjectURL(uploadFile.raw)
}

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== 'image/jpeg') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
}

const handleEdit = (index, row) => {
  // 编辑
  // partition.value = row.partition
  // cover.value = row.cover
  // name.value = row.name
  // dialogTableVisible.value = true
}
const handleDelete = (index, row) => {
  // 删除
  const id = row._id
  console.log(id)
  $api.delete(`courses/${id}`).then((res) => {
    ElMessage.success(`删除了一条数据`)
  })
}

getCourseList()
</script>
<style>
.search {
  width: 200px;
  margin-left: 50px;
  display: flex;
}
.search input {
  width: 150px;
  margin-right: 10px;
}
.img {
  width: 80px;
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.avatar-uploader .el-upload {
  margin-top: 20px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.partition {
  margin-top: 20px;
}
</style>
