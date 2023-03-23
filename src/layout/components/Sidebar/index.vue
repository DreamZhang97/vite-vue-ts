<!--
 * @Description: 
 * @Author: ZHang jia hui
 * @Date: 2023-03-23 15:02:49
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-23 16:08:15
-->
<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :default-active="activeMenu" :collapse="isCollapse" :background-color="styleObj.menuBg"
        :text-color="styleObj.menuText" :unique-opened="false" :active-text-color="styleObj.menuActiveText"
        :collapse-transition="false" mode="vertical">
        <SidebarItem v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script setup lang="ts">
import SidebarItem from "./SidebarItem.vue";
import { computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { mapGetters } from 'vuex'
const styleObj = reactive({
  menuText: '#bfcbd9',
  menuActiveText: '#409eff',
  subMenuActiveText: '#f4f4f5',
  menuBg: '#304156',
  menuHover: '#263445;',
  subMenuBg: '#1f2d3d',
  subMenuHover: '#001528',
  sideBarWidth: '250px',
})
const router = useRouter();
const routes = computed(() => router.options.routes);

const route = useRoute();
const activeMenu = computed(() => {
  const { meta, path } = route;
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
});


const isCollapse = computed(() => true)
// const isCollapse = computed(() => ...mapGetters["sidebar"].opened);
</script>
