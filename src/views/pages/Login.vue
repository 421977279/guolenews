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
        :rule="ruleUsername"
        type="text"
        errMsg="请输入正确的手机号码"
        @valChange="getUserName"
      />
      <InputBox
        textPlaceholder="密码"
        type="password"
        :rule="rulePassword"
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
      username: "",
      password: "",
      ruleUsername: "^\\d{5,11}$",
      rulePassword: "^\\w{3,11}$"
    };
  },
  components: {
    InputBox,
    ButtonBox
  },
  methods: {
    sendLogin() {
      if (!this.username || !this.password) {
        this.$toast.fail("请填写完整的信息");
        return;
      }

      const regExpUsername = new RegExp(this.ruleUsername);

      if (!regExpUsername.test(this.username)) {
        this.$toast.fail("手机号码格式不正确");
        return;
      }

      if (!regExpUsername.test(this.password)) {
        this.$toast.fail("密码格式不正确");
        return;
      }

      // console.log('子组件点击了登录');
      this.$axios({
        url: "http://localhost:3000/login",
        method: "post",
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        console.log(res);
        const { statusCode, message } = res.data;
        if (message == "登录成功") {
          this.$toast.success(message);
        } else {
          this.$toast.fail(message);
        }
      });
    },
    getUserName(username) {
      this.username = username;
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