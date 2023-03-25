/*
 * @Description:
 * @Author: ZHang jia hui
 * @Date: 2023-03-24 18:26:19
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-24 19:04:31
 */
/**
 * @Author: ZHang jia hui
 * @description: 可以用于echarts 等一些需要根据页面分辨率等比例扩大缩小函数
 * @return {*} 适配的值
 * @param {*} fontSize 基准值，例如fontSize
 */
export function calFontSize(fontSize: number) {
  let clientWidth =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
  if (!clientWidth) return;
  return Math.round((clientWidth / 1920) * fontSize);
}
