<template>
  <div class="buttonBox">
    <button @click="handleClick">{{ msg }}</button>
  </div>
</template>

<script>
export default {
  props: ['msg'],
  methods: {
    handleClick(){
      this.$emit('clicked')
      console.log('子组件发射点击事件给父组件了');
    }
  }
};
</script>

<style lang="less" scoped>
.buttonBox {
  margin-top: 13.333vw;
  button {
    background-color: #fd4a68;
    border: #fd4a68;
    height: 50px;
    font-size: 5vw;
    width: 100%;
    border-radius: 25px;
    color:#fff;
  }
}
</style>