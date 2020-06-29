<template>
  <div class="post">
    <!-- 情况1：大于0张小于3张的文章 -->
    <div class="onePic" v-if="postList.type===1 && postList.cover.length>0 && postList.cover.length<3">
      <div class="onePic_left">
        <div class="title">{{ postList.title }}</div>
        <div class="from">{{ postList.user.nickname }} {{ postList.comment_length }}跟帖</div>
      </div>

      <img :src="postList.cover[0].url" alt class="img" />
    </div>
    <!-- 情况2：大于2张的文章 -->
    <div class="morePic" v-if="postList.type===1 && postList.cover.length>=3">
      <div class="title">{{ postList.title }}</div>

      <div class="img">
        <img :src="postList.cover[0].url" alt />
        <img :src="postList.cover[1].url" alt />
        <img :src="postList.cover[2].url" alt />
      </div>

      <div class="from">{{ postList.user.nickname }} {{ postList.comment_length }}跟帖</div>
    </div>

    <!-- 情况3：视频 -->
    <div class="video" v-if="postList.type===2">
      <div class="title">{{ postList.title }}</div>

      <div class="imgs">
        <img :src="postList.cover[0].url" alt class="img" />
        <div class="iconfont iconshipin"></div>
      </div>

      <div class="from">{{ postList.user.nickname }} {{ postList.comment_length }}跟帖</div>
    </div>
  </div>
</template>

<script>
export default {
    props: ['postList']
};
</script>

<style lang="less" scoped>
.onePic {
  display: flex;
  padding: 18px 8px 16px 8px;
  border-bottom: 1px solid #e4e4e4;

  .onePic_left {
    flex: 1;
    position: relative;

    .title {
      font-size: 14px;
      line-height: 20px;
      color: #333;
    }

    .from {
      font-size: 12px;
      position: absolute;
      left: 0;
      bottom: 0;
      color: #868686;
    }
  }

  .img {
    width: 148px;
    height: 90px;
    object-fit: cover;
  }
}

.morePic {
  padding: 18px 8px 8px 8px;
  border-bottom: 1px solid #e4e4e4;

  .title {
    font-size: 14px;
    line-height: 20px;
    color: #333;
  }

  .img {
    display: flex;
    justify-content: space-between;
    padding-top: 2px;

    img {
      width: 33%;
    }
  }

  .from {
    font-size: 12px;
    color: #868686;
    padding-top: 8px;
  }
}

.video {
  padding: 18px 8px 8px 8px;
  border-bottom: 1px solid #e4e4e4;

  .title {
    font-size: 14px;
    line-height: 20px;
    color: #333;
  }

  .imgs {
    position: relative;

    .img {
      width: 100%;
      height: 208px;
      object-fit: cover;
      padding-top: 4px;
    }

    .iconshipin {
      font-size: 50px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      color: rgba(255, 255, 255, .7);
    }
  }

  .from {
    font-size: 12px;
    color: #868686;
    padding-top: 8px;
  }
}
</style>