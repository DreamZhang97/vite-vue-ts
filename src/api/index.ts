/*
 * @Description:
 * @Author: ZHang jia hui
 * @Date: 2023-03-20 15:24:06
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-23 13:59:34
 */
import request from "../service";

export function getList() {
  return request({
    url: "/agro-brain-cms/api/sysDictionary/list",
    method: "get",
    params: { type: "service_income_type" },
  });
}
