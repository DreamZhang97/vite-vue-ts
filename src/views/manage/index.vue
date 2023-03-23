<!--
 * @Description: 
 * @Author: ZHang jia hui
 * @Date: 2023-03-09 09:58:06
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-22 16:14:27
-->
<script lang="ts">
import ManageItem from "./manage-item/index.vue";
import { reactive, Component } from "vue";
export default {
  components: {
    ManageItem,
  },
  setup() {
    const person = reactive({
      name: "",
      age: "23",
    });
    const List = reactive([1, 2, 3]);
    const changeName = () => {
      person.name = "哈哈哈哈";
      List.push(4);
    };
    return {
      person,
      List,
      changeName,
    };
  },
};
</script>
<template>
  <div>
    <h2>管理界面</h2>
    <!--  ?? 运算符针对null类型为空时，指定一个默认值 -->
    <p>姓名：{{ person.name ?? "99999" }}</p>
    <p>年龄：{{ person.age }}</p>
    <p>List:{{ List }}</p>
    <button @click="changeName">更改姓名</button>
    <h3>子组件👇</h3>
    <ManageItem :msg="person.name" :list="List"></ManageItem>
  </div>
</template>
