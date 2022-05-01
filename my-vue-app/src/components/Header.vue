<template>
  <div class="header">
    <img class="logoImg" src="../assets/logo.png" alt="" />
    <p>四月后台管理系统</p>
    <div class="BreadCrumb">
      <BreadCrumb />
    </div>
    <el-dropdown class="drop-down">
      <span class="el-dropdown-link">
        当前用户: {{ username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="handleLogout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>
<script setup>
import BreadCrumb from './BreadCrumb.vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowDown } from '@element-plus/icons-vue'

const router = useRouter()
let username = ref('')

username = localStorage.getItem('username')

const handleLogout = () => {
  localStorage.clear()
  router.push({
    name: 'login',
  })
}
</script>
<style scoped>
.header {
  display: flex;
  align-items: center;
}
.logoImg {
  width: 40px;
  height: 40px;
  margin-top: 10px;
  border-radius: 50%;
}
p {
  margin-left: 5px;
}
.BreadCrumb {
  margin-left: 20px;
}
.drop-down {
  position: fixed;
  right: 10px;
}
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}
</style>
