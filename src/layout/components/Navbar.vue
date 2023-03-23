<template>
  <div class="navbar">
    <hamburger style="color: #fff" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-tooltip class="item" effect="dark" :content="userName" placement="bottom">
            <img src="../../assets/images/layout/profile.jpg" class="user-avatar" />
            <i class="el-icon-caret-bottom" />
          </el-tooltip>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item>首页</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { mapGetters, useStore } from "vuex";
import Hamburger from "@/components/Hamburger/index.vue";
import { computed, ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
const store = useStore();
const userName = store.state.user.name;

const sidebar = reactive({
  opened: false,
})
// computed(()=>...mapGetters(["sidebar"])

const toggleSideBar = () => {
  sidebar.opened = false
  // store.dispatch("app/toggleSideBar");
}
const router = useRouter();
const route = useRoute()
const logout = async () => {
  await store.dispatch("user/logout");
  router.push(`/login?redirect=${route.fullPath}`);
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: rgb(48, 65, 86);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
    color: #fff;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          transition: all 0.5s;

          &:hover {
            transform: scale(0.9) translateX(-5px);
          }
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
