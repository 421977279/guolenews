<template>
  <div class="edit" v-if="userInfo">
    <!-- 手机顶部 -->
    <div class="phoneTop">
      <img src="@/assets/phoneTop.jpg" alt class="img" />
    </div>

    <topBars topBarsName="编辑资料" />

    <div class="imgBox">
      <img v-if="userInfo.head_img" :src="$axios.defaults.baseURL + userInfo.head_img" alt class="avatar" />
      <img v-else src="@/assets/logo.png" alt class="avatar" />
    </div>

    <navBars name="昵称" :detail="userInfo.nickname" />

    <navBars name="密码" detail="••••••" />

    <navBars name="性别" :detail="userInfo.gender===1?'男':'女'" />
  </div>
</template>

<script>
import topBars from "@/components/TopBars";
import navBars from "@/components/NavBars";

export default {
  data() {
    return {
      userInfo: ""
    };
  },
  mounted() {
    this.$axios({
      url: "/user_update/" + localStorage.getItem("userId"),
      method: "POST",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken")
      }
    }).then(res => {
      //   console.log(res);
      this.userInfo = res.data.data;
    });
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
  padding: 50px 0;
  .avatar {
    height: 70px;
    width: 70px;
    border-radius: 50%;
  }
}
</style>