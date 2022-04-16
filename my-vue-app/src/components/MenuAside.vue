<template>
  <!-- 左侧菜单 begin -->
  <el-menu
    @select="handleSelect"
    default-active="1"
    router
    active-text-color="#3498db"
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
        {
          title: '课时管理',
          path: '/episodes/list',
        },
      ],
    },
    {
      title: '运营管理',
      items: [
        {
          title: '用户管理',
          path: '/users/list',
        },
        {
          title: 'test',
          path: '/test',
        },
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
