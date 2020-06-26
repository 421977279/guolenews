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
  padding-top: 2.778vw;
  .iconarrow---left {
      padding-left: 5.556vw;
      font-weight: 700;
      padding-top: 1.111vw;
      font-size: 3.889vw;
  }

  .topBarsName {
      padding-left: 35.556vw;
      font-weight: 700;
  }
}
</style>