<template>
  <div class="rank-content">
    <ul>
      <li class="rank-item" v-for="item in filterGame" :key="item.id">
        <a href="javascript:;">
          <div class="r-cover">
            <img :src="bindURL(item.photo)" alt="">
          </div>
          <div class="r-content">
            <p class="r-name"> {{item.name}}</p>
            <span class="r-lx">{{item.lx}}</span>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { bindURL } from '@utils'
export default {
  props: {
    data: {
      type: Array
    }
  },
  data() {
    return {}
  },
  methods: {
    bindURL
  },
  computed: {
    filterGame() {
      return this.data
    }
  },
  // QUES>> no data [created | mounted]
  created() {},
  mounted() {}
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
    box-sizing: border-box;
    padding: 10px;
    height: 140px;
    width: 100%;
    border-bottom: 1px solid #ccc;
    overflow: hidden;

    transition: all 0.2s cubic-bezier(0.55, 0.055, 0.675, 0.19);
    a {
      display: inline-block;
      height: 100%;
      width: 100%;
    }
    .r-cover {
      height: 160px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &:hover {
      background-color: #f4f4f4;
    }
  }
}
</style>