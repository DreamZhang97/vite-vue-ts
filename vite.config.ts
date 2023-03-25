/*
 * @Description:
 * @Author: ZHang jia hui
 * @Date: 2023-03-09 09:52:16
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-24 16:56:50
 */
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import path from "path";

export default defineConfig(({ command, mode }) => {
  // console.log("command", command, "mode", mode);
  // const env = loadEnv(mode, ".");
  // console.log("env", env);
  const { VITE_BASE_URL } = loadEnv(mode, ".");
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "/src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/variables.scss";`,
        },
      },
    },
    server: {
      proxy: {
        // 接口地址代理
        "/api": {
          target: VITE_BASE_URL, // 接口的域名
          secure: false,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
