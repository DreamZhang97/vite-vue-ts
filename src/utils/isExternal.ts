/*
 * @Description:
 * @Author: ZHang jia hui
 * @Date: 2023-03-23 15:43:41
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-23 15:43:51
 */
export function isExternal(path: any) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
