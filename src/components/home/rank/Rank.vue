<template>
  <div class="rank">
    <el-container class="r-main">
      <el-aside width="160px">
        <a href="javascript:;" class="ranks-tag" v-for="(item,index) in ranks"
          :key="index" :class="{'ranks-tag-active':item.tag === currentIndex}"
          @click="setActive(item.tag)">{{item.name}}
        </a>
      </el-aside>
      <el-main>
        <rank-content :data="allGame" :list="miniCategoryList" :tag="currentIndex" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import rankContent from './RankContent'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  data() {
    return {
      ranks: [
        { name: '最高热度', tag: 'star' },
        { name: '口碑佳作', tag: 'score' },
        { name: '最新上架', tag: 'new' }
      ],
      currentIndex: 'star'
    }
  },
  methods: {
    ...mapActions(['fetchAllGame', 'fetchAllCategory']),
    setActive(val) {
      this.currentIndex = val
    }
  },
  computed: {
    ...mapState(['allGame', 'allCategory']),
    ...mapGetters(['getMiniCategoryList']),
    miniCategoryList() {
      return this.getMiniCategoryList()
    }
  },
  components: {
    rankContent
  },
  async created() {
    if (this.allGame === null) {
      await this.fetchAllGame()
    }
    if (this.allCategory === null) {
      this.fetchAllCategory()
    }
  }
}
</script>
<style lang="less" scoped>
@import '~@css/variables.less';
@import '~@css/mixins.less';
.r-main {
  margin: 0 120px;
  .el-aside {
    padding: 20px 0;
    background-color: #fff;
    border: 1px solid #ccc;
    .box-shadow-in(#e4e4e4);
  }
  /deep/.el-main {
    padding: 0 20px 20px;
  }
  .ranks-tag {
    display: block;
    height: 30px;
    line-height: 30px;
    padding: 8px 10px;
    color: #666;
    &:hover {
      background-color: #f4f4f4;
    }
  }
  .ranks-tag-active {
    background-color: #f4f4f4;
  }
}
</style>
