<template>
  <div class="video-wrapper">
    <template v-for="(item, index) in epispdeList">
      <p>{{ item.courseId.name }}</p>

      <!-- <video
        src="../../assets/video1.mp4"
        autoplay="autoplay"
        loop
        muted
        controls
        width="800"
        height="200"
      >
        <source src="../../assets/video1.mp4" type="video/mp4" />
      </video> -->

      <div class="video">
        <img :src="posterSrc" alt="" />
        <video
          id="myVideo"
          :poster="posterSrc"
          width="180"
          controls
          src="../../assets/video1.mp4"
        ></video>
        <canvas ref="myCanvas"></canvas> -->
      </div>
    </template>
  </div>
</template>
<script setup>
import { reactive, ref, nextTick } from 'vue'
import $api from '../../utils/request'

let epispdeList = ref([])
let posterSrc = ref('')

let vimg = '../../assets/video1.mp4'

const getEpisodeList = async () => {
  const res = await $api.get('/episodes')
  epispdeList.value = res.data
  // console.log(res.data)
}

const getPoster = () => {
  let video = document.createElement('video')
  video.setAttribute('src', '../../src/assets/video1.mp4')
  video.setAttribute('width', 400)
  video.setAttribute('height', 240)
  nextTick
  console.log(video)
}

getEpisodeList()
getPoster()
</script>
<style scoped>
img {
  width: 200px;
  height: 160px;
  background-color: #eee;
}
/* .video-wrapper {
  border: 1px solid red;
}
.video {
  width: 160px;
  height: 100px;
  border-radius: 20px;
  background-color: #fff;
  border: 1px solid red;
} */
</style>
