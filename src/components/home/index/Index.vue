<template>
  <div class="index">
    <!-- 轮播图 -->
    <el-carousel :interval="3000" type="card" height="300px"
      @change="handleChange($event)">
      <el-carousel-item v-for="(item,index) in noticeList" :key="item.id">
        <div class="container" @click="showNotice(item,index)">
          <img :src="bindURL(item.url)" alt="">
          <transition name="fade">
            <div class="banner" v-show="currentIndex === index">
              <div class="title">
                {{item.title}}</div>
              <div class="desc">
                {{item.comment}}</div>
            </div>
          </transition>
        </div>
      </el-carousel-item>
    </el-carousel>
    <!-- 功能模块 -->
    <ul class="f-main">
      <li class="f-item" v-for="(item,index ) in content" :key="index">
        <a :href="'#'+item.url">
          <div class="f-img">
            <img :src="item.src" alt="">
          </div>
          <div class="f-tips">
            <h3 class="f-title">{{item.title}}</h3>
            <p class="f-desc">{{item.desc}}</p>
          </div>
        </a>
      </li>
    </ul>

    <!-- 公告展示 -->
    <el-dialog :visible.sync="noticeDialogVisible" width="30%">
      <div class="d-head">
        <span class="d-title">{{currentNotice.title}}</span>
        <span class="d-date">{{currentNotice.createTime | formatDate}}</span>
      </div>
      <div class="d-main">
        <div v-html="currentNotice.comment"></div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 公告对话框形式
import { _getNoticeList } from '@api'
import { bindURL, convertDeepCopy } from '@utils'
export default {
  data() {
    return {
      query: {
        page: 1,
        size: 5
      },
      noticeList: [],
      currentIndex: 0,
      content: [
        {
          url: '/game',
          src: require('/src/assets/f-img.png'),
          title: '游戏中心',
          desc: '海量游戏任你游玩'
        },
        {
          url: '/rank',
          src: require('/src/assets/f-img.png'),
          title: '排行榜',
          desc: '最热游戏尽在眼前'
        },
        {
          url: '/share',
          src: require('/src/assets/f-img.png'),
          title: '游戏论坛',
          desc: '尽情交流游戏心得'
        }
      ],
      noticeDialogVisible: false,
      currentNotice: {}
    }
  },
  methods: {
    bindURL,
    // 获取公告
    async fetchNotice() {
      const { list } = await _getNoticeList(this.query)
      this.noticeList = list
    },
    handleChange(index) {
      this.currentIndex = index
    },
    showNotice(data, index) {
      if (this.currentIndex === index) {
        this.noticeDialogVisible = true
        this.currentNotice = convertDeepCopy(data)
      }
    }
  },
  computed: {},
  created() {
    this.fetchNotice()
  }
}
</script>

<style lang="less" scoped>
@import '~@css/mixins.less';
@import '~@css/variables.less';

.el-carousel {
  background-color: #fff;
  margin-bottom: 20px;
  border: 1px solid #ccc;
}
.container {
  position: relative;
  height: 100%;
  width: 100%;
  background-color: #ccc;
  img {
    height: 100%;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .banner {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    padding: 14px 0;
    .title,
    .desc {
      text-align: left;
      color: #fff;
      font-weight: 700;
      .text-ellipsis();
      .text-shadow-000();
    }
    .title {
      max-width: 160px;
      font-size: 16px;
      opacity: 0.8;
      text-indent: 1em;
      margin-bottom: 0.5em;
    }
    .desc {
      max-width: 300px;
      opacity: 0.95;
      font-size: 22px;
      text-indent: 0.5em;
    }
  }
}

.f-main {
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  padding: 40px 20px;
  border: 1px solid #ccc;
  .f-item {
    position: relative;
    width: 340px;
    border: 1px solid rgba(204, 204, 204, 0.6);
    border-radius: 2px;
    transition: all 0.2s linear;
    &:hover {
      .box-shadow-000();
    }
    a {
      width: 100%;
      height: 100%;
    }
  }
  .f-img {
    img {
      width: 100%;
      vertical-align: top;
    }
  }

  .f-tips {
    position: absolute;
    top: 50%;
    left: 3%;
    transform: translate(0, -50%);
    .f-title,
    .f-desc {
      color: #fff;
    }
    .f-title {
      position: relative;
      text-align: left;
      font-size: 18px;
      line-height: 18px;
      font-weight: 400;
      padding-left: 20px;
      &::after {
        position: absolute;
        content: '';
        width: 4px;
        height: 18px;
        left: 0;
        top: 0;
        background-color: @main-orange;
      }
    }

    .f-desc {
      margin: 0 6px 0;
      font-size: 14px;
      opacity: 0.8;
    }
  }
}

/deep/.el-dialog__body {
  padding: 10px 20px 30px 20px;
}
.d-head {
  div {
    border-bottom: 1px solid #ccc;
  }
  .d-title {
    display: block;
    font-size: 28px;
    font-size: #000;
  }
  .d-date {
    display: block;
    text-align: right;
    font-size: 14px;
    color: #777;
    margin: 0 10px 20px 10px;
  }
}
.d-main {
  // text-indent: 2em;
  text-align: left;
  padding: 10px 20px;
  border: 1px solid #ccc;
  line-height: 20px;
  color: #666;
  font-size: 15px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>