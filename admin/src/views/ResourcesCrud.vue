<template>
  <div>
    <avue-crud :data="state.data.data" :option="state.option" @row-save="createCourse" @row-update="updateCourse"
      @row-del="delCourse"></avue-crud>  </div>
</template>
<script setup lang="ts">
import { reactive, toRefs, defineProps } from "vue";
import axios from "axios";
import request from "../utils/request";
import $api from "../api/index";
import { ElMessage } from "element-plus";

// 接受 路由传递给页面的参数
const props = defineProps<{
  resource: string
}>()
console.log(props.resource)

interface dataType {
  code: number
  msg: string
  data: unknown
}

const state = reactive({
  data: {},
  option: {},
});
const getCourseList = (): void => {
  axios.get(`http://localhost:3000/${props.resource}`).then((res) => {
    state.data = res.data;
  });
  axios.get(`http://localhost:3000/${props.resource}/options/list`).then((res) => {
    state.option = res.data;
  });
};
getCourseList();

const createCourse = async (form, done, loading) => {
  // await $api.createCourse(form).then(() => {
  //   getCourseList();
  // });
  await request({
    method: "post",
    url: `/${props.resource}`,
    data: form,
  }).then(() => {
    getCourseList();
    ElMessage({
      message: "添加成功",
      type: "success",
    });
  })
  done();
};

const updateCourse = async (form, index, done, loading) => {
  let data = JSON.parse(JSON.stringify(form));
  delete data.$index;
  request({
    method: "patch",
    url: `/${props.resource}/${form._id}`,
    data,
  }).then(() => {
    getCourseList();
    ElMessage({
      message: "修改成功",
      type: "success",
    });
  });
  done();
};

const delCourse = async (form, index) => {
  await request({
    method: "delete",
    url: `/${props.resource}/${form._id}`,
  }).then((res) => {
    console.log(res)
    ElMessage({
      message: "删除成功",
      type: "success",
    });
    getCourseList();
  });
};
</script>
