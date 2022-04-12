<template>
  <avue-crud
    :data="state.data.data"
    v-model:page="state.page"
    :option="state.option"
    @row-save="createResource"
    @current-change="currentChange"
    @size-change="sizeChange"
    @row-update="updateResource"
    @row-del="delCourse"
  ></avue-crud>
</template>
<script setup lang="ts">
import { reactive, defineProps } from "vue";
import axios from "axios";
import { ElMessage } from "element-plus";

// 接受 路由传递给页面的参数
const props = defineProps<{
  resource: string;
}>();

const state = reactive<any>({
  data: {},
  option: {},
  page: {
    pagerCount: 7,
    currentPage: 1,
    pageSize: 7,
    total: 0,
    layout: "total, prev, pager, next, jumper",
  },
});
const msgsuccess = (msg) => {
  ElMessage({
    message: msg,
    type: "success",
  });
};
const getOptions = () => {
  axios.get(`http://localhost:3000/${props.resource}/options/list`).then((res) => {
    state.option = res.data;
  });
};

// 获取资源列表
const getResourceList = (
  currentPage: number = state.page.currentPage,
  pageSize: number = state.page.pageSize
) => {
  axios
    .get(`http://localhost:3000/${props.resource}`, {
      params: {
        currentPage,
        pageSize,
      },
    })
    .then((res) => {
      state.data = res.data;
      state.page.total = res.data.total;
    });
};
getOptions();
getResourceList();

// 改变 条数
const currentChange = (val) => {
  getResourceList(val, state.page.pageSize);
};

// 改变 页码
const sizeChange = (val) => {
  getResourceList(state.page.currentPage, val);
};

// 添加
const createResource = async (form, done, loading) => {
  await axios.post(`http://localhost:3000/${props.resource}`, form).then((res) => {
    console.log(res);
  });
  getResourceList()
  msgsuccess("添加成功");
  done();
};

// 更新
const updateResource = async (form, index, done, loading) => {
  let data = JSON.parse(JSON.stringify(form));
  delete data.$index;
  await axios
    .patch(`http://localhost:3000/${props.resource}/${form._id}`, data)
    .then((res) => {
      console.log(res);
    });
  msgsuccess("更新成功");
  getResourceList();
  done();
};

// 删除
const delCourse = async (form, index) => {
  await axios
    .delete(`http://localhost:3000/${props.resource}/${form._id}`)
    .then((res) => {
      console.log(res);
    });
  msgsuccess("删除成功");
  getResourceList();
};
</script>
