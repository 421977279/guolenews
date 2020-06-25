<template>
  <div>
    <router-link :to="path || ''">
      <div class="navBars">
        <div class="navBars-left">{{name}}</div>
        <div class="navBars-right">
          {{detail}}
          <div class="iconfont iconarrow"></div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["name", "detail", "path"]
};
</script>

<style lang="less" scoped>
.navBars {
  display: flex;
  border-bottom: 1px solid #e7e7e7;
  padding: 20px 0;
  align-items: center;
  margin-left: 20px;
  .navBars-left {
    flex: 1;
    color: #333;
    font-weight: 700;
  }

  .navBars-right {
    display: flex;
    color: #a6a6a6;
    font-size: 12px;
    .iconarrow {
      padding: 2px 12px 0 12px;
    }
  }
}
</style>