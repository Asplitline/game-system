<template>
  <div class="toolbar">
    <div class="toolbar-title">为您找到{{num}}款内容</div>
    <div class="toolbar-bd">
      <div class="toolbar-item">
        <i class="iconfont icon-appstore" :class="{'toolbar-active':cIndex === 'list'}"
          @click="setCurrentToolbar('list')"></i>
        <i class="iconfont icon-menu1" :class="{'toolbar-active':cIndex === 'card'}"
          @click="setCurrentToolbar('card')"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    num: {
      type: Number,
      default: 0
    },
    index: {
      type: String,
      default: 'list'
    }
  },
  data() {
    return {
      cIndex: this.index
    }
  },
  methods: {
    // 设置当前显示
    setCurrentToolbar(val) {
      this.cIndex = val
      this.$emit('click', this.cIndex)
    }
  },
  computed: {},
  created() {}
}
</script>

<style lang="less" scoped>
@import '~@css/variables.less';

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  box-sizing: border-box;
  padding: 0 20px;
  border: 1px solid #cce;
  .toolbar-title {
    vertical-align: bottom;
  }
  .toolbar-item {
    i {
      position: relative;
      display: inline-block;
      padding: 4px;
      margin-left: 10px;
      font-size: 20px;
      left: 0;
      top: 0;
      vertical-align: bottom;
      cursor: pointer;
      &::after {
        content: '';
        position: absolute;
        left: -5px;
        top: 3px;
        width: 1px;
        height: 24px;
        background-color: #ccc;
      }
      &:active {
        color: @main-orange;
      }
    }
  }
  .toolbar-active {
    color: @main-orange;
  }
}
</style>