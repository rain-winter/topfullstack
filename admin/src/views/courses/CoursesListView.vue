<template>
  <h3>课程列表</h3>
  <el-button class="addCourse" type="primary" size="default">添加课程</el-button>

  <el-table :data="state.data.data" border stripe highlight-current-row>
    <el-table-column
      v-for="(filed, name) in fileds"
      :prop="name"
      :key="name"
      :label="filed.label"
    >
    </el-table-column>
    <el-table-column label="操作">
      <template #default="scope">
        <el-button
          type="primary"
          :icon="Edit"
          @click="$router.push(`/courses/edit/${scope.row._id}`)"
        />
        <el-button type="danger" :icon="Delete" @click="removeCourse(scope.row._id)" />
      </template>
    </el-table-column>
  </el-table>
</template>
<script lang="ts" setup>
import axios from "axios";
import { Delete, Edit } from "@element-plus/icons-vue";
import { reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import $api from "../../api";

// 声明data的类型
interface dataType {
  [index: number | string]: number | string;
}

let data: dataType = {};
let state = reactive({
  data,
});

const fileds = {
  _id: { label: "id" },
  name: { label: "课程名称" },
  cover: { label: "课程封面" },
};

const getCourseList = (): void => {
  axios.get("http://localhost:3000/courses").then((res) => {
    state.data = res.data;
  });
};
getCourseList();

const removeCourse = async (_id: string) => {
  ElMessageBox.confirm("你想要删除这门课程吗?", "Warning", {
    confirmButtonText: "OK",
    cancelButtonText: "Cancel",
    type: "warning",
  })
    .then(() => {
      $api.deleteCourse({ _id }).then((res) => {
        getCourseList();
        ElMessage({
          type: "success",
          message: "Delete completed",
        });
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};
</script>
<style scoped>
.addCourse {
  margin-bottom: 20px;
}
</style>
