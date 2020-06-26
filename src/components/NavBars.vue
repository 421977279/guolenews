<template>
  <div>
    <router-link :to="path || ''">
      <div class="navBars" @click="handleClick">
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
  props: ["name", "detail", "path"],
  methods:{
    handleClick(){
      this.$emit('popup')
    }
  }
};
</script>

<style lang="less" scoped>
.navBars {
  display: flex;
  border-bottom: 0.278vw solid #e7e7e7;
  padding: 5.556vw 0;
  align-items: center;
  margin-left: 5.556vw;
  .navBars-left {
    flex: 1;
    color: #333;
    font-weight: 700;
  }

  .navBars-right {
    display: flex;
    color: #a6a6a6;
    font-size: 3.333vw;
    .iconarrow {
      padding: 0.556vw 3.333vw 0 3.333vw;
    }
  }
}
</style>