<template>
  <div class="rank-content">
    <ul>
      <li class="rank-item" v-for="item in filterGame" :key="item.id">
        <a href="javascript:;" @click="goTo(item.id)">
          <div class="r-cover">
            <img :src="bindURL(item.photo)" alt="">
          </div>
          <div class="r-content">
            <p class="r-name"> {{item.name}}</p>
            <span class="r-lx">{{item.lxName}}</span>
          </div>
        </a>
        <pTips :date="item.createTime" :score="item.score" :star="item.number"
          :type="tag" />
      </li>
    </ul>
  </div>
</template>

<script>
import { bindURL } from '@utils'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import pTips from '@/components/common/Tips'
export default {
  props: {
    data: {
      type: Array
    },
    list: {
      type: Array
    },
    tag: {
      type: String
    }
  },
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['setCurrentGame', 'setHCurrentIndex']),
    ...mapActions(['fetchAllStar']),
    bindURL,
    goTo(id) {
      this.setCurrentGame(this.currentGame(id))
      this.$router.push('/game/' + id)
      this.setHCurrentIndex()
    },
    currentGame(id) {
      return this.filterGame.find((item) => item.id === id)
    }
  },
  computed: {
    ...mapState(['allStar']),
    ...mapGetters(['getStarByGameId']),
    // 过滤游戏
    filterGame() {
      const temp = this.data.map((i) => {
        const game = this.list.find((item) => {
          return item.id === Number(i.lx)
        })
        i.lxName = (game && game.name) || '未知'
        return i
      })
      if (this.tag === 'new') {
        temp.sort((a, b) => {
          return -(a.createTime - b.createTime)
        })
      } else if (this.tag === 'score') {
        temp.sort((a, b) => {
          return -(a.score - b.score)
        })
      } else if (this.tag === 'star') {
        temp.forEach((item) => {
          const star = this.getStarByGameId(item.id)
          item.number = (star && star.length) || 0
        })
        temp.sort((a, b) => {
          return -(a.number - b.number)
        })
      }
      return temp
    }
  },
  components: {
    pTips
  },
  // QUES>> no data [created | mounted]
  created() {
    if (this.allStar === null) {
      this.fetchAllStar()
    }
  }
}
</script>

<style lang="less" scoped>
.rank-content {
  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
  }
  // padding: 10px 20px;
  background-color: #fff;

  border: 1px solid #ccc;
  .rank-item {
    position: relative;
    box-sizing: border-box;
    padding: 10px;
    height: 140px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    overflow: hidden;
    transition: all 0.2s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    a {
      display: flex;
      height: 100%;
      width: 100%;
    }
    .r-cover {
      width: 200px;
      overflow: hidden;
      img {
        width: 100%;
        transition: all 0.3s linear;
      }
    }
    &:hover {
      background-color: #f4f4f4;
      .r-cover img {
        transform: scale(1.05);
      }
    }
    .r-content {
      text-align: left;
      color: #666;
      margin-left: 2em;
      .r-name {
        font-size: 24px;
      }
      .r-lx {
        display: inline-block;
        border: 1px solid #ccc;
        padding: 0.5em 1em;
        font-size: 14px;
      }
    }
    .p-tips {
      position: absolute;
      right: 20px;
      top: 20px;
      font-size: 20px;
    }
  }
}
</style>
