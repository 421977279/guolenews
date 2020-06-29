<template>
  <div>
    <!-- 手机顶部 -->
    <div class="phoneTop">
      <img src="@/assets/phoneTop.jpg" alt class="img" />
    </div>

    <!-- 导航标题 -->
    <div class="followNav">
      <topBars topBarsName="我的关注" />
    </div>

    <!-- 关注列表 -->
    <div class="myfollowLists" v-for="(followers,index) in followLists" :key="followers.id">
      <img
        v-if="followers.head_img"
        :src="$axios.defaults.baseURL + followers.head_img"
        alt
        class="img"
      />
      <img v-else src="@/assets/logo.png" alt class="img" />

      <div class="content">
        <div class="contentName">{{ followers.nickname }}</div>

        <div class="date">{{ followers.create_date.split('T')[0] }}</div>
      </div>

      <div v-if="followers.isFollow" class="unfollow" @click="unfollow(index,followers.id)">取消关注</div>

      <div v-else class="follow" @click="follow(index,followers.id)">关注TA</div>
    </div>
  </div>
</template>

<script>
import topBars from "@/components/TopBars";

export default {
  data() {
    return {
      followLists: []
    };
  },
  created() {
    this.$axios({
      url: "/user_follows"
    }).then(res => {
      // console.log('用户关注列表',res);
      this.followLists = res.data.data;
      console.log("用户关注列表数组", this.followLists);

      const newData = res.data.data.map(follower => {
        return { ...follower, isFollow: true };
      });

      this.followLists = newData;
      console.log("用户关注 新的数组", this.followLists);
    });
  },
  methods: {
    unfollow(index,id) {
      // console.log(index);

      this.followLists[index].isFollow = false;

      this.$axios({
        url: "/user_unfollow/" + id
      }).then(res => {
        // console.log('取消关注用户结果',res);
        const { message } = res.data;
        if(message==="取消关注成功"){
          this.$toast.success('取消关注成功')
        }
      });
    },

    follow(index,id) {
      this.followLists[index].isFollow = true;

      this.$axios({
        url: "/user_follows/" + id
      }).then(res => {
        // console.log('取消关注用户结果',res);
        const { message } = res.data;
        if(message==="关注成功"){
          this.$toast.success('关注成功')
        }
      });
    }
  },
  components: {
    topBars
  }
};
</script>

<style lang="less" scoped>
.phoneTop {
  .img {
    width: 100%;
  }
}

.myfollowLists {
  display: flex;
  align-items: center;
  padding: 22px 20px;
  border-bottom: 1px solid #d9d9d9;

  .img {
    width: 46px;
    height: 46px;
    border-radius: 50%;
  }

  .content {
    flex: 1;
    padding-left: 16px;

    .contentName {
      font-size: 16px;
      color: #333;
      padding-bottom: 4px;
    }

    .date {
      font-size: 14px;
      color: #717171;
    }
  }

  .unfollow,
  .follow {
    font-size: 10px;
    width: 70px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background-color: #e1e1e1;
    border-radius: 14px;
  }

  .follow {
    color: #fff;
    background-color: red;
  }
}
</style>