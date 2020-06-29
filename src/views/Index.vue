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
      <van-tab v-for="topicList in topicLists" :key="topicList.id" :title="topicList.name">

        <van-list 
          v-model="topicList.loading" 
          :finished="topicList.finished" 
          finished-text="没有更多了" 
          @load="loadMorePost"
          :immediate-check="false"
        >
          <!-- 文章具体内容页 -->
          <post :postList="postList" v-for="postList in topicList.posts" :key="postList.id" />
        </van-list>

      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import post from "@/components/Post";

export default {
  data() {
    return {
      activeTab: 0,
      topicLists: []
    };
  },

  created() {
    this.getCategory();
  },

  computed: {
    categoryId() {
      const currentCategory = this.topicLists[this.activeTab];

      return currentCategory.id;
    }
  },

  watch: {
    activeTab() {
      const currentCategory = this.topicLists[this.activeTab];

      if (currentCategory.posts.length === 0) {
        this.loadPost();
      }
    }
  },

  methods: {
    getCategory() {
      this.$axios({
        url: "/category"
      }).then(res => {
        console.log("栏目列表结果", res);

        const newData = res.data.data.map(topicList => {
          return {
            ...topicList,
            posts: [],
            pageIndex:1,
            pageSize:4,
            loading:false,
            finished:false
          };
        });

        this.topicLists = newData;

        console.log("新的栏目列表结果", this.topicLists);

        this.loadPost();
      });
    },

    loadPost() {
      const currentCategory = this.topicLists[this.activeTab];

      this.$axios({
        url: "/post",
        params: {
          pageIndex:currentCategory.pageIndex,
          pageSize:currentCategory.pageSize,
          category: this.categoryId
        }
      }).then(res => {
        // console.log('文章列表结果',res);

        // currentCategory.posts = res.data.data;
        currentCategory.posts = [...currentCategory.posts,...res.data.data];

        currentCategory.loading = false;

        if(res.data.data.length<currentCategory.pageSize){
          currentCategory.finished = true;
        }
      });
    },

    loadMorePost(){
      const currentCategory = this.topicLists[this.activeTab];

      currentCategory.pageIndex += 1;

      this.loadPost();
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