<template>
  <div class="homePage">
    <!-- 手机顶部 -->
    <div class="phoneTop">
      <img src="@/assets/phoneTop.jpg" alt class="img" />
    </div>
    
    <div class="content">
      <br />
      <router-link to="/register">注册页</router-link>
      <br />
      <br />
      <router-link to="/login">登录页</router-link>
      <br />
      <br />
      <router-link to="/personal">个人中心页</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.homePage {

  .phoneTop {

    .img {
      width: 100%;
    }
  }

  .content {
    padding-left: 20px;
    font-weight: 700;
  }
}
</style>