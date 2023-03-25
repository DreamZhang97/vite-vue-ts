<!--
 * @Description: 
 * @Author: ZHang jia hui
 * @Date: 2023-03-22 16:05:29
 * @LastEditors: ZHang jia hui
 * @LastEditTime: 2023-03-24 22:01:50
-->
<script setup lang="ts">
import { ref, reactive, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { login } from "@/api/login/user";
import { useStore } from "vuex";
import { Calendar, User, Lock } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";

const loginForm = reactive({
  account: "",
  password: "",
});
const loginFormRef = ref<FormInstance>();

const loginRules = reactive<FormRules>({
  account: [{ required: true, trigger: "blur", message: "请输入用户名" }],
  password: [{ required: true, trigger: "blur", message: "请输入密码" }],
});
const loading = ref(false);

const router = useRouter();
const route = useRoute();

const { dispatch } = useStore();
const handleLogin = async (ref: FormInstance | undefined) => {
  ref?.validate(async (valid) => {
    if (valid) {
      loading.value = true;
      loginForm.password =
        "HOCzObTrdh4ngybzqSzhoLcKMb33NNRbrvhSMydi8klFlOpfBqidIfmnvstus2avzTVZxdcYFcSnHf4kV++EFn+g6A7AlpXyqruziAjCBkXwfgRRpbXwyN/JIuuj5PG4ZBHOu73Jfh9GNOEWUfMJDUJCwTgT9UrnweK0t+LlCho=";
      await dispatch("user/login", loginForm);
      console.log(
        "route.query",
        route,
        "route.query.redirect",
        route.query.redirect
      );
      const redirect: any = route.query && route.query.redirect;
      router.push({ path: redirect || "/main" });
    } else {
      ElMessage.warning("请按照要求输入");
      return false;
    }
  });
};
</script>
<template>
  <div class="login-container">
    <div class="form_container">
      <p>欢迎登录</p>
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
        <el-form-item prop="account">
          <el-input
            v-model="loginForm.account"
            placeholder="请输入账户"
            :prefix-icon="User"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            placeholder="请输入密码"
            auto-complete="on"
            @keyup.enter="handleLogin"
            :prefix-icon="Lock"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        :loading="loading"
        @click="handleLogin(loginFormRef)"
        >点击登录</el-button
      >
    </div>
  </div>
</template>
<style lang="scss" scoped>
$btnBgColor: #1a4a9b;
$inputHeight: 38px;

.login-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("@/assets/images/login/background_img.png") no-repeat;
  background-size: 100% 100%;
}

.form_container {
  width: 320px;
  height: 380px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
  background: #fff;
  border-radius: 10px;

  > p {
    font-size: 30px;
    font-weight: 550;
    font-family: PingFangSC-Regular, PingFang SC;
  }

  .el-form {
    .el-form-item {
      ::v-deep .el-form-item__content {
        line-height: $inputHeight;

        .el-input {
          .el-input__inner {
            height: $inputHeight;
            line-height: $inputHeight;
          }

          .el-input__prefix {
            left: 12px;
            margin-right: 10px;

            i {
              font-size: 16px;
              color: $btnBgColor;
            }
          }
        }
      }
    }
  }

  .el-button {
    padding: 10px;
    letter-spacing: 5px;
    background-color: $btnBgColor;
    font-size: 14px;
  }
}
</style>
