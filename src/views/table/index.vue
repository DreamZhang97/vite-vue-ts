<script lang="ts" setup>
import commonTable from "@/components/table/common-table.vue";
import commonForm from "@/components/dialog-form/common-form.vue";
import { reactive, ref } from "vue";
import tableConfig from "./module/table-config";
import type { FormRules } from "element-plus";
import formConfig from "./module/form-config";
const tableData = ref<any>([]);
// const tmp = [];
// for (let i = 0; i < 10; i++) {
//   tmp.push({
//     id: i + 1,
//     districtName: `区域${i}`,
//     type: "类型",
//     area: 12 + i * 10,
//   });
// }
// tableData.value = tmp;

const handleCurrentChange = (val: number) => {
  console.log("1111");
};
const handleSizeChange = (val: number) => {
  console.log("222");
};
const operationButtonHandle = () => {
  console.log("换页");
};
const addDialogVisible = ref(false);
const showAddDialog = () => {
  addDialogVisible.value = true;
};

const handleDialogCancel = () => {
  console.log("关闭");
};

const addFormConfig = ref(formConfig);
const addForm = ref({});
</script>
<template>
  <div>
    <div class="top">
      <el-button @click="showAddDialog">新建</el-button>
    </div>
    <div class="table_container">
      <commonTable
        :table-data="tableData"
        :table-loading="tableConfig.tableLoading"
        :column-list="tableConfig.columnList"
        :pagination-obj="tableConfig.paginationObj"
        :table-index="tableConfig.tableIndex"
        :table-multi-line="tableConfig.tableMultiLine"
        :table-tree-props="tableConfig.tableTreeProps"
        :table-operation="tableConfig.tableOperation"
        table-row-key="id"
        @handleCurrentChange="handleCurrentChange"
        @handleSizeChange="handleSizeChange"
        @operationButtonHandle="operationButtonHandle"
      ></commonTable>
    </div>
    <!-- 表单 -->
    <commonForm
      :visible="addDialogVisible"
      label-width="100px"
      :has-upload-photo="true"
      :form="addForm"
      :formItems="addFormConfig.formItems"
      :rules="addFormConfig.rules"
      @handleDialogCancel="handleDialogCancel"
      @handleDialogSubmit="operationButtonHandle"
    />
  </div>
</template>
<style lang="scss" scoped>
.table_container {
}
</style>
