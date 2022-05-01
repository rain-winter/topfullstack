<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :key="item.path" v-for="(item, index) in breadList">
      <router-link v-if="index == 0" to="/welcome">{{
        item.meta.title
      }}</router-link>
      <span v-else>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  name: 'BreadCrumb',
  computed: {
    breadList() {
      return this.$route.matched
    },
  },
  mounted() {
    console.log(this.$route)
  },
}
// import { useRoute, useRouter } from 'vue-router'

// const route = useRoute()
// const router = useRouter()
// console.log(route)
// console.log(router)
</script>
