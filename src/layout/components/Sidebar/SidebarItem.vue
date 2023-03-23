<!--
 * @Description: 
 * @Author: ZHang jia hui
 * @Date: 2023-03-23 15:02:49
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-23 16:58:48
-->
<template>
  <div v-if="!item.hidden">
    <template
      v-if="hasOneShowingChild(item.children, item) && (!onlyOneChild.children || onlyOneChild.noShowingChildren) && !item.alwaysShow">
      <AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
          <Item :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </AppLink>
    </template>

    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <div v-if="item.meta">
          {{ item.meta.title }}
        </div>
        <!-- <Item  :icon="item.meta && item.meta.icon" :title="" /> -->
      </template>
      <el-menu-item v-for="child in item.children" :key="child.path" :is-nest="true" :item="child"
        :base-path="resolvePath(child.path)" class="nest-menu" />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import path from "path";
import { isExternal } from "@/utils/isExternal";
// import Item from "./Item.vue";
import AppLink from "./Link.vue";
import { ref, defineProps, reactive } from "vue";

const onlyOneChild: any = ref({});
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
  isNest: {
    type: Boolean,
    default: false,
  },
  basePath: {
    type: String,
    default: "",
  },
});
const hasOneShowingChild = (children = [], parent: object) => {
  const showingChildren = children.filter((item: any) => {
    if (item.hidden) {
      return false;
    } else {
      onlyOneChild.value = item;
      return true;
    }
  });
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: "", noShowingChildren: true };
    return true;
  }

  return false;
};
const resolvePath = (routePath: string) => {
  if (isExternal(routePath)) {
    return routePath;
  }
  if (isExternal(props.basePath)) {
    return props.basePath;
  }
  return path.resolve(props.basePath, routePath);
};
</script>
