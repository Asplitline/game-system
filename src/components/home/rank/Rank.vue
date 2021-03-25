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
        <rank-content :data="rankList" />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import rankContent from './RankContent'
import { _getGame } from '@api'
export default {
  data() {
    return {
      ranks: [
        { name: '最新上架', tag: 'new' },
        { name: '口碑佳作', tag: 'score' },
        { name: '最高热度', tag: 'star' }
      ],
      rankList: [],
      currentIndex: 'new'
    }
  },
  methods: {
    async fecthRank() {
      const list = await _getGame()
      this.rankList = list
    },
    setActive(val) {
      this.currentIndex = val
    }
  },
  components: {
    rankContent
  },
  created() {
    this.fecthRank()
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