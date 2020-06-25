<template>
  <div class="topBars">
    <div class="iconfont iconarrow---left" @click="goBack"></div>
    <div class="topBarsName">{{ topBarsName }}</div>
  </div>
</template>

<script>
export default {
  props: ["topBarsName"],
  methods: {
    goBack(){
      this.$router.back();
    }
  }
};
</script>

<style lang="less" scoped>
.topBars {
  display: flex;
  padding-top: 10px;
  .iconarrow---left {
      padding-left: 20px;
      font-weight: 700;
      padding-top: 4px;
      font-size: 14px;
  }

  .topBarsName {
      padding-left: 128px;
      font-weight: 700;
  }
}
</style>