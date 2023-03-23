<!--
 * @Description: 
 * @Author: ZHang jia hui
 * @Date: 2023-03-23 15:18:06
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-23 17:32:19
-->
<template>
  <div style="position: relative">
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path" style="color: #fff">
          <span v-if="item.redirect === 'noRedirect' || index == levelList.length - 1" class="no-redirect">{{
            item.meta.title }}</span>
          <a v-else style="color: #000" @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
        </el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
    <el-button v-if="returnBtn" type="primary" class="return_btn" @click="goBack">返回</el-button>
  </div>
</template>

<script lang="ts" setup>
import { compile } from "path-to-regexp";
import { ref, reactive, watch } from "vue";
import {
  RouteLocation,
  RouteLocationMatched,
  RouteMeta,
  useRoute,
  useRouter,
} from "vue-router";

// const levelList = ref<RouteLocationMatched[]>();
const returnBtn = ref(false);
const route = useRoute();
const levelList = ref<RouteLocationMatched[]>();
watch(route, (val) => {
  returnBtn.value = val.meta.backBtn ? !!val.meta.backBtn : false;
  getBreadcrumb();
});
const getBreadcrumb = () => {
  let matched = route.matched.filter((item) => item.meta && item.meta.title);
  levelList.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  );
};

const pathCompile = (path: string) => {
  const { params } = route;
  var toPath = compile(path);
  return toPath(params);
};
const router = useRouter();
const handleLink = (item: RouteLocationMatched) => {
  const { redirect, path } = item;
  if (redirect) {
    router.push(path);
    return;
  }
  router.push(pathCompile(path));
};
const goBack = () => {
  router.back();
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  font-size: 14px;
  line-height: 50px;
  padding: 0px 20px;
  background-color: #fff;

  .no-redirect {
    color: #8d949d;
    cursor: text;
  }
}

.return_btn {
  position: absolute;
  right: 20px;
  top: 25px;
  transform: translate(-50%, -50%);
}
</style>
