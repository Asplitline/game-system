<template>
  <div class="game">
    <div class="g-search">
      <p class="g-search-wrap">
        <input type="text" v-model="query.keyword" placeholder="请输入游戏名称">
        <span class="g-search-btn" @click="fetchGame()">
          <i class="iconfont icon-search"></i>
        </span>
        <i class="iconfont icon-cuohao g-search-cls" v-show="showClear"
          @click="clearSearch()"></i>
      </p>
    </div>
    <el-container class="g-container">
      <el-aside class="g-nav" width="240px">
        <a href="javascript:;" class="nav-item" v-for="item in category" :key="item.id"
          :class="{'nav-active':currentItem === item.id}"
          @click="setActiveItem(item.id)">{{item.name}}</a>
      </el-aside>
      <el-container>
        <el-header class="g-header" style="height:40px">
          <game-tab :num="listNum" @click="changeTab($event)" />
        </el-header>
        <el-main class="g-main" v-if="filterGame">
          <game-item :list="filterGame" :type="currentShow"
            @click="setActiveItem($event)" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { convertDeepCopy } from '@utils'
import { _getGameList } from '@api'

import gameItem from './GameItem'
import gameTab from './GameTab'
const ALL = 0
export default {
  data() {
    return {
      category: [],
      currentItem: 0,
      query: {
        page: 1,
        size: 10,
        keyword: null
      },
      gameList: [],
      currentShow: 'list'
    }
  },
  methods: {
    ...mapActions(['fetchAllCategory']),
    // 获取游戏列表
    async fetchGame() {
      const { list, total } = await _getGameList(this.query)
      this.gameList = list
      this.total = total
    },
    // 设置当前item
    setActiveItem(index) {
      this.currentItem = index
    },
    // 处理列表
    handleCategory() {
      this.category = convertDeepCopy(this.allCategory)
      this.category.unshift({
        id: 0,
        name: '全部'
      })
    },
    // 切换列表
    changeTab(val) {
      this.currentShow = val
    },
    // 清除搜索框
    clearSearch() {
      this.query.keyword = null
      this.fetchGame()
    }
  },
  computed: {
    ...mapState(['allCategory']),
    filterGame() {
      if (this.currentItem === ALL) {
        return this.gameList
      } else {
        return (
          this.gameList.filter &&
          this.gameList.filter((item) => parseInt(item.lx) === this.currentItem)
        )
      }
    },
    listNum() {
      return this.filterGame.length
    },
    showClear() {
      return this.query.keyword !== null
    }
  },
  components: {
    gameItem,
    gameTab
  },
  async created() {
    if (this.allCategory === null) {
      this.fetchAllCategory()
    }
    this.handleCategory()
    await this.fetchGame()
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';
@import '~@css/mixins.less';
.g-search {
  .flex-x-y();
  height: 80px;
  .g-search-wrap {
    position: relative;
    margin: 0;
    // overflow: hidden;
    input {
      width: 500px;
      height: 40px;
      border: 1px solid #c4c4c4;
      box-sizing: border-box;
      padding: 0 20px;
      border-radius: 20px;
      &:focus {
        // border-color: @main-green;
        box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.5);
      }
    }
    span {
      position: absolute;
      top: 0;
      right: 0;
      .flex-x-y();
      height: 40px;
      padding: 0 16px;
      border-left: 1px solid #ccc;
      cursor: pointer;
      border-radius: 0 20px 20px 0;
      transition: all 0.2s linear;
      &:hover {
        background-color: @main-green;
        color: #fff;
      }
    }
    .g-search-cls {
      position: absolute;
      top: 50%;
      right: 56px;
      transform: translate(0, -50%);
      &:hover {
        color: @main-green;
      }
    }
  }
}
.g-nav {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-content: space-around;
  height: 100%;
  border: 1px solid #ccc;
  box-shadow: inset 0 0 0 1px #e4e4e4;
  padding: 20px 0;
  background-color: #fff;
  .nav-item {
    width: 100px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    margin-top: 20px;
    background-color: #f4f4f4;
    .box-shadow-in(#e4e4e4);
    color: #757575;
    &:hover {
      background-color: #eee;
      border-color: transparent;
    }
  }
  .nav-item:nth-child(-n + 2) {
    margin-top: 0;
  }
  .nav-active {
    box-shadow: inset 0 0 0 1px @main-orange;
    background-color: #f69c001a;
    color: @main-orange;
  }
}
.g-main {
  background-color: #fff;
  padding-top: 10px;
  padding: 0;
  margin: 20px;
  border: 1px solid #ccc;
}

.g-header {
  background-color: #fff;
  padding: 0;
  margin: 0 20px;
}
</style>
