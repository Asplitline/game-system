<template>
  <div class="game-item">
    <template v-if="allNum">
      <!-- list -->
      <ul v-if="type === 'list'" class="list">
        <li class="g-list" v-for="item in list" :key="item.id">
          <a href="javascript:;" @click="goGameDetail(item)">
            <div class="g-cover">
              <img :src="bindURL(item.photo)" alt="">
            </div>
            <div class="g-content">
              <h3 class="g-title">{{item.name}}</h3>
              <p class="g-company">{{item.company || '未知'}}</p>
            </div>
          </a>
        </li>
        <!-- 占位 -->
        <li v-for="item in blankNum" class="g-list">
        </li>
      </ul>
      <ul v-else-if="type==='card'">
        <!-- card -->
        <li class="g-card" v-for="item in filterList" :key="item.id">
          <a href="javascript:;" @click="goGameDetail(item)">
            <div class=" g-cover">
              <img :src="bindURL(item.photo)" alt="">
            </div>
            <div class="g-content">
              <h3 class="g-title">{{item.name}}</h3>
              <p class="g-company">{{item.company || '未知'}}</p>
              <span class="g-lx" @click="handleClick(item.lx)">{{item.lxName}}</span>
            </div>
            <div class=" g-time">
              {{item.createTime | formatDate(1)}}
            </div>
          </a>
        </li>
      </ul>
    </template>
    <template v-else>
      暂无游戏
    </template>
  </div>

</template>

<script>
import { bindURL } from '@utils'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
// list
// card
export default {
  props: {
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
    type: {
      typeof: String,
      default: 'list'
    }
  },
  methods: {
    bindURL,
    ...mapActions(['fetchAllCategory']),
    ...mapMutations(['setCurrentGame']),
    handleClick(lxId) {
      this.$emit('click', Number(lxId))
    },
    goGameDetail(data) {
      this.setCurrentGame(data)
      this.$router.push('/game/' + data.id)
    }
  },
  computed: {
    ...mapGetters(['getMiniCategoryList']),
    blankNum() {
      return this.allNum % 4 === 0 ? 0 : 4 - (this.allNum % 4)
    },
    allNum() {
      return this.list.length
    },
    filterList() {
      return this.list.map((i) => {
        const item = this.getMiniCategoryList().find(
          (j) => j.id === Number(i.lx)
        )
        i.lxName = item.name
        return i
      })
    }
  },
  created() {
    if (this.type === 'card') {
      this.fetchAllCategory()
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@css/mixins.less';
@import '~@css/variables.less';
.game-item {
  padding: 20px;
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  // list
  .g-list {
    width: 200px;
    border-radius: 4px;
    overflow: hidden;
    a {
      display: inline-block;
      width: 100%;
      height: 100%;
      margin-bottom: 10px;
      .g-cover {
        width: 200px;
        height: 287px;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .g-content {
        box-sizing: border-box;
        width: 100%;
        background-color: #fff;
        border: 1px solid #eee;
        border-top: none;
        .box-shadow-tx(#eee, #eee);
      }
      .g-title,
      .g-company {
        color: #000;
        max-width: 160px;
        .text-ellipsis();
        margin: 0 auto;
      }
      .g-title {
        height: 36px;
        font-weight: 400;
        line-height: 36px;
      }
      .g-company {
        height: 30px;
        font-size: 14px;
      }
    }
    &:hover {
      img {
        transform: scale(1.05);
      }
      .g-content {
        background: #f4f4f4;
      }
    }
  }
  // 18 15 14
  // card
  .g-card {
    height: 160px;
    width: 100%;
    background-color: #fff;
    border: 1px solid #eee;
    .box-shadow-tx(#eee, #eee);
    margin-bottom: 10px;
    a {
      display: flex;
      position: relative;
      justify-content: start;
      transition: all 0.5s ease-in-out;
      .g-cover {
        height: 160px;
        overflow: hidden;
        img {
          // height: inherit;
          vertical-align: bottom;
        }
      }
      .g-content {
        flex: 1;
        text-align: left;
        color: #000;
        text-indent: 2em;
        .g-title {
          font-weight: 400;
        }
        .g-company {
          color: #777;
        }
        .g-lx {
          display: inline-block;
          border: 1px solid #ccc;
          padding: 0.5em 1em;
          text-indent: 0;
          font-size: 14px;
          margin: 0.5em 0 0 2em;
          &:hover {
            color: @main-orange;
            border-color: @main-orange;
          }
        }
      }
      .g-time {
        position: absolute;
        right: 20px;
        top: 20px;
        color: #909399;
        font-size: 14px;
        letter-spacing: 0.1em;
      }
      &:hover {
        img {
          transform: scale(1.1);
        }
        .g-content {
          background-color: #f4f4f4;
        }
      }
    }
  }
}
</style>