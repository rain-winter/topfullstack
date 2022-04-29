<template>
  <el-button type="primary" @click="dialogTableVisible = true"
    >添加课程</el-button
  >

  <!-- 添加课程弹出框 -->
  <!-- 记得改后台的地址 -->
  <el-dialog v-model="dialogTableVisible" title="课程" destroy-on-close>
    <el-input v-model="name" placeholder="请输入课程名称" clearable />
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
    <el-table-column label="用户名">
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
import { ElMessage } from 'element-plus'
import { Timer, Plus } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
let state = reactive({
  tableData: [],
})
const name = ref('')
const cover = ref('') // 图片路径
let dialogTableVisible = ref(false) // 添加弹出框

const getCourseList = () => {
  // 获取
  axios.get('/courses').then((res) => {
    console.log(res.data.data)
    res.data.data.map((item) => {
      item.cover = `http://localhost:3009/${item.cover}`
    })
    state.tableData = res.data.data
  })
}
getCourseList()

const addCourse = async () => {
  await axios
    .post('/courses', {
      name: name.value,
      cover: cover.value,
    })
    .then((res) => {})
  dialogTableVisible.value = false
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
  // if (rawFile.type !== "image/jpeg") {
  //   ElMessage.error("Avatar picture must be JPG format!");
  //   return false;
  // } else if (rawFile.size / 1024 / 1024 > 2) {
  //   ElMessage.error("Avatar picture size can not exceed 2MB!");
  //   return false;
  // }
  return true
}

const handleEdit = (index, row) => {
  // 编辑
  console.log(index, row)
}
const handleDelete = (index, row) => {
  // 添加
  console.log(index, row)
}
</script>
<style>
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
</style>
