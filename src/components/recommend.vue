<template>
  <div class="wrap">
    <scroller :on-refresh="refresh" :on-infinite="infinite" ref="scroll" class="scroller">
      <swiper :swiperSlides="this.data.slider"></swiper>
      <div class="recommend-content">
        <h1>热门歌单推荐</h1>
        <ul>
          <li v-for="(songlist,key) in data.songList" :key="key">
            <img :src="songlist.picUrl">
            <div class="text">
              <strong>{{songlist.songListAuthor}}</strong><br>
              <span>{{songlist.songListDesc}}</span>
            </div>
          </li>
        </ul>
      </div>
    </scroller>
  </div>
</template>

<script>
import swiper from "../base/swiper";
import { getRecommend } from "../api/index.js";
import { ERR_OK } from "../api/commonParams.js";
import Vue from "vue";
import VueScroller from "vue-scroller";
Vue.use(VueScroller);

export default {
  data() {
    return { data: {} };
  },
  components: {
    swiper
  },
  created() {
    this._getRecommend();
  },
  methods: {
    _getRecommend() {
      getRecommend()
        .then(res => {
          if (res.code === ERR_OK) {
            this.data = res.data;
          }
        })
        .catch(err => console.log(err));
    },
    async refresh(done) {
      //下拉更新
      await this._getRecommend();
      done(); //done()表示这次异步加载数据完成，加载下一次
    },
    async infinite() {
      //底部加载数据
      await this._getRecommend();
      this.$refs.scroll.finishInfinite(true); //表示停止上拉加载更多，里面是一个boolean参数，说明是否还有更多数据，如果传入true就会显示noDataText里面的字符串了。noDataText就是没有数据后提示的文字
    }
  }
};
</script>

<style lang="less" scoped>  
@import "../common/less/variable.less";
//scroller组件定位用relative,否则会溢出父容器
.wrap{.scroller{position: relative;}; position: fixed;top: 88px;left: 0;width: 100% }
.recommend-content {
  width: 100%;
  ul {width: 100%}
  li { padding: 0 20px 20px 20px; width: calc(100% - 40px); display: flex; align-items: center; 
  .text{ font-size: 14px;margin: 0 0 0 20px; width: calc(100% - 80px);display: inline-block;strong{margin-bottom: 10px;display: inline-block;};span{color: @color-text-l}}}
  h1 { color: @color-theme; text-align: center;  padding: 12px; font-size: 14px;}
  img { width: 60px; height: 60px;}
}
</style>
