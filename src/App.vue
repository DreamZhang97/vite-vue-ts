<!--
 * @Description: 
 * @Author: ZHang jia hui
 * @Date: 2023-03-09 09:52:16
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-24 21:52:16
-->
<script setup lang="ts">
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
const locale = zhCn;
</script>
<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
