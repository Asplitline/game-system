<template>
  <div class="admin">
    <el-container class="main">
      <!-- 头部 -->
      <el-header class="header">
        <el-menu class="el-menu-demo" mode="horizontal">
          <el-menu-item class="logo"> <img src="../assets/logo.png" alt="">
          </el-menu-item>
          <el-menu-item index="1" class="title">
            <p>游戏推荐系统 - 后台</p>
          </el-menu-item>
          <el-submenu index="2" class="user-info">
            <template slot="title">
              <el-avatar size="large" :src="bindURL(currentUser.avatarImgUrl)">
              </el-avatar>
            </template>
            <el-menu-item index="2-1"><i class="iconfont icon-user1">个人信息</i>
            </el-menu-item>
            <el-menu-item index="2-2" @click=goToIndex()><i
                class="iconfont icon-home">前往主页</i>
            </el-menu-item>
            <el-menu-item @click="logout()"><i class="iconfont icon-logout">退出系统</i>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <!-- 主体内容 -->
      <el-container>
        <el-aside width="240px" class="aside">
          <el-menu :default-active="aCurrentIndex" router active-text-color="#41b883">
            <el-menu-item index="/_user">
              <i class="icon-user1 iconfont"></i>
              <span slot="title">用户管理</span>
            </el-menu-item>
            <el-menu-item index="/_game">
              <i class="icon-game- iconfont"></i>
              <span slot="title">游戏管理</span>
            </el-menu-item>
            <el-menu-item index="/_notice">
              <i class="icon-laba iconfont"></i>
              <span slot="title">公告管理</span>
            </el-menu-item>
            <el-menu-item index="/_category">
              <i class="icon-tags iconfont"></i>
              <span slot="title">分类管理</span>
            </el-menu-item>
            <el-menu-item index="/_post">
              <i class="icon-news_hot iconfont"></i>
              <span slot="title">帖子管理</span>
            </el-menu-item>
            <el-menu-item index="/_comment">
              <i class="icon-comment iconfont"></i>
              <span slot="title">评论管理</span>
            </el-menu-item>
            <el-menu-item index="/_log">
              <i class="icon-task iconfont"></i>
              <span slot="title">日志管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { bindURL } from '@utils'
export default {
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['setACurrentIndex']),
    bindURL,
    goToIndex() {
      this.$router.push('/index')
    },
    logout() {
      sessionStorage.clear()
      this.setACurrentIndex()
      this.$router.push('/login')
    }
  },
  computed: {
    ...mapState(['aCurrentIndex', 'currentUser'])
  },
  created() {
    this.setACurrentIndex()
  }
}
</script>

<style scoped lang="less">
.admin {
  display: flex;
  flex-direction: column;
  height: 100%;
  .header {
    padding: 0;
  }

  .logo {
    padding-right: 0;
    img {
      height: 40px;
    }
  }

  .title > p {
    margin: 0;
    font-size: 22px;
    letter-spacing: 0.1em;
  }

  .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: none;
  }

  .user-info {
    float: right;
    /deep/.el-submenu__title i {
      display: none;
    }
  }

  // i 20 span 18
  .main {
    flex: 1;
    .aside {
      margin-top: 1px;
      ul {
        height: 100%;
      }
      .el-menu-item {
        font-size: 18px;
        letter-spacing: 6px;
        i {
          font-size: 20px;
          margin-right: 4px;
        }
      }
    }
  }

  /deep/.el-submenu.is-active .el-submenu__title {
    border-color: transparent;
  }
}
</style>
