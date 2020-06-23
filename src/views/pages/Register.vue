<template>
  <!-- 注册页 -->
  <div class="registerPage">
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
        type="text"
        :rule="ruleUsername"
        errMsg="请输入正确的手机号码"
        @valChange="getUserName"
      />

      <InputBox
        textPlaceholder="昵称"
        type="text"
        :rule="ruleNickname"
        errMsg="请输入正确的昵称"
        @valChange="getNickName"
      />

      <InputBox
        textPlaceholder="密码"
        type="password"
        :rule="rulePassword"
        errMsg="请输入正确的密码"
        @valChange="getPassWord"
      />

      <!-- 登录按钮 -->
      <ButtonBox msg="注册" @clicked="sendRegister" />
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
      nickname: "",
      password: "",
      ruleUsername: "^\\d{5,11}$",
      ruleNickname: "^\\w{5,11}$",
      rulePassword: "^.{3,9}$"
    };
  },
  components: {
    InputBox,
    ButtonBox
  },
  methods: {
    getUserName(username) {
      this.username = username;
    },
    getNickName(nickname) {
      this.nickname = nickname;
    },
    getPassWord(password) {
      this.password = password;
    },
    sendRegister() {
      if (!this.username || !this.nickname || !this.password) {
        this.$toast.fail("请填写完整信息");
        return;
      }

      const regExpUsername = new RegExp(this.ruleUsername);
      if (!regExpUsername.test(this.username)) {
        this.$toast.fail("请填写正确的中国大陆地区手机号");
        return;
      }

      const regExpNickname = new RegExp(this.ruleNickname);
      if (!regExpNickname.test(this.nickname)) {
        this.$toast.fail("昵称长度应为5～11个字符");
        return;
      }

      const regExpPassword = new RegExp(this.rulePassword);
      if (!regExpPassword.test(this.password)) {
        this.$toast.fail("密码长度应为3～9个字符");
        return;
      }

      this.$axios({
        url: "http://localhost:3000/register",
        method: "post",
        data: {
          username: this.username,
          nickname: this.nickname,
          password: this.password
        }
      }).then(res => {
        console.log(res);
        const { message } = res.data;
        const { id } = res.data.data;
        // console.log(id);

        const status = res.status;
        if (message === "注册成功") {
          this.$toast.success(message);

          // this.$router.push('/personal')
        } else {
          this.$toast.fail(message);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.phoneTop {
  height: 7.222vw;
  background-color: #6d8e97;
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

  .van-cell {
    border-bottom: 1px solid #000;
    padding: 20px 0;

    /deep/ .van-field__control {
      font-size: 5vw;
    }
  }

  .van-button {
    background-color: #fd4a68;
    border: #fd4a68;
    height: 50px;
    font-size: 5vw;
  }
}
</style>