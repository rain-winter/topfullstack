<template>
  <h3>课程列表</h3>
  <el-table :data="state.data.data" border stripe>
    <el-table-column v-for="(filed, name) in state.fileds" :prop="name" :key="name" :label="filed.label"></el-table-column>
  </el-table>
</template>
<script lang="ts" setup>
import axios from 'axios';
import { reactive } from 'vue'

let state = reactive({ data: {}, fileds: {} })

state.fileds = {
  _id: { label: 'id' },
  name: { label: '课程名称' },
  cover: { label: '课程封面' }
}
axios.get('http://localhost:3000/courses').then(res => {
  state.data = res.data
})
</script>