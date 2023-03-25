/*
 * @Description:
 * @Author: ZHang jia hui
 * @Date: 2023-03-25 19:04:22
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-25 19:11:53
 */
export default {
  formItems: [
    {
      label: "行政区域",
      prop: "districtCode",
      type: "input",
      placeholder: "请选择",
      // options: [],
    },
    {
      label: "社会组织代码",
      prop: "organizationCode",
      type: "input",
      placeholder: "请输入",
    },
    {
      label: "企业名称",
      prop: "company",
      type: "input",
      placeholder: "请输入",
    },
    {
      label: "法人代表姓名",
      prop: "legalPersonName",
      type: "input",
      placeholder: "请输入",
    },
    {
      label: "联系电话",
      prop: "phone",
      type: "input",
      placeholder: "请输入",
    },
    {
      label: "年交易量(吨)",
      prop: "tradeSum",
      type: "number",
    },
    {
      label: "年交易额(万元)",
      prop: "tradeMoney",
      type: "number",
    },
    {
      label: "企业地址",
      prop: "address",
      type: "textarea",
      placeholder: "请输入",
      singleRow: true,
    },
  ],
  rules: {
    company: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
    districtCode: [
      { required: true, message: "请选择行政区域", trigger: "blur" },
    ],
    legalPersonName: [
      { required: true, message: "请输入法人代表姓名", trigger: "blur" },
    ],
    product: [{ message: "请输入主营产品", trigger: "blur" }],
    phone: [
      { message: "请输入手机号码", trigger: "blur" },
      {
        pattern:
          /(^(\d{2,3}-)?\d{7,8}$)|^(((13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$))/,
        message: "请输入正确的手机号码",
        trigger: "blur",
      },
    ],
  },
};
