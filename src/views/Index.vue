<template>
  <div class="homePage">
    <!-- 手机顶部 -->
    <div class="phoneTop">
      <img src="@/assets/phoneTop.jpg" alt class="img" />
    </div>

    <!-- 搜索栏 -->
    <div class="search">
      <img src="@/assets/logo1.png" alt class="img" />

      <div class="middle">
        <div class="iconfont iconsousuo-"></div>
        <span>搜索新闻</span>
      </div>

      <div class="personal">
        <div class="iconfont iconwode1"></div>
      </div>
    </div>

    <!-- 文章整体区域 -->
    <!-- tab栏 -->
    <van-tabs v-model="activeTab">
      <van-tab v-for="topicList in topicLists" :key="topicList.id" :title="topicList.name"></van-tab>
    </van-tabs>

    <!-- 文章具体内容页 -->
    <post :postList="postList" v-for="postList in postLists" :key="postList.id"/>
  </div>
</template>

<script>
import post from "@/components/Post";

export default {
  data() {
    return {
      activeTab: 0,
      topicLists: [],
      postLists:[],
      pageIndex:1,
      pageSize:4
    };
  },

  created() {
    this.$axios({
      url: "/category"
    }).then(res => {
      console.log('栏目列表结果',res);

      this.topicLists = res.data.data;

      this.loadPost();
    });

  },

  watch: {
    activeTab(){
      this.loadPost();
    }
  },

  methods: {
    loadPost() {
      const currentCategory = this.topicLists[this.activeTab]

      const categoryId = currentCategory.id;

      this.$axios({
        url: "/post",
        params:{
          pageIndex:this.pageIndex,
          pageSize:this.pageSize,
          category:categoryId
        }
      }).then(res => {
        console.log('文章列表结果',res);

        this.postLists = res.data.data;
      });
    }
  },

  components: {
    post
  }
};
</script>

<style lang="less" scoped>
.homePage {
  .phoneTop {
    .img {
      width: 100%;
    }
  }

  .search {
    display: flex;
    align-items: center;
    background-color: red;
    height: 60px;
    padding: 0 20px;

    .img {
      width: 30px;
      height: 30px;
      object-fit: cover;
    }

    .middle {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 255, 225, 0.4);
      height: 38px;
      border-radius: 18px;
      color: #fff;
      margin: 0 30px 0 20px;

      span {
        margin-left: 4px;
        font-size: 14px;
      }
    }

    .personal {
      .iconwode1 {
        font-size: 24px;
        color: #fff;
      }
    }
  }
}
</style>