<!--
 * @Description: 
 * @Author: ZHang jia hui
 * @Date: 2023-03-09 09:55:47
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-23 17:36:33
-->
<script lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore, mapGetters } from 'vuex';
import { getList } from '@/api/index';
export default {
  setup() {
    const name = ref('小张');
    const router = useRouter();
    const goPage = () => {
      router.push({ path: '/manage' });
    };
    const store = useStore();
    const storeName = computed(() => store.state.username);
    const age = computed(() => store.state.age);
    getList().then((res) => {
      console.log('getList', res);
    });
    return {
      name,
      goPage,
      storeName,
      age,
    };
  },
};
</script>
<template>
  <div>
    <h2>helloWorld::{{ name }}</h2>
    <p>vuex userName {{ storeName }} age{{ age }}</p>
    <p>vuex userName</p>
    <el-button type="primary" @click="goPage">点我跳转</el-button>
  </div>
</template>
