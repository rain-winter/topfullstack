<template>
  <div>
    <avue-crud :data="state.data.data" :option="state.option" @row-save="createCourse" @row-update="updateCourse"
      @row-del="delCourse"></avue-crud>  </div>
</template>
<script setup lang="ts">
import { reactive, toRefs, defineProps } from "vue";
import axios from "axios";
import request from "../../utils/request";
import $api from "../../api/index";
import { ElMessage } from "element-plus";

// 接受 路由传递给页面的参数
const props = defineProps<{
  resource: string
}>()
const resource = toRefs(props.resource)
console.log(resource)

const state = reactive({
  data: {},
  option: {},
});
const getCourseList = (): void => {
  axios.get(`http://localhost:3000/${props.resource}`).then((res) => {
    state.data = res.data;
  });
  axios.get(`http://localhost:3000/courses/options/list`).then((res) => {
    state.option = res.data;
  });
};
getCourseList();

const createCourse = async (form, done, loading) => {
  console.log(form, done, loading);
  await $api.createCourse(form).then(() => {
    getCourseList();
  });
  done();
};

const updateCourse = async (form, index, done, loading) => {
  let data = JSON.parse(JSON.stringify(form));
  delete data.$index;
  request({
    method: "patch",
    url: `/courses/${form._id}`,
    data,
  }).then((res) => {
    getCourseList();
    ElMessage({
      message: "修改成功",
      type: "success",
    });
  });
  done();
};

const delCourse = (form, index) => {
  request({
    method: "delete",
    url: `/courses/${form._id}`,
  }).then((res) => {
    getCourseList();
    ElMessage({
      message: "更新成功",
      type: "success",
    });
  });
};
</script>
