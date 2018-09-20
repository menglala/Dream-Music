<template>
  <div class="wrap">
    <scroll ref="scroll" class="scroller">
      <div>
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
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
import swiper from '../base/swiper'
import { getRecommend, getDiscList } from '../api/index.js'
import { ERR_OK } from '../api/commonParams.js'
import { mapMutations } from 'vuex'
import scroll from '../base/scroll'

export default {
  data() {
    return { data: {}, discList: [] }
  },
  components: {
    swiper,
    scroll
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
    }
  }
}
</script>

<style lang="less" scoped>  
@import "../common/less/variable.less";
//scroller组件定位用relative,否则会溢出父容器
.wrap{
  position: fixed;top: 88px;left: 0;width: 100%;bottom:0;overflow: hidden;
  .scroller{height: 100%;overflow: hidden;}
.recommend-content {
  width: 100%;
  ul {width: 100%}
  li { padding: 0 20px 20px 20px; width: calc(100% - 40px); display: flex; align-items: center; 
  .text{ font-size: 14px;margin: 0 0 0 20px; width: calc(100% - 80px);display: inline-block;strong{margin-bottom: 10px;display: inline-block;};span{color: @color-text-l}}}
  h1 { color: @color-theme; text-align: center;  padding: 12px; font-size: 14px;}
  img { width: 60px; height: 60px;}
  }
  }
</style>
