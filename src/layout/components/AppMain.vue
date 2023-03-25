<!--
 * @Description: 
 * @Author: ZHang jia hui
 * @Date: 2023-03-24 09:36:22
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-24 16:19:27
-->
<template>
  <section class="app-main">
    <!-- 面包屑 -->
    <Breadcrumb class="breadcrumb-container" />

    <router-view v-slot="{ Component }">
      <transition name="fade-transform" mode="out-in">
        <div class="public_container">
          <keep-alive>
            <component v-if="keepAlive" :is="Component" />
          </keep-alive>
          <component v-if="!keepAlive" :is="Component" />
        </div>
      </transition>
    </router-view>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Breadcrumb from "./Navbar/Breadcrumb.vue";

export default defineComponent({
  name: "AppMain",
  computed: {
    // 添加缓存
    keepAlive() {
      return this.$route.meta.keepAlive;
    },
    key() {
      return this.$route.path;
    },
  },
  components: {
    Breadcrumb,
  },
});
</script>

<style lang="scss" scoped>
.app-main {
  position: relative;
  /* 84 = navbar = 50*/
  height: calc(100vh - 50px);
  width: 100%;
  overflow: hidden;
}
</style>
<style lang="scss">
.public_container {
  // Breadcrumb 面包屑高度
  height: calc(100% - 50px);
  padding: 20px;
  background-color: rgb(240, 242, 245);
  > div {
    height: 100%;
    padding: 15px;
    background: #fff;
  }
}
</style>
