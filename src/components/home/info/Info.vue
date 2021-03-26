<template>
  <div class="info">
    <el-row>
      <el-col :span="5" :offset="2">
        <!-- 用户信息 -->
        <el-card class="user-info">
          <img :src="bindURL(currentUser.avatarImgUrl)" alt="" />
          <div class="desc">
            <h4 class="username">{{ currentUser.name }}</h4>
            <p>{{ currentUser.description }}</p>
          </div>
        </el-card>
        <!-- 左侧导航栏 -->
        <el-card class="menu-nav">
          <ul>
            <li @click="setActive(nav.index)" v-for="nav in navItems" :key="nav.index">
              <a href="javascript:;"
                :class="{ active: activeIndex === nav.index }">{{nav.tag}}</a>
            </li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="14" :offset="1">
        <el-card class="content">
          <!-- 用户信息 -->
          <template v-if="activeIndex === 1">
            <iUser :data="currentUser" @submit-user="editUser($event)" />
          </template>
          <!-- 修改密码 -->
          <template v-else-if="activeIndex === 2">
            <iPwd :uid="currentUser.id" @submit-pwd="editPwd($event)" />
          </template>
          <!-- 我的文章 -->
          <template v-else-if="activeIndex === 3">
            <iPost :uid="currentUser.id" :data="postList" @go-to="goTo($event,3)" />
          </template>
          <!-- 我的收藏 -->
          <template v-else-if="activeIndex === 4">
            <iStar :data="starList" :list="miniGameList" @go-to="goTo($event,4)" />
          </template>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 修改信息
// 收藏游戏
// 发帖记录
import { bindURL, convertDeepCopy } from '@utils'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import { _editUser, _changePassword, _getPostByAuthorId } from '@api'
import iUser from './UserInfo'
import iPwd from './ChangePwd'
import iPost from './MyPost'
import iStar from './MyStar'
export default {
  data() {
    return {
      activeIndex: 1,
      navItems: [
        { index: 1, tag: '个人信息' },
        { index: 2, tag: '更改密码' },
        { index: 3, tag: '帖子记录' },
        { index: 4, tag: '我的收藏' }
      ],
      postList: [],
      starList: []
    }
  },
  methods: {
    ...mapMutations(['setCurrentUser']),
    ...mapActions(['fetchAllGame']),
    bindURL,
    // 修改用户
    async editUser(val) {
      const v = convertDeepCopy(val)
      const { success } = await _editUser(v)
      if (success) {
        this.setCurrentUser(v)
        console.log('edit user success')
      } else {
        console.log('edit user error')
      }
    },
    // 修改密码
    async editPwd(val) {
      console.log(val)
      const { success } = await _changePassword(val)
      if (success) {
        this.$message.success('修改成功')
      } else {
        this.$message.error('修改失败')
      }
    },
    setActive(index) {
      this.activeIndex = index
    },
    // 获取文章
    async fetchPost() {
      const { list } = await _getPostByAuthorId({
        keyword: this.currentUser.id
      })
      this.postList = list
    },
    // 获取收藏
    fetchStar() {
      this.starList = this.getStarById(this.currentUser.id)
      console.log(this.starList)
    },
    // 跳转
    goTo(id, flag) {
      if (flag === 3) {
        this.$router.push('/share/' + id)
      } else if (flag === 4) {
        this.$router.push('/game/' + id)
      }
    }
  },
  computed: {
    ...mapState(['currentUser', 'allGame']),
    ...mapGetters(['getStarById', 'getMiniGameList']),
    miniGameList() {
      return this.getMiniGameList()
    }
  },
  components: {
    iUser,
    iPwd,
    iPost,
    iStar
  },
  watch: {
    activeIndex(nVal, oVal) {
      if (nVal === 1) {
        // _
      } else if (nVal === 2) {
        // _
      } else if (nVal === 3) {
        this.fetchPost()
      } else if (nVal === 4) {
        // _
        this.fetchStar()
      } else {
        console.log('info error')
      }
    }
  },
  created() {
    if (this.allGame === null) {
      this.fetchAllGame()
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';
@import '~@css/mixins.less';
.info {
  // 用户信息
  .user-info {
    margin-bottom: 20px;
    /deep/ .el-card__body {
      padding-bottom: 0;
    }
    img {
      display: block;
      width: 180px;
      height: 180px;
      padding: 6px;
      border: 1px solid #ccc;
      box-shadow: 1px 2px 6px 1px rgb(0 0 0 / 0.1);
      margin: 0 auto;
    }
    .desc {
      text-align: center;
      margin: 20px 0;
      h4 {
        font-size: 24px;
        color: #333;
        margin-bottom: 10px;
        text-shadow: 1px 1px 1px rgb(236 216 216);
      }
      p {
        padding: 0 20px;
        text-align: center;
        font-size: 14px;
        margin-bottom: 0;
        min-height: 48px;
        color: #666;
        line-height: 24px;
        .text-ellipsis-s(2);
      }
    }
  }
  // 左侧导航栏
  .menu-nav {
    li {
      a {
        display: inline-block;
        width: 100%;
        height: 32px;
        line-height: 32px;
        letter-spacing: 4px;
        text-align: center;
        color: #2c2c54;
        transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 0.2s;
        border-radius: 4px;
        margin-bottom: 6px;
      }
      a:hover {
        background-color: #e7e7e7;
        color: #2c2c54;
        transform: scale(1.02);
      }
      a.active {
        color: #eff3f5;
        // background-color: #6e6666;
        background-color: @main-green;
      }

      i {
        font-style: normal;
      }
    }
  }
  // 右侧内容
  .content {
    .el-form-item {
      span {
        font-size: 16px;
        letter-spacing: 1px;
        i {
          margin-right: 1px;
        }
      }
    }
  }
  .suggest-detail {
    .content {
      letter-spacing: 2px;
      p {
        line-height: 26px;
        color: #000;
        margin-bottom: 4px;
        span {
          display: block;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 4px 20px;
          box-sizing: border-box;
          color: #666;
        }
        span img {
          vertical-align: top;
        }
      }
      .mark {
        background-color: #f3f3f3;
      }
    }
  }
}
</style>