<template>
  <el-form
    label-position="left"
    label-width="100px"
    :model="episodesForm"
    style="max-width: 460px"
  >
    <el-form-item label="课时名称">
      <el-input v-model="episodesForm.name" />
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-input />
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input />
    </el-form-item>
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <video v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
  </el-form>
</template>
<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

// 声明数据
let imageUrl = ref('')
let episodesForm = reactive({
  name: '',
  file: '',
})

// 上传的方法
const beforeAvatarUpload = (rowFile) => {
  console.log(rowFile)
}
const handleAvatarSuccess = () => {}
</script>
<style scoped></style>
