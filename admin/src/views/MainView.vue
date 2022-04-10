<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <!-- 左侧菜单 begin -->
        <el-menu
          @select="handleSelect"
          :default-active="`1`"
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
      </el-aside>
      <!-- 左侧菜单 end -->
      <!-- 头部 -->
      <el-container>
        <el-header>nestjs-后台管理系统</el-header>
        <el-main>
          <!-- 加在子路由上 -->
          <router-view :key="$route.path" />
        </el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from "vue";
export default defineComponent({
  // 已启用类型推断
  setup() {
    const menu = {
      item: [
        {
          title: "内容管理",
          items: [
            {
              title: "首页",
              path: "/",
            },
            {
              title: "课程管理",
              path: "/courses/list",
            },
            {
              title: "课时管理",
              path: "/elpse/list",
            },
          ],
        },
        {
          title: "运营管理",
          items: [
            {
              title: "首页",
              path: "/",
            },
            {
              title: "用户管理",
              path: "/users/list",
            },
          ],
        },
      ],
    };
    const handleMenuClick = (e: any) => {
      console.log(e);
    };
    const handleSelect = () => {
      console.log("select");
    };
    const menuList = reactive(menu);
    return {
      menuList,
      handleMenuClick,
      handleSelect,
    };
  },
});
</script>
