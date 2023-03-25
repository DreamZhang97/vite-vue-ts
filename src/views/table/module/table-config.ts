/*
 * @Description:
 * @Author: ZHang jia hui
 * @Date: 2023-02-16 16:29:38
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-25 11:26:58
 */
export default {
  isStripe: true,
  tableLoading: {
    isLoading: false,
  },
  tableData: [],
  tableIndex: {
    indexWidth: "50",
    isShowNumber: false,
    isFixed: false,
  },
  tableTreeProps: { children: "children", hasChildren: "hasChildren" },
  tableMultiLine: {
    selectWidth: 55,
    isMultiSelect: false,
  },
  columnList: [
    {
      label: "统计年份",
      prop: "year",
      width: 80,
      fixed: "left",
    },
    {
      label: "行政区域",
      prop: "districtName",
      width: 120,
    },
    {
      prop: "type",
      label: "养殖资源类型",
      width: 130,
    },
    {
      prop: "area",
      label: "面积",
      width: 100,
    },
    {
      prop: "number",
      label: "产量",
      width: 100,
    },
    {
      prop: "money",
      label: "产值",
      width: 100,
    },
  ],
  paginationObj: {
    isShowPagination: true,
    currentPage: 1,
    pageSize: 10,
    total: 0,
  },
  tableOperation: {
    label: "操作",
    prop: "operation",
    width: 180,
    fixed: "right",
    optionsBtn: [
      {
        label: "编辑",
        type: "text",
        methods: "handleEdit",
        size: "small",
      },
      {
        label: "删除",
        type: "text",
        methods: "handleDelete",
        size: "small",
      },
      {
        label: "查看",
        type: "text",
        methods: "handleView",
        size: "small",
      },
    ],
  },
};
