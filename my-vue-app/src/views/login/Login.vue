<template>
  <div class="login-wrapper">
    <div class="modal">
      <p class="title">四月后台管理系统</p>
      <el-form ref="ruleFormRef" :model="userdata" status-icon :rules="rules">
        <el-form-item prop="username">
          <el-input
            v-model="userdata.username"
            placeholder="用户名"
            type="text"
            autocomplete="on"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="userdata.password"
            placeholder="密码"
            type="password"
            autocomplete="off"
            show-password
          />
        </el-form-item>

        <el-form-item>
          <el-button
            class="btn-login"
            @click="submitForm(ruleFormRef)"
            type="primary"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

import $api from '../../utils/request'

const router = useRouter()
const ruleFormRef = ref()
const userdata = reactive({
  username: '',
  password: '',
})
// 表单验证
const checkUserName = (rule, value, callback) => {
  if (!value) {
    return callback(new Error('请输入用户名'))
  } else {
    callback()
  }
}
const checkPassword = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    callback()
  }
}
const rules = reactive({
  username: [{ validator: checkUserName, trigger: 'blur' }],
  password: [{ validator: checkPassword, trigger: 'blur' }],
})

// 登录
const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      $api.post('/users/login', userdata).then((res) => {
        // console.log(res)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('username', res.data.username)
        ElMessage({
          message: '登录成功',
          type: 'success',
        })
        router.push({
          name: 'welcome',
        })
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<style scoped>
.login-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* flex-direction: column; */
  background-color: #f9fcff;
}
.modal {
  width: 500px;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 3px #c7c9cbdd;
}
.title {
  font-size: 24px;
  text-align: center;
  line-height: 40px;
}
.btn-login {
  width: 100%;
}
</style>
