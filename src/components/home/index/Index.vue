<template>
  <div class="index">
    <el-carousel :interval="3000" type="card" height="300px">
      <el-carousel-item v-for="item in noticeList" :key="item.id" @change="xx">

        <div class="container">
          <img :src="bindURL(item.url)" alt="">
          <div class="banner">
            <div class="title">{{item.title}}</div>
            <div class="desc">{{item.comment}}</div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { _getNoticeList } from '@api'
import { bindURL } from '@utils'
export default {
  data() {
    return {
      query: {
        page: 1,
        size: 5
      },
      noticeList: [],
      indexxx: ''
    }
  },
  methods: {
    bindURL,
    // 获取公告
    async fetchNotice() {
      const { list } = await _getNoticeList(this.query)
      this.noticeList = list
    },
    xx(val) {
      console.log(val)
    }
  },
  computed: {},
  created() {
    this.fetchNotice()
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/css/mixins.less';
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
    .title {
      text-align: left;
      font-size: 16px;
      color: #fff;
      font-weight: 700;
      opacity: 0.8;
      .text-shadow-000();
      text-indent: 1em;
      margin-bottom: 0.5em;
    }
    .desc {
      text-align: left;
      max-width: 300px;
      .text-ellipsis();
      font-size: 22px;
      color: #fff;
      .text-shadow-000();
      font-weight: 700;
      text-indent: 0.5em;
    }
  }
}
</style>