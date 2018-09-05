<template>
  <div class="player-wrapper" v-show="playList.length>0">
    <transition name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave">
      <div class="normal-player" v-show="fullScreen">
        <div class="bgImg">
          <img :src="currentSong.image">
        </div>
        <div class="top">
          <div class="icon" @click="back">
            <i class="icon-back"></i>
          </div>
          <h1>{{currentSong.name}}</h1>
          <h2>{{currentSong.singer}}</h2>
        </div>
        <div class="middle" @touchstart="middleTouchStart" @touchmove="middleTouchMove" @touchend="middleTouchEnd">
          <div class="middle-left" ref="middleCd">
            <div class="player-cd-wrap" ref="cd">
              <!-- <div class="player-cd"> -->
              <img :src="currentSong.image" :class="cdRotate">
              <!-- </div> -->
            </div>
            <div class="player-lyric-wrap">
              <p class="cd-lyric">{{playLyric}}</p>
            </div>
          </div>
          <scroller class="middle-right" ref="lyricList">
            <div class="lyric-wrapper">
              <p class="lyric" v-for="(line, index) in currentLyric.lines" :key="index" :class="{current:currentLine===index}" ref="lyricLine">
                {{line.txt}}
              </p>
            </div>
          </scroller>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" :class="{active:currentShow==='cd'}"></span>
            <span class="dot" :class="{active:currentShow==='lyric'}"></span>
          </div>
          <div class="progress-bar-wrapper">
            <div class="time time-progress">{{formatTime(currentTime)}}</div>
            <progress-bar :percent="percent" @percentChange="changePercent"></progress-bar>
            <div class="time time-duration">{{formatTime(currentSong.duration)}}</div>
          </div>
          <div class="icon-operator">
            <div class="icon-left">
              <i :class="iconMode" class="left" @click.stop.prevent="changeMode"></i>
            </div>
            <div class="icon-left">
              <i class="icon-prev left" @click.stop.prevent="prev"></i>
            </div>
            <div class="icon-center">
              <i :class="playIcon" class="center" @click.stop.prevent="togglePlaying"></i>
            </div>
            <div class="icon-right">
              <i class="icon-next right" @click.stop.prevent="next"></i>
            </div>
            <div class="icon-right">
              <i class="icon-favorite right"></i>
            </div>
          </div>
        </div>
      </div>

    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="img-wrapper">
          <img :src="currentSong.image" :class="cdRotate">
        </div>
        <div class="text">
          <h2>{{currentSong.name}} </h2>
          <span>{{currentSong.singer}} </span>
        </div>
        <div class="icon-contral" @click.stop="togglePlaying">
          <progress-circle :percent="percent" :radius="radius">
            <i :class="playIcon" class="mini-play-btn"></i>
          </progress-circle>
        </div>
        <div class="icon-contral">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio :src="currentSong.url" ref="audio" @canplay="ready" @error="error" @timeupdate="updateTime" @ended="end">
    </audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import animations from 'create-keyframe-animation'
import progressBar from '../base/progressBar'
import progressCircle from '../base/progressCircle'
import playMode from '../common/js/playMode.js'
import { shuffle } from '../common/js/util.js'
import Lyric from 'lyric-parser'
import Vue from 'vue'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)

export default {
  name: 'player',
  data() {
    return {
      songReady: false,
      currentTime: 0,
      radius: 32,
      currentShow: 'cd',
      currentLyric: {},
      currentLine: 0,
      initiate:false,
      playLyric:'',
    }
  },
  computed: {
    ...mapGetters([
      'playing',
      'fullScreen',
      'sequenceList',
      'playList',
      'currentSong',
      'currentIndex',
      'mode'
    ]),
    playIcon() {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    cdRotate() {
      return this.playing ? 'play' : 'pause'
    },
    percent() {
      return this.currentTime / this.currentSong.duration
    },
    iconMode() {
      return this.mode === playMode.random
        ? 'icon-random'
        : this.mode === playMode.sequence ? 'icon-sequence' : 'icon-loop'
    },
  },
  watch: {
    currentSong(oldSong, newSong) {
      if (newSong.id === oldSong.id) {
        return
      }
      this.$nextTick(() => {
        this.setPlayingState(true)
        this.$refs.audio.play()
        this.getLyric()
      })
    },
    playing(newState) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        newState ? audio.play() : audio.pause()
      })
    }
  },
  created() {
    this.touch = {}
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULLSCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAY_LIST'
    }),
    middleTouchStart(e){
      this.initiate=true
      this.touch.startX=e.touches[0].pageX
      this.touch.startY=e.touches[0].pageY
    },
    middleTouchMove(e){
      if (!this.initiate) {
        return
      }
      const deltaX=e.touches[0].pageX-this.touch.startX
      const deltaY=e.touches[0].pageY-this.touch.startY

      if ( Math.abs(deltaY) > Math.abs(deltaX) ) {
        return
      }

      const baseLeft=this.currentShow==='cd'?0:-window.innerWidth
      const offsetWidth=Math.min(0,Math.max(-window.innerWidth,baseLeft+deltaX))
      this.touch.percent=Math.abs(offsetWidth/window.innerWidth)
      this.$refs.lyricList.$el.style['transform']=`translate3d(${offsetWidth}px,0,0)`
      this.$refs.lyricList.$el.style['transformDuration']=0
      this.$refs.middleCd.style.opacity=1-this.touch.percent
      this.$refs.middleCd.style['transformDuration']=0
    },
    middleTouchEnd(e){
      let offsetWidth,opacity
      const time=300

      if (this.currentShow==='cd') {
        if (this.touch.percent>0.1) {
          this.currentShow='lyric'
          offsetWidth=-window.innerWidth
          opacity=0
        }else{
          offsetWidth=0
          opacity=1
        }
      }else{
        if (this.touch.percent<0.9) {
          this.currentShow='cd'
          offsetWidth=0
          opacity=1
        }else{
          offsetWidth=-window.innerWidth
          opacity=0
        }
      }
      this.$refs.lyricList.$el.style['transform']=`translate3d(${offsetWidth}px,0,0)`
      this.$refs.lyricList.$el.style['transformDuration']=time+'ms'
      this.$refs.middleCd.style.opacity=opacity
      this.$refs.middleCd.style['transformDuration']=time+'ms'
      this.initiate=false
    },
    handleLyric(lineNum, txt) {
      this.currentLine = this.currentLyric.curNum - 1
      if (this.playing) {
        if (this.currentLine > 5) {
          let targetEl = this.$refs.lyricLine[this.currentLine - 5]
          this.$refs.lyricList.scrollTo(0, targetEl.offsetTop, true)
        } else {
          this.$refs.lyricList.scrollTo(0, 0, true)
        }
      }
      this.playLyric=this.currentLyric.lines[this.currentLine].txt
    },
    getLyric() {
      this.currentSong._getLyric().then(res => {
        this.currentLyric = new Lyric(res, this.handleLyric)
        if (this.playList) {
          this.currentLyric.play()
        }
      })
    },
    changeMode() {
      const mode = (this.mode + 1) % 3 // 对3取余
      this.setPlayMode(mode)
      let list = []

      if (this.mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this.resetIndex(list)
      this.setPlayList(list)
    },
    resetIndex(list) {
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id
      })

      return this.setCurrentIndex(index)
    },
    changePercent(newPercent) {
      this.$refs.audio.currentTime = newPercent * this.currentSong.duration
      
      if (!this.playing) {
        this.togglePlaying()
      }

      this.currentLyric.seek(this.$refs.audio.currentTime*1000)
    },
    updateTime(e) {
      this.currentTime =
        e.target.currentTime > this.currentSong.duration
          ? this.currentSong.duration
          : e.target.currentTime
    },
    loop() {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      if (this.currentLyric) {
        this.currentLyric.seek(0)
      }
    },
    end() {
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.next()
      }
    },
    // 由于audio的当前播放时间是以秒为单位 要转化为分:秒的格式
    formatTime(interval) {
      interval = interval | 0
      let min = (interval / 60) | 0
      let second = this.pad(interval % 60)

      return `${min}:${second}`
    },
    // 对于一位数的秒 自动补零函数
    pad(num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    prev() {
      if (!this.songReady) return
      if (this.mode === playMode.loop) {
        this.loop()
        return
      }
      let index = this.currentIndex - 1
      if (index === -1) {
        index = this.playList.length - 1
      }
      this.setCurrentIndex(index)
      this.songReady = false
    },
    next() {
      if (!this.songReady) return
      if (this.mode === playMode.loop) {
        this.loop()
        return
      }
      let index = this.currentIndex + 1
      if (index === this.playList.length) {
        index = 0
      }
      this.setCurrentIndex(index)
      this.songReady = false
    },
    ready() {
      this.songReady = true // 快速切换时,避免歌曲未缓冲造成的无法加载歌曲,只有歌曲缓冲完成才能切换
    },
    error() {
      this.songReady = true // 网络错误时也可以使用上/下首
    },
    back() {
      this.setFullScreen(false)
    },
    open() {
      this.setFullScreen(true)
    },
    togglePlaying() {
      this.setPlayingState(!this.playing)
      this.currentLyric.togglePlay()
    },
    getPosandScale() {
      const miniWidth = 40,
        targetWidth = window.innerWidth * 0.8,
        miniLeft = 40,
        targetTop = 80,
        miniBottom = 30,
        scale = miniWidth / targetWidth
      let x = -(targetWidth / 2 - miniLeft)
      let y = window.innerHeight - targetTop - targetWidth / 2 - miniBottom

      return { x, y, scale }
    },
    enter(el, done) {
      const { x, y, scale } = this.getPosandScale()
      let animation = {
        // 进入的时候相对于大cd的位置(0,0,0),0s的时候在小cd的位置(-x,y,0)变形到大cd的位置(0,0,0),比例也变化1
        0: { transform: `translate3d(${x}px,${y}px,0) scale(${scale})` },
        60: { transform: `translate3d(0,0,0) scale(1.1)` },
        100: { transform: `translate3d(0,0,0) scale(1)` }
      }
      //在动画库的对象上注册动画animation
      animations.registerAnimation({
        name: 'move', // 插入自定义动画animation
        animation, // 动画基础配置
        prset: {
          duration: 400, // 动画持续时间
          easing: 'liner' // 过渡效果 -- 线性
        }
      }),
        // 绑定动画到dom元素,done是执行完动画的回调函数,执行done后跳入afterEnter()
        animations.runAnimation(this.$refs.cd, 'move', done)
    },
    afterEnter(el, done) {
      // 取消动画
      animations.unregisterAnimation('move')
      this.$refs.cd.style.animation = ''
    },
    leave(el, done) {
      this.$refs.cd.style.transition = 'all,0.4s'
      const { x, y, scale } = this.getPosandScale()
      // 离开的时候从大cd的原始位置(0,0,0)变化到小cd的位置(-x,y,0)
      this.$refs.cd.style[
        `transform`
      ] = `translate3d(${x}px,${y}px,0) scale(${scale})`
      this.$refs.cd.style[
        `webkitTransform`
      ] = `translate3d(${x}px,${y}px,0) scale(${scale})`
      // 添加动画完成后回调函数done
      this.$refs.cd.addEventListener('transitionend', done)
    },
    afterLeave(el, done) {
      this.$refs.cd.style.transform = ''
      this.$refs.cd.style.webkitTransform = ''
      this.$refs.cd.style.transition = ''
    }
  },
  components: {
    progressBar,
    progressCircle
  }
}
</script>

<style lang="less" scoped>
.player-lyric-wrap{width: 80%;margin: 30px auto;text-align: center;
.cd-lyric{color: hsla(0, 0%, 100%, 0.5);height: 20px;line-height: 20px;font-size: 14px;overflow: hidden;}
}
.middle-right {
  display: inline-block;
  overflow: hidden;
  vertical-align: top;
  width: 100%;
  height: 100%;
  position: relative;
  .lyric-wrapper {
    position: relative;
    height: 100%;
    margin: 0 auto;
    width: 80%;
    text-align: center;
    .lyric {
      width: 100%;
      line-height: 32px;
      height: auto;
      color: hsla(0, 0%, 100%, 0.5);
      font-size: 14px;
      word-break: break-all;
      overflow: hidden;
      &.current {
        color: #fff;
      }
    }
  }
}
.normal-enter-active,
.normal-leave-active {
  transition: all 0.4s;
  .top,
  .bottom {
    transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
  }
}
.normal-enter,
.normal-leave {
  opacity: 0;
  .top {
    transform: translate3d(0, -100px, 0);
  }

  .bottom {
    transform: translate3d(0, 100px, 0);
  }
}
.mini-enter-active,
.mini-leave-active {
  transition: all 0.4s;
}
.mini-enter,
.mini-leave-to {
  opacity: 0;
}
.img-wrapper {
  width: 40px;
  height: 40px;
  padding: 0 10px 0 20px;
  .play {
    animation: rotate 10s linear infinite;
  }
  .pause {
    animation-play-state: paused;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}

.text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  flex: 1;
  span,
  h2 {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    line-height: 20px;
  }
  h2 {
    font-size: 14px;
    color: #fff;
    margin-bottom: 2px;
  }
  span {
    font-size: 12px;
    color: hsla(0, 0%, 100%, 0.3);
  }
}
.icon-contral {
  width: 30px;
  padding: 0 10px;
  i {
    color: rgba(255, 205, 49, 0.5);
    font-size: 32px;
  }
}
.normal-player {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 120;
  background-color: #222;
}
.mini-player {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 60px;
  background-color: #333;
  width: 100%;
  z-index: 130;
  display: flex;
  align-items: center;
}
.mini-play-btn {
  position: absolute;
  top: 0;
  left: 0;
}
.icon {
  position: absolute;
  top: 0;
  left: 6px;
  transform: rotate(-90deg);
  padding: 9px;
  font-size: 22px;
  color: #ffcd32;
}
.top {
  margin: 0 0 25px 0;
  h2,
  h1 {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    color: #fff;
    text-align: center;
    width: 70%;
    margin: 0 auto;
    font-size: 18px;
    line-height: 40px;
  }
  h2 {
    line-height: 20px;
    font-size: 14px;
  }
}
.bgImg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.6;
  filter: blur(20px);
  -webkit-filter: blur(20px);
  img {
    width: 100%;
    height: 100%;
  }
}
.middle {
  position: fixed;
  width: 100%;
  top: 80px;
  bottom: 170px;
  white-space: nowrap;
  font-size: 0;
}
.player-cd-wrap {
  position: absolute;
  top: 0;
  width: 80%;
  left: 10%;
  height: 100%;
  box-sizing: border-box;
  .play {
    animation: rotate 20s linear infinite;
  }
  .pause {
    animation-play-state: paused;
  }
  img {
    width: 100%;
    height: 100%;
    border: 10px solid hsla(0, 0%, 100%, 0.1);
    border-radius: 50%;
    box-sizing: border-box;
  }
}
.middle-left {
  position: relative;
  width: 100%;
  padding-top: 80%;
  height: 0;
  vertical-align: top;
  display: inline-block;
}
.bottom {
  position: absolute;
  width: 100%;
  bottom: 50px;
}
.dot-wrapper {
  text-align: center;
  font-size: 0;
}
.dot {
  display: inline-block;
  /* vertical-align: middle; */
  margin: 0 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: hsla(0, 0%, 100%, 0.5);
}
.active {
  width: 20px;
  border-radius: 5px;
  background: hsla(0, 0%, 100%, 0.8);
}
.progress-bar-wrapper {
  width: 80%;
  display: flex;
  align-items: center;
  margin: 0 auto;
  padding: 10px 0;
  .time {
    font-size: 12px;
    width: 30px;
    line-height: 30px;
    color: #fff;
  }
  .time-duration {
    text-align: right;
  }
  .time-progress {
    text-align: left;
  }
}
.icon-operator {
  display: flex;
  align-items: center;
  color: #ffcd32;
  font-size: 30px;
  & > div {
    flex: 1;
  }
  .icon-left {
    text-align: right;
  }
  .icon-center {
    text-align: center;
    font-size: 40px;
    padding: 1px 20px;
  }
  .icon-right {
    text-align: left;
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>


