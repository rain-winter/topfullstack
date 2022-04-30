<template>
  <div class="video-wrapper">
    <template v-for="(item, index) in epispdeList">
      <p>{{ item.courseId.name }}</p>

      <div class="video">
        <img class="videoImg" :src="posterSrc" alt="" />
      </div>
      {{ item.name }}
    </template>
  </div>
</template>
<script setup>
import { reactive, ref, nextTick } from 'vue'
import $api from '../../utils/request'

let epispdeList = ref([])
let posterSrc = ref('')

const getEpisodeList = async () => {
  const res = await $api.get('/episodes')
  epispdeList.value = res.data
}

const getPoster = () => {
  let dataURL = ''
  let video = document.createElement('video')
  video.setAttribute('crossOrigin', 'anonymous') //处理跨域
  video.setAttribute('src', ' http://localhost:3009/uploads/video1.mp4')
  video.currentTime = 1
  video.addEventListener('loadeddata', () => {
    let canvas = document.createElement('canvas')
    canvas.width = 909
    canvas.height = 1920
    canvas.getContext('2d').drawImage(video, 0, 0, 909, 1920) //绘制canvas
    dataURL = canvas.toDataURL('image/jpeg') //转换为base64
    posterSrc.value = dataURL
  })
}

getEpisodeList()
getPoster()
</script>
<style scoped>
.videoImg {
  width: 200px;
}
</style>
