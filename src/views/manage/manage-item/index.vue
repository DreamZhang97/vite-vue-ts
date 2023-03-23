<!--
 * @Description: 
 * @Author: ZHang jia hui
 * @Date: 2023-03-09 10:56:52
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-20 11:07:06
-->
<script lang="ts">
import { ref, readonly } from 'vue';
export default {
  name: 'manage-item',
  props: {
    msg: {
      type: String,
      default: '',
    },
    list: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    console.log('props', props, 'props', props.msg);
    const my_msg = ref(props.msg);

    const changeMsg = () => {
      my_msg.value = '更改更改';
    };
    return {
      my_msg,
      changeMsg,
    };
  },
};
</script>
<!--<script setup>
/**
 * 若 统一在setUp里面书写的话，接受参数 需要引入defineProps
 */
import { defineProps, readonly, ref } from 'vue'
const props = defineProps({
  msg: {
    type: String,
    default: ''
  }
})
const _msg = ref(readonly(props.msg))
const changeMsg = () => {
  _msg.value = '更改更改'
}
</script>
-->
<template>
  <h3>manage-item</h3>
  <!-- <p>使用setup 收到的值：{{props.msg}}</p> -->
  <p>使用 props 收到的值 {{ msg }}</p>
  <p>子组件收到的List{{ list }}</p>
  <p>本组件的：{{ my_msg }}</p>
  <el-button type="primary" @click="changeMsg">更改msg</el-button>
</template>
