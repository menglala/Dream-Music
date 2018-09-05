<template>
  <div><scroller class="wrap" ref="scroll">
    <div :on-refresh="refresh" :on-infinite="infinite" class="scroller">
      <swiper :swiperSlides="this.data.slider"></swiper>
      <div class="recommend-content">
        <h1>热门歌单推荐</h1>
        <ul>
          <li v-for="(disc,key) in discList" :key="key" @click="selectDisc(disc)">
            <img :src="disc.imgurl">
            <div class="text">
              <strong v-html="disc.creator.name"></strong><br>
              <span>{{disc.dissname}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </scroller>
  <router-view></router-view>
  </div>
</template>

<script>
import swiper from '../base/swiper'
import { getRecommend, getDiscList } from '../api/index.js'
import { ERR_OK } from '../api/commonParams.js'
import { mapMutations } from 'vuex'
import Vue from 'vue'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

export default {
  data() {
    return { data: {}, discList: [] }
  },
  components: {
    swiper
  },
  created() {
    this._getRecommend()
    this._getDiscList()
  },
  methods: {
    ...mapMutations({
      setDisc: 'SET_DISC'
    }),
    selectDisc(item) {
      this.$router.push(`/recommend/${item.dissid}`)
      this.setDisc(item)
    },
    _getRecommend() {
      getRecommend()
        .then(res => {
          if (res.code === ERR_OK) {
            this.data = res.data
          }
        })
        .catch(err => console.log(err))
    },
    _getDiscList() {
      getDiscList()
        .then(res => {
          if (res.code === ERR_OK) {
            this.discList = res.data.list
          }
        })
        .catch(err => console.log(err))
    },
    async refresh(done) {
      await this._getRecommend() // 下拉更新
      done() // done()表示这次异步加载数据完成，加载下一次
    },
    async infinite() {
      // 底部加载数据
      await this._getDiscList()
      this.$refs.scroll.finishInfinite(true) // 表示停止上拉加载更多，里面是一个boolean参数，说明是否还有更多数据，如果传入true就会显示noDataText里面的字符串了。noDataText就是没有数据后提示的文字
    }
  }
}
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
