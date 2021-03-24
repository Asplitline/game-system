<template>
  <div class="p-time">
    <div class="warp">
      <div class="text">{{date|formatDate(1)}}</div>
      <div class="desc">上传时间</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    date: {
      typeof: Date
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@css/mixins.less';
.warp {
  position: relative;
  width: 140px;
  text-align: center;
  &::before {
    position: absolute;
    left: 0;
    content: '';
    width: 2px;
    height: 100%;
    background-color: #ccc;
  }
  .text {
    color: #3c3c3c;
    text-shadow: -1px 1px 0px #ccc;
  }
  .desc {
    color: #6c757d;
    font-size: 14px;
  }
}
</style>