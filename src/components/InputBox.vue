<template>
  <div class="inputBox">
    <input 
    :class="{success:flag,error:!flag}"
    :type="type" 
    :placeholder="textPlaceholder"
    v-model="inputValue">
    <span class="errorMsg">{{msg}}</span>
  </div>
</template>

<script>
export default {
  props: ["textPlaceholder","type","rule","errMsg"],
  data () {
    return {
      inputValue:'',
      flag:true,
      msg:''
    }
  },
  watch: {
    inputValue(newValue){
      // console.log(newValue);
      const regExp = new RegExp(this.rule);

      this.flag = regExp.test(newValue);

      if(!this.flag){
        // console.log(this.errMsg);
        this.msg = this.errMsg;

        this.$toast.fail(this.errMsg)
      }else{
        this.msg = ''
      }

      this.$emit('valChange',newValue)
    }
  }
};
</script>

<style lang="less" scoped>
input {
  border: 0;
  outline: none;
  border-bottom: 1px solid #000;
  width: 100%;
  font-size: 18px;
  height: 50px;
}

.errorMsg{
  font-size: 12px;
  color: red;
}

.success{
  border-bottom-color: #ccc;
}

.error{
  border-bottom-color: red;
}
</style>