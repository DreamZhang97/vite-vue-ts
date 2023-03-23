<template>
  <section class="app-main">
    <breadcrumb class="breadcrumb-container" />
    <transition name="fade-transform" mode="out-in">
      <div class="public_container">
        <keep-alive>
          <router-view v-if="keepAlive" :key="key" />
        </keep-alive>
        <router-view v-if="!keepAlive" :key="key" />
      </div>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { computed, defineComponent } from "vue";
import { useRoute } from "vue-router";
import Breadcrumb from "@/components/Breadcrumb/index.vue";
const route = useRoute();
const key = computed(() => route.path);
const keepAlive = computed(() => route.meta.keepAlive);
</script>
<style scoped>
.app-main {
  /*50 = navbar  */
  /* padding: 20px; */
  /* min-height: calc(100vh - 50px); */
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: rgb(240, 242, 245);
}
.fixed-header + .app-main {
  padding-top: 50px;
}
</style>

<style lang="scss" >
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
.public_container {
  height: calc(100% - 50px);
  padding: 20px;
  > div {
    height: 100%;
    width: 100%;
  }
}
</style>
