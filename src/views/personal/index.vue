<template>
    <!-- 个人中心页 -->
    <div class="personalPage" v-if="userInfo">
      <!-- 手机顶部 -->
      <div class="phoneTop">
        <img src="@/assets/phoneTop.jpg" alt class="img" />
      </div>

      <!-- 用户资料头部 -->
      <div class="userInfo">
        <img v-if="userInfo.head_img" :src="$axios.defaults.baseURL+userInfo.head_img" alt class="avatar" />
        <img v-else src="@/assets/logo.png" alt class="avatar" />

        <div class="userName">
          <div class="userName-top">
            <div class="iconfont iconxingbienan" v-if="userInfo.gender===1"></div>
            <div class="iconfont iconxingbienv" v-else></div>

            <span>{{userInfo.nickname}}</span>
          </div>
          <div class="userName-bottom">{{(userInfo.create_date || " ").split('T')[0]}}</div>
        </div>

        <div class="iconfont iconarrow"></div>
      </div>

      <!-- 导航条 -->
      <NavBars
        v-for="(item,index) in navBarsLists"
        :name="item.name"
        :detail="item.detail"
        :path="item.path"
        :key="index"
      />

      <NavBars name="退出" detail="注销用户" @click.native="handleClick" />
    </div>
</template>

<script>
import NavBars from "@/components/NavBars";

export default {
  data() {
    return {
      userInfo: "",
      navBarsLists: [
        {
          name: "我的关注",
          detail: "关注的用户",
          path: "/follow"
        },
        {
          name: "我的跟帖",
          detail: "跟帖/回复",
          path: "/comments"
        },
        {
          name: "我的收藏",
          detail: "文章/视频",
          path: "/posts"
        },
        {
          name: "设置",
          detail: "基本设置",
          path: "/set"
        }
      ]
    };
  },
  mounted() {
    this.$axios({
      url: "/user/" + localStorage.getItem("userId"),
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("userToken")
      }
    }).then(res => {
      console.log(res);
      const { message, data } = res.data;

      if (message === "获取成功") {
        this.userInfo = data;
      }
    });
  },
  methods: {
    handleClick() {
      this.$dialog
        .confirm({
          title: "你确定真的要退出吗？"
        })
        .then(() => {
          localStorage.removeItem("userToken");
          localStorage.removeItem("userId");
          this.$router.replace("/login");
        })
        .catch(() => {
          // on cancel
        });
    }
  },
  components: {
    NavBars
  }
};
</script>

<style lang="less" scoped>
.phoneTop {
  .img {
    width: 100%;
  }
}

.userInfo {
  display: flex;
  align-items: center;
  padding: 30px 0;
  border-bottom: 4px solid #e4e4e4;
  .avatar {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border-radius: 50%;
    padding: 0 20px;
  }

  .userName {
    flex: 1;
    .userName-top {
      display: flex;
      vertical-align: middle;
      color: #333;
      .iconxingbienan {
        color: #66b4ea;
      }
      span {
        margin-left: 4px;
        font-size: 14px;
      }
    }

    .userName-bottom {
      color: #a0a0a0;
      font-size: 12px;
      padding: 2px;
    }
  }

  .iconarrow {
    color: #a6a6a6;
    padding-right: 12px;
  }
}
</style>