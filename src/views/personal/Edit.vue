<template>
  <div class="edit" v-if="userInfo">
    <!-- 手机顶部 -->
    <div class="phoneTop">
      <img src="@/assets/phoneTop.jpg" alt class="img" />
    </div>

    <topBars topBarsName="编辑资料" />

    <div class="imgBox">
      <img
        v-if="userInfo.head_img"
        :src="$axios.defaults.baseURL + userInfo.head_img"
        alt
        class="avatar"
      />
      <img v-else src="@/assets/logo.png" alt class="avatar" />
      <van-uploader :after-read="afterRead" />
    </div>

    <navBars name="昵称" :detail="userInfo.nickname" @popup="showNickname = true" />

    <navBars name="密码" detail="••••••" @popup="showPassword = true" />

    <navBars name="性别" :detail="userInfo.gender===1?'男':'女'" @popup="showGender = true" />

    <!-- 修改昵称的弹出框组件调用 -->
    <van-dialog
      v-model="showNickname"
      title="修改昵称"
      show-cancel-button
      @confirm="setUserInfo({nickname: newNickname})"
    >
      <van-cell-group>
        <van-field v-model="newNickname" placeholder="请输入新的昵称" />
      </van-cell-group>
    </van-dialog>

    <!-- 修改密码的弹出框组件调用 -->
    <van-dialog
      v-model="showPassword"
      title="修改密码"
      show-cancel-button
      @confirm="setUserInfo({password: newPassword})"
    >
      <van-cell-group>
        <van-field v-model="newPassword" placeholder="请输入新的密码" />
      </van-cell-group>
    </van-dialog>

    <van-action-sheet
      v-model="showGender"
      :actions="actions"
      cancel-text="取消"
      description="修改性别"
      close-on-click-action
      @select="setGender"
    />
  </div>
</template>

<script>
import topBars from "@/components/TopBars";
import navBars from "@/components/NavBars";

export default {
  data() {
    return {
      userInfo: "",
      showNickname: false,
      showPassword: false,
      showGender: false,
      newNickname: "",
      newPassword: "",
      showGender: false,
      actions: [
        { name: "男", gender: 1 },
        { name: "女", gender: 0 }
      ]
    };
  },
  mounted() {
    this.loadpage();
  },

  methods: {
    // 封装挂载页面的函数
    // 记得封装的函数是写在methods里
    loadpage() {
      this.$axios({
        url: "/user/" + localStorage.getItem("userId")
      }).then(res => {
        console.log("挂载返回的结果", res);
        this.userInfo = res.data.data;
      });
    },

    setUserInfo(userData) {
      // console.log(this.newNickname);
      this.$axios({
        url: "/user_update/" + localStorage.getItem("userId"),
        method: "POST",
        data: userData
      }).then(res => {
        console.log("编辑用户信息返回的结果", res);
        this.loadpage();
      });
    },

    setGender(item) {
      // console.log(item.gender);
      this.setUserInfo({ gender: item.gender });
    },

    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
      const formData = new FormData();
      formData.append("file", file.file);

      this.$axios({
        url: "upload",
        method: "POST",
        data: formData
      }).then(res => {
        // console.log(res);
        const { data, message } = res.data;
        if (message === "文件上传成功") {
          this.setUserInfo({ head_img: data.url });
        }
      });
    }
  },
  components: {
    topBars,
    navBars
  }
};
</script>

<style lang="less" scoped>
.phoneTop {
  .img {
    width: 100%;
  }
}

.imgBox {
  text-align: center;
  padding: 13.889vw 0;
  position: relative;

  .avatar {
    height: 19.444vw;
    width: 19.444vw;
    border-radius: 50%;
  }

  .van-uploader{
    position: absolute;
    opacity: 0;
  }
}
</style>