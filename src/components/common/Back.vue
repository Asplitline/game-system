<template>
  <div class="p-back" @click="back()">
    <i class="icon-backward iconfont"></i>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    back() {
      history.go(-1)
      // this.$emit('back')
    }
  }
}
</script>

<style lang="less" scoped>
.p-back {
  display: inline-block;
  border-radius: 50%;
  padding: 6px 4px;
  border: 2px double rgba(64, 158, 255, 0.5);
  color: #409eff;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  i {
    font-size: 22px;
  }
  &:hover {
    box-shadow: 0 0 0 3px rgba(64, 158, 255, 0.5);
    background-color: #409eff;
    color: #fff;
    transform: scale(1.2);
  }
}
</style>
