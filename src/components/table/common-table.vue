<template>
  <div class="table_box" ref="containerRef">
    <el-table
      ref="table"
      :data="tableData"
      style="width: 100%"
      :border="isBorder"
      :stripe="isStripe"
      :height="tableHeight"
      :header-cell-style="
        setHeaderCellStyle || {
          color: '#232323',
          fontWeight: 'bold',
          background: '#FAFAFA',
          textAlign: 'center',
        }
      "
      :row-key="tableRowKey"
      :element-loading-text="
        (tableLoading && tableLoading.desc) || '数据加载中...'
      "
      element-loading-spinner="el-icon-loading"
      :element-loading-background="tableLoading && tableLoading.backgroundStyle"
      :default-expand-all="isTableExpandAll"
      :tree-props="tableTreeProps"
      :highlight-current-row="isRowClick"
      @selection-change="handleSelectionChange"
      @row-click="tableRowClick"
      @current-change="currentChangeHandle"
    >
      <el-table-column
        v-if="tableMultiLine.isMultiSelect"
        type="selection"
        :align="tableIndex.align || 'center'"
        :min-width="tableMultiLine.selectWidth"
      />
      <el-table-column
        v-if="tableIndex.isShowNumber"
        type="index"
        :width="tableIndex.indexWidth"
        :align="tableIndex.align || 'center'"
        :label="tableIndex.label || '序号'"
        :fixed="tableIndex.isFixed"
      >
        <template v-slot="scope">
          {{
            Number(paginationObj.pageNum) === 1
              ? scope.$index + 1
              : Number(paginationObj.pageNum - 1) *
                  Number(paginationObj.pageSize) +
                scope.$index +
                1
          }}
        </template>
      </el-table-column>
      <template v-for="(item, index) in columnList" :key="index + item.prop">
        <el-table-column
          :prop="item.prop"
          :type="item.type ? '' : undefined"
          :label="item.label"
          :min-width="item.width"
          :fixed="item.fixed"
          :align="item.align || 'center'"
          :sortable="item.sortable"
          :show-overflow-tooltip="item.showOverFlowTooltip || false"
        >
          <template v-slot="scope">
            <span v-if="item.slot">
              <slot :name="item.slot" :scope="scope" />
            </span>
            <span v-else>{{
              item.render
                ? item.render(scope.row)
                : scope.row[item.prop] || "---"
            }}</span>
          </template>
        </el-table-column>
      </template>
      <el-table-column
        v-if="tableOperation"
        :key="tableOperation.prop"
        :label="tableOperation.label"
        :min-width="tableOperation.width"
        :fixed="tableOperation.fixed"
        :align="tableOperation.align || 'center'"
        :show-overflow-tooltip="tableOperation.showOverFlowTooltip || false"
      >
        <template #default="scope">
          <el-button
            v-for="item in tableOperation.optionsBtn"
            :key="item.label"
            :size="item.size || 'small'"
            :style="item.color ? `color:${item.color}` : ''"
            :disabled="item.isDisabled ? item.isDisabled(scope.row) : false"
            @click="operationButtonHandle(item.methods, scope.row)"
            >{{ item.label }}</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="paginationObj.isShowPagination"
      :current-page="paginationObj.pageNum"
      :page-sizes="paginationObj.pageSizes || [10, 20, 30, 40]"
      :page-size="paginationObj.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="paginationObj.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { calFontSize } from "@/utils/calSize";
import {
  ref,
  reactive,
  onMounted,
  onBeforeUnmount,
  nextTick,
  defineEmits,
  getCurrentInstance,
  watch,
} from "vue";
import { ElTable } from "element-plus";
import type { ITableColumnType } from "@/types/table";
type ElTableInstance = InstanceType<typeof ElTable>;
// 所有的props
const props = defineProps({
  tableData: {
    default: () => [],
    type: Array,
  },
  columnList: {
    default: () => [],
    type: Array<ITableColumnType>,
  },
  tableLoading: {
    //  加载表格数据
    default: () => {},
    type: Object,
  },
  tableOperation: {
    //   操作项
    default: () => {},
    type: Object,
  },
  isBorder: {
    //边框表格
    default: true,
    type: Boolean,
  },
  isStripe: {
    //斑马线表格
    default: true,
    type: Boolean,
  },
  isTableExpandAll: {
    //   表格为树形结构展开所有行
    default: false,
    type: Boolean,
  },
  paginationObj: {
    default: () => {},
    type: Object,
  },
  tableRowKey: {
    default: "id",
    type: String,
  },
  tableSort: {
    // 默认列排序{prop: 'date', order: 'ascending'}
    default: () => {},
    type: Object,
  },
  tableTreeProps: {
    //   渲染树形结构嵌套数据{children: 'children', hasChildren: 'hasChildren'}
    default: () => {},
    type: Object,
  },
  tableMultiLine: {
    //   表格选择多行数据{selectWidth:'55',isMultiSelect:true}
    default: () => {},
    type: Object,
  },
  tableIndex: {
    //   显示表格序号{indexWidth:'50',isShowNumber:true}
    default: () => {},
    type: Object,
  },
  setHeaderCellStyle: {
    //   头部样式
    default: () => {},
    type: Object,
  },
  isRowClick: {
    default: false,
    type: Boolean,
  },
  //针对 表格 单元格内容特别多的时候
  columnHeight: {
    type: Number,
    default: 48,
  },
});
// 所有的向父组件提交的事件声明
const emits = defineEmits([
  "handleSelectionChange",
  "tableRowClick",
  "currentChangeHandle",
  "handleSizeChange",
  "handleCurrentChange",
  "operationButtonHandle",
]);
//#region
/**
 * @description:选择多行数据时
 * @param {*} val
 * @return {*}
 */
const handleSelectionChange = (val: number) => {
  emits("handleSelectionChange", val);
};
/**
 * @description: 点击某一行
 * @param {*} row
 * @return {*}
 */
const tableRowClick = (row: object) => {
  emits("tableRowClick", row);
};
/**
 * @description: 单选
 * @return {*}
 */
const currentChangeHandle = (val: any) => {
  emits("currentChangeHandle", val);
};
/**
 * @description: 页码变化
 * @param {*} val
 * @return {*}
 */
const handleSizeChange = (val: number) => {
  console.log(`每页 ${val} 条`);
  emits("handleSizeChange", val);
};
/**
 * @description: 当前页变化
 * @param {*} val
 * @return {*}
 */
const handleCurrentChange = (val: number) => {
  console.log(`当前页: ${val}`);
  emits("handleCurrentChange", val);
};
/**
 * @description: 操作按钮处理方法
 * @param {*} fn
 * @param {*} row
 * @return {*}
 */
const operationButtonHandle = (fn: string, row: any) => {
  emits("operationButtonHandle", { fn: fn, row: row });
};
//#endregion

// 当前容器实例
const containerRef: any = ref();
// 初始化 表格高度
const tableHeight = ref(calFontSize(700) + "px");
onMounted(() => {
  // console.log("getCurrentInstance", getCurrentInstance()?.refs.containerRef);
  nextTick(() => {
    handleListenHeight();
  });
  window.addEventListener("resize", handleListenHeight);
});
// 表格高度计算函数
const handleListenHeight = () => {
  let length = props.tableData.length;
  if (length <= 0) {
    tableHeight.value = "130px";
    return;
  } else if (length < 10) {
    const height = 55 + length * props.columnHeight; //头部固定45px + 间隔10 +数据数量*高度（默认48）
    const curr_table_height = containerRef.value.clientHeight; //当前表格容器实际高
    console.log("curr_table_height", curr_table_height);
    if (height < curr_table_height - 20) {
      tableHeight.value = height + "px";
    } else {
      //针对 计算出来的高度 比实际表格高度高（浏览器控制台打开时候）
      tableHeight.value = curr_table_height - 40 + "px";
    }
    return;
  }
  tableHeight.value = calcMaxHeight(80);
};
const calcMaxHeight = (num: number) => {
  let height = containerRef.value.clientHeight;
  return height - (height / 800) * num - 35 + "px";
};

onBeforeUnmount(() => {
  //取消监听事件
  window.removeEventListener("resize", handleListenHeight, false);
});
</script>
<style lang="scss" scoped>
.table_box {
  height: calc(100% - 20px);
  :deep(.el-table) {
    .el-table__fixed-right {
      right: 0 !important;
      height: 100% !important;
    }
    th {
      padding: 15px 0;
    }
    td {
      padding: 8px 0;
    }
    th.el-table__cell > .cell {
      font-size: 14px;
      line-height: inherit;
    }
    td.el-table__cell > .cell {
      font-size: 13px;
      span {
        font-size: 13px;
      }
    }
  }
  .el-pagination {
    margin-top: 20px;
    height: 35px;
    text-align: right;
  }
}
</style>
