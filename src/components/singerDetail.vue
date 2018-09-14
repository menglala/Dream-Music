<template>
  <!-- 页面发生滚动时,触发滚动事件的是singer-detail,所以选择在这里加滚动事件,在 歌曲列表加事件并不能触发 -->
  <div class="singer-detail" @scroll="scroll">
    <!-- 使用v-if渲染dom,渲染事件延迟了不少,导致拿不到背景图片的高度 -->
    <div class="bgImg" :style="{backgroundImage:`url(${singer.bgImage})`}" ref="bgImg">
      <div class="icon" @click="back">
        <i class="icon-back"></i>
      </div>
      <h1 v-html="singer.name"></h1>
      <div class="play-wrapper" ref="randomPlay">
        <div class="icon-autoplay" v-if="songsList.length" @click="random">
          <i class="icon-play"></i>
          <span>随机播放全部</span>
        </div>
      </div>
      <div class="filter"></div>
      <div class="layer" ref="layer"></div>
    </div>

    <div class="listWrapper" ref="musicList">
      <songs-list :songsList="songsList"></songs-list>
    </div>
    <div class="loading-wrapper" v-if="!songsList.length">
      <loading></loading>
    </div>
  </div>
</template>

<script>
import { getSingerInfo } from '../api/index.js'
import { ERR_OK } from '../api/commonParams.js'
import SingerInfo from '../common/js/SingerInfo.js'
import songsList from '../base/songsList'
import loading from '../base/loading'
import { mapActions } from 'vuex'
import { createSong } from '../common/js/Song.js'

const RETAIN_HEIGHT = 40 // 列表上滑时图片的最低高度

export default {
  data() {
    return {
      id: '',
      singer: {},
      songsList: [],
      scrollY: 0,
      imgHeight: 0
    }
  },
  created() {
    this.id = this.$route.params.id
    if (!this.id) {
      this.$router.push('/singer')
    }
    this._getSingerInfo()
  },
  methods: {
    ...mapActions(['randomPlay']),
    _getSingerInfo() {
      getSingerInfo(this.id).then(res => {
          if (res.code === ERR_OK) {
            let singerData = res.data
            this.songsList = singerData.list
            this.singer = new SingerInfo({
              mid: singerData.singer_mid,
              name: singerData.singer_name
            })
          }
        })
        .catch(err => console.log(err))
    },
    random() {
      let songs = []
      this.songsList.forEach(item => {
        songs.push(createSong(item.musicData))
      })
      this.randomPlay({ list: songs })
    },
    back() {
      this.$router.back()
    },
    scroll(e) {
      let target = e.target
      this.scrollY = e.target.scrollTop // 记录滚动条滚动的Y值
    },
    initListTop() {
      let bgImg = this.$refs.bgImg
      this.imgHeight = bgImg.clientHeight
      this.$refs.musicList.style.top = this.imgHeight + 'px' // 初始化列表位置在图片下
    }
  },
  mounted() {
    setTimeout(() => {
      this.initListTop()
    }, 200)
  },
  watch: {
    scrollY(newVal) {
      let bgImg = this.$refs.bgImg
      let randomPlay = this.$refs.randomPlay
      let maxScrollY = -this.imgHeight + RETAIN_HEIGHT // 列表上滑的最大距离
      let imgZIndex = 0
      let layer = this.$refs.layer

      // 使用'[]'来添加未定义得属性
      if (-newVal < maxScrollY) {
        // 当列表划出最大距离时,令图片高度为最低高度
        bgImg.style.padding = 0
        bgImg.style.height = RETAIN_HEIGHT + 'px'
        imgZIndex = 100
        randomPlay.style.display = 'none'
      } else {
        bgImg.style.paddingTop = '70%'
        bgImg.style.height = ''
        imgZIndex = 0
        randomPlay.style.display = ''
      }
      let targetY = Math.max(maxScrollY, -newVal) // 上滑距离不超过最大距离

      layer.style[`transform`] = `translate3d(0,${targetY}px,0)`
      layer.style[`webkitTransform`] = `translate3d(0,${targetY}px,0)`
      bgImg.style['z-index'] = imgZIndex
    }
  },
  components: {
    songsList,
    loading
  }
}
</script>

<style lang="less" scoped>
@import '../common/less/variable.less';

.loading-wrapper {
  position: absolute;
  top: 50%;
  width: 100%;
  z-index: 50;
}
.singer-detail {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 0;
  overflow: scroll;
  background-color: @color-background;
  z-index: 15;
}

.bgImg {
  width: 100%;
  position: fixed;
  padding-top: 70%; /*为了以父元素的宽度的70%为比例设置宽高而使用padding-top设置元素的高度*/
  background-size: cover;
  z-index: 50;
  top: 0;
  h1 {
    color: #fff;
    font-size: 18px;
    position: absolute;
    width: 80%;
    top: 0;
    text-align: center;
    left: 10%;
    line-height: 40px;
    z-index: 16;
  }
  .icon {
    color: @color-theme;
    padding: 10px;
    font-size: 22px;
    position: absolute;
    z-index: 16;
    top: 0;
  }
}
.filter {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(7, 17, 27, 0.4);
  z-index: 12;
}
.play-wrapper {
  position: absolute;
  bottom: 20px;
  width: 100%;
  z-index: 18;
}
.icon-autoplay {
  color: @color-theme;
  width: 135px;
  margin: 0 auto;
  border: 1px solid @color-theme;
  text-align: center;
  border-radius: 100px;
  padding: 7px 0;
  font-size: 13px;
  font-weight: 400;
}
.layer {
  background-color: #222;
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 20;
}
.listWrapper {
  position: absolute;
  width: 100%;
  z-index: 50;
}
</style>
