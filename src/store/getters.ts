/*
 * @Description:
 * @Author: ZHang jia hui
 * @Date: 2023-03-23 13:21:21
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-23 14:12:21
 */
const getters = {
  name: (state: any) => state.user.name,
  userId: (state: any) => state.user.userId,
  token: (state: any) => state.user.token,
};
export default getters;
