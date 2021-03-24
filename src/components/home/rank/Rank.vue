<template>
  <div class="rank">
    <el-container class="r-main">
      <el-aside width="160px">
        <a :href="'/'+item.tag" class="ranks-tag" v-for="(item,index) in ranks"
          :key="index">{{item.name}}
        </a>
      </el-aside>
      <el-main>
        <rank-list />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import rankList from './RankList'
import { _getGame } from '@api'
export default {
  data() {
    return {
      ranks: [
        { name: '最新上架', tag: 'new' },
        { name: '口碑佳作', tag: 'score' },
        { name: '最高热度', tag: 'star' }
      ],
      rankList: []
    }
  },
  methods: {
    async fecthRank() {
      const { list } = await _getGame()
      this.rankList = list
    }
  },
  computed() {},
  components: {
    rankList
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
  .el-aside {
    padding: 20px 0;
    background-color: #fff;
    border: 1px solid #ccc;
    .box-shadow-in(#e4e4e4);
  }
  .el-main {
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