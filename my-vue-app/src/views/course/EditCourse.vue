<template>
  <!-- 添加课程弹出框 -->
  <el-dialog v-model="dialogTableVisible" title="课程" destroy-on-close>
    <el-input v-model="name" placeholder="请输入课程名称" clearable />
    <el-upload
      class="avatar-uploader"
      action="http://localhost:3000/upload"
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
</template>
<script setup>
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { ref } from "vue";
import axios from "axios";

const name = ref("");
const cover = ref(""); // 图片路径

defineProps({
  dialogTableVisible: Boolean,
});

const addCourse = () => {
  axios
    .post("/courses", {
      name: name.value,
      cover: cover.value,
    })
    .then((res) => {
      dialogTableVisible = false;
    });
};

const handleAvatarSuccess = (response, uploadFile) => {
  console.log(uploadFile);
  if (uploadFile.status === "success") {
    cover.value = response.url;
  }
  // imageUrl.value = URL.createObjectURL(uploadFile.raw)
};

const beforeAvatarUpload = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};
</script>

<style>
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
