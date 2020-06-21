<template>
  <!-- 登录页 -->
  <div class="loginPage">
    <!-- 手机顶部 -->
    <div class="phoneTop"></div>

    <div class="login">
      <!-- 返回按钮 -->
      <div class="iconfont iconicon-"></div>
      <!-- 头条logo -->
      <div class="logo">
        <img src="@/assets/logo.png" />
      </div>

      <!--表单 -->
      <!-- 输入框 -->
      <InputBox
        textPlaceholder="用户名 / 手机号码"
        rule="^\d{5,11}$"
        type="text"
        errMsg="请输入正确的手机号码"
        @valChange="getUserName"
      />
      <InputBox
        textPlaceholder="密码"
        type="password"
        rule="^\w{5,11}$"
        errMsg="请输入正确的密码"
        @valChange="getPassWord"
      />

      <!-- 登录按钮 -->
      <ButtonBox msg="登录" @clicked="sendLogin" />
    </div>
  </div>
</template>

<script>
import InputBox from "@/components/InputBox";
import ButtonBox from "@/components/ButtonBox";

export default {
  data() {
    return {
      userName: "",
      password: ""
    };
  },
  components: {
    InputBox,
    ButtonBox
  },
  methods: {
    sendLogin() {
      // console.log('子组件点击了登录');
      this.$axios({
        url: "http://localhost:3000/login",
        method: "post",
        data: {
          userName: this.userName,
          password: this.password
        }
      }).then(res => {
        // console.log(res);
        const {statusCode,message} = res.data;
        if(statusCode===401){
          this.$toast(message);
        }
      });
    },
    getUserName(userName) {
      this.userName = userName;
    },
    getPassWord(password) {
      this.password = password;
    }
  }
};
</script>

<style lang="less" scoped>
.phoneTop {
  height: 7.222vw;
}

.login {
  padding: 7.222vw 5vw;

  .iconicon- {
    font-size: 5.556vw;
  }

  .logo {
    text-align: center;
    padding: 11vw;

    img {
      height: 16vw;
      width: 28vw;
    }
  }
}
</style>