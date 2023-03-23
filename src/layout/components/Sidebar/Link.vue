<!--
 * @Description: 
 * @Author: ZHang jia hui
 * @Date: 2023-03-23 15:02:49
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-23 16:29:10
-->
<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { isExternal } from "@/utils/isExternal";
import { computed, ref, defineProps } from 'vue'

const props = defineProps({
  to: {
    type: String,
    required: true,
  },
})
const externalFlag = isExternal(props.to)
const type = computed(() => {
  if (externalFlag) {
    return "a";
  }
  return "router-link";
})
const linkProps = (to: any) => {
  if (externalFlag) {
    return {
      href: to,
      target: "_blank",
      rel: "noopener",
    };
  }
  return {
    to: to,
  };
}
</script>
