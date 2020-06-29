<template>
  <div class="test">
    <button @click="handleClick(1)">用户1</button>
    <button @click="handleClick(2)">用户2</button>
    <button @click="handleClick(3)">用户3</button>
    <br />
    <button @click="handleClick(4)">用户4</button>
    <button @click="handleClick(5)">用户5</button>
    <button @click="handleClick(6)">用户6</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleClick(id) {
      this.$axios({
        url: "/user_follows/" + id
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style>
</style>