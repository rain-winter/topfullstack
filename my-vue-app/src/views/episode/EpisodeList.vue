<template>
  <div class="course-wrapper">
    <el-button type="primary">添加课时</el-button>
    
  </div>
</template>
<script setup>
import api from '../../utils/request'
const getEpisodesList = async () => {
  const res = await api.get('/episodes')
  console.log(res)
}
getEpisodesList()
</script>
