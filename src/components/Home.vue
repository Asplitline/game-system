<template>
  <div class="home">
    <el-container class="main">
      <el-header class="w">
        <el-menu :default-active="currentIndex" class="home-nav" mode="horizontal" router>
          <el-menu-item class="logo">
            <img src="../assets/logo.png" alt="">
          </el-menu-item>
          <el-menu-item index="/index">主页</el-menu-item>
          <el-menu-item index="/game">游戏中心</el-menu-item>
          <el-menu-item index="/rank">排行榜</el-menu-item>
          <el-menu-item index="/share">游戏论坛</el-menu-item>
          <el-menu-item index="/info">个人中心</el-menu-item>
          <el-submenu index="2" class="user-info">
            <template slot="title">
              <el-avatar size="large" :src="bindURL(currentUser.avatarImgUrl)">
              </el-avatar>
            </template>
            <el-menu-item index="/info"><i class="iconfont icon-user1">个人信息</i>
            </el-menu-item>
            <el-menu-item index="/admin"><i class="iconfont icon-home">前往后台</i>
            </el-menu-item>
            <el-menu-item> <i class="iconfont icon-logout">退出系统</i>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-main>
        <div class="w">
          <router-view></router-view>
        </div>
      </el-main>
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
    ...mapMutations(['setHCurrentIndex']),
    bindURL
  },
  computed: {
    ...mapState({ currentIndex: 'hCurrentIndex', currentUser: 'currentUser' })
  },
  created() {
    this.setHCurrentIndex()
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/variables.less';
.w {
  width: 1200px;
  margin: 0 auto;
}

.el-menu.el-menu--horizontal {
  border-bottom: none;
}

.el-menu--horizontal > .el-menu-item.is-active {
  border-color: @main-green;
}

/deep/.el-submenu__icon-arrow.el-icon-arrow-down {
  display: none;
}

.main {
  display: flex;
  flex-direction: column;
  height: 100vh;
  // header >>>
  .logo {
    img {
      width: 50px;
    }
  }
  .user-info {
    float: right;
  }
  /deep/.el-menu--horizontal > .el-submenu.is-active .el-submenu__title {
    border-bottom: none;
  }
  // header <<<
  // main >>>
  .el-main {
    flex: 1;
    background-color: #f4f5f5;
  }
  // main <<<
  // footer >>>
  .el-footer {
    height: 150px;
  }
  // footer <<<
}
</style>
