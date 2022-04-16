<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <MenuAside />
        </el-aside>
        <el-container>
          <el-main> <router-view /></el-main>
          <el-footer>
            <Footer />
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script setup>
import MenuAside from '../components/MenuAside.vue'
import Footer from '../components/Footer.vue'
import Header from '../components/Header.vue'
</script>
<style></style>
