/*
 * @Description:
 * @Author: ZHang jia hui
 * @Date: 2023-03-23 14:09:02
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-23 14:09:26
 */
const TokenKey = "my-token";

const isLogin = () => {
  return !!localStorage.getItem(TokenKey);
};
const getToken = () => {
  return localStorage.getItem(TokenKey);
};
const setToken = (token: string) => {
  localStorage.setItem(TokenKey, token);
};
const clearToken = () => {
  localStorage.removeItem(TokenKey);
};
export { isLogin, getToken, setToken, clearToken };
