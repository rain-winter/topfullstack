<template>
  <h3>{{ isNewView ? "创建" : "编辑" }}课程{{ id }}</h3>

  <el-form
    label-position="left "
    label-width="100px"
    :model="formData"
    style="max-width: 460px"
  >
    <el-form-item label="课程名称">
      <el-input v-model="formData.name" />
    </el-form-item>
    <el-form-item label="课程封面图">
      <el-input v-model="formData.file" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
  
</template>
<script lang="ts" setup>
import { ref, computed, reactive } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();

const id = ref(route.params.id); // 获取路由传递来的id

let isNewView = ref<boolean>(false);
isNewView = computed(() => !id.value); // 没有id就是新页面

const formData = reactive({
  name: "",
  file: "",
});
</script>
