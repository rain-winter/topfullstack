<template>
  <!-- 左侧菜单 begin -->
  <el-menu
    @select="handleSelect"
    default-active="1"
    router
    active-text-color="#3498db"
    background-color="#2c3e50"
    text-color="#ffffff"
    class="el-menu"
  >
    <el-sub-menu
      v-for="(item, index) in menuList.item"
      :key="`menu-${index}`"
      :index="`menu-${index}`"
    >
      <template #title>
        <span>{{ item.title }}</span>
      </template>
      <el-menu-item
        v-for="(subItem, subIndex) in item.items"
        :key="`menu-item-${index}-${subIndex}`"
        :index="subItem.path"
        @click="handleMenuClick(subItem)"
        >{{ subItem.title }}</el-menu-item
      >
    </el-sub-menu>
  </el-menu>
</template>
<script setup>
import { reactive } from 'vue'
let menu = {
  item: [
    {
      title: '内容管理',
      items: [
        {
          title: '首页',
          path: '/',
        },
        {
          title: '课程管理',
          path: '/courses/list',
        },
        // { // 以后在做
        //   title: '课时管理',
        //   path: '/episodes/list',
        // },
      ],
    },
    {
      title: '运营管理',
      items: [
        {
          title: '用户管理',
          path: '/users/list',
        },
        // { 此路由已删除
        //   title: 'test',
        //   path: '/test',
        // },
      ],
    },
  ],
}
const menuList = reactive(menu)
const handleMenuClick = (e) => {
  console.log(e)
}
const handleSelect = () => {
  console.log('select')
}
</script>
<style scoped>
.el-menu {
  height: calc(100vh - 60px);
}
</style>
