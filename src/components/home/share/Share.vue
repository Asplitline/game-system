<template>
  <div class="share">
    <el-container>
      <el-header style="height:40px">
        <div class="s-nav">
          <a href="javascript:;" class="nav-item"
            :class="{'nav-item-active':activeIndex===item.id}" v-for="item in navItem"
            :key="item.id">{{item.tag}}</a>
        </div>
        <button class="s-add" @click="goAddPost()"><i
            class="icon-news_hot iconfont"></i>写文章</button>
      </el-header>
      <el-main>
        <a class="s-item" v-for="item in filterPost" :key="item.id" href="javascript:;"
          @click="goPostDetail(item)">
          <div class="s-info">
            <span class="s-author">{{item.author}}</span>
            <span class="s-date">{{item.createTime |formatDate}}</span>
          </div>
          <div class="s-title">{{item.title}}</div>
          <div class="s-desc">{{item.textContent}}</div>
        </a>
        <el-pagination layout="prev, pager, next" :total="total"
          @current-change="handleCurrentChange(fecthPost,$event)">
        </el-pagination>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { _getPostList } from '@api'
import { aMixin } from '@mixins'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      navItem: [
        { id: 1, tag: '热门' },
        { id: 2, tag: '最新' }
      ],
      activeIndex: 1,
      postList: []
    }
  },
  mixins: [aMixin],
  methods: {
    ...mapActions(['fetchAllUser']),
    ...mapMutations(['setCurrentPost']),
    // 获取文章列表
    async fecthPost() {
      const { list, total } = await _getPostList(this.query)
      this.total = total
      this.postList = list
    },
    // 跳转到编写文章
    goAddPost() {
      this.$router.push('/addPost')
    },
    // 跳转到文章详情
    goPostDetail(row) {
      this.setCurrentPost(row)
      this.$router.push('/share/' + row.id)
    }
  },
  computed: {
    ...mapState(['allUser']),
    ...mapGetters(['getUserNameById']),
    filterPost() {
      return this.postList.map((i) => {
        i.author = this.getUserNameById(i.authorId)
        return i
      })
    }
  },
  created() {
    this.fecthPost()
    if (this.allUser === null) {
      this.fetchAllUser()
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';
@import '~@css/mixins.less';

.el-container {
  margin: 0 160px 0;
  background-color: #fff;
  border: 1px solid #ccc;
}
.el-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  border-bottom: 0.5px solid #97979733;
  line-height: 40px;
  text-align: left;
  .s-nav {
    display: inline-block;
  }
  .nav-item {
    position: relative;
    display: inline-block;
    padding: 0 10px;
    text-align: left;
    color: #909090;
    font-size: 16px;
    &:hover {
      color: @main-green;
    }
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 1px;
      height: 16px;
      background-color: #97979733;
    }
  }
  .nav-item-active {
    color: @main-green;
  }
  // add
  .s-add {
    position: absolute;
    top: 0;
    right: 0;
    padding: 9px 6px;
    cursor: pointer;
    background-color: @main-green;
    border: 2px solid @main-green;
    // border-radius: 4px;
    color: #fff;
    transition: all 0.1s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    letter-spacing: 0.1em;
    i {
      margin-right: 4px;
    }
    &:focus {
      outline: none;
    }
    &:hover {
      background-color: rgba(66, 185, 131, 0.8);
      box-shadow: 0 0 0 3px rgba(66, 185, 131, 0.5);
      transform: scale(1.05);
    }
  }
}
.el-main {
  text-align: left;
  padding: 0;
  .s-item {
    display: block;
    border-bottom: 1px solid #97979733;
    transition: all 0.3s cubic-bezier(0.39, 0.575, 0.565, 1);
    padding: 8px 20px;
    div {
      margin-bottom: 8px;
    }
    .s-author,
    .s-date {
      color: #b2bac2;
      font-size: 14px;
      margin-right: 6px;
    }
    .s-title {
      color: #2e3135;
      font-size: 18px;
      font-weight: 600;
      &:hover {
        text-decoration: underline;
      }
    }
    .s-desc {
      color: #777;
      font-size: 16px;
      max-width: 700px;
      .text-ellipsis-s(2);
    }
    &:hover {
      background-color: #b2bac226;
    }
  }
  .el-pagination {
    margin: 10px 0;
    text-align: center;
  }
}
</style>
