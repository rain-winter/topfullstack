<template>
  <div>
    <avue-crud
      :data="state.data.data"
      :option="option"
      @row-save="createCourse"
      @row-update="updateCourse"
      @row-del="delCourse"
    ></avue-crud>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import axios from "axios";
import request from "../../utils/request.ts";
import $api from "../../api/index.ts";
import { ElMessage } from "element-plus";

const state = reactive({
  data: {},
});
const option = {
  rowKey: "_id",
  index: true,
  title: "课程管理",
  border: true,
  align: "center",
  menuAlign: "center",
  column: [
    {
      label: "课程",
      prop: "name",
    },
    {
      label: "课程封面",
      prop: "cover",
    },
  ],
};
const getCourseList = (): void => {
  axios.get("http://localhost:3000/courses").then((res) => {
    state.data = res.data;
    console.log(res.data);
  });
};
getCourseList();

const createCourse = async (form, done, loading) => {
  console.log(form, done, loading);
  await $api.createCourse(form).then((res) => {
    console.log(res);
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
    console.log(res);
    getCourseList();
    ElMessage({
      message: "删除成功",
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
