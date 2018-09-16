<template>
  <div class="playlist" v-show="showFlag">
    <div class="list-wrapper" @click.stop>
      <div class="list-header">
        <h1 class="icon">
          <i :class="getPlayModeIcon"></i>
          <span class="text">{{modeText}}</span>
          <span class="clear">
            <i class="icon-clear"></i>
          </span>
        </h1>
      </div>
      <scroll class="list-content" ref="scrollList" :data="sequenceList">
        <transition-group class="list" tag="ul">
          <li v-for="(item, index) in sequenceList" :key="index" class="icon" ref="listItems" @click="selectItem(item,index)">
            <i :class="getCurrentIcon(item)" class="current"></i>
            <span class="text" v-html="item.name"></span>
            <span class="like">
              <i class="icon-not-favorite"></i>
            </span>
            <span class="delete" @click.stop.prevent="deleteItem(item)">
              <i class="icon-delete"></i>
            </span>
          </li>
        </transition-group>
      </scroll>
      <div class="list-operate">
        <div class="icon add">
          <i class="icon-add"></i>
          <span class="text">添加歌曲到队列</span>
        </div>
      </div>
      <div class="list-close" @click.stop="hide">
        <span class="text">关闭</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import scroll from '../base/scroll'
import playMode from '../common/js/playMode.js'

export default {
  data() {
    return { showFlag: false }
  },
  computed: {
    ...mapGetters(['sequenceList', 'currentSong', 'mode', 'playList']),
    getPlayModeIcon() {
      return this.mode === playMode.random
        ? 'icon-random'
        : this.mode === playMode.sequence ? 'icon-sequence' : 'icon-loop'
    },
    modeText() {
      return this.mode === playMode.random
        ? '随机播放'
        : this.mode === playMode.sequence ? '顺序播放' : '单曲循环'
    }
  },
  methods: {
    ...mapMutations({
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayState: 'SET_PLAYING_STATE'
    }),
    ...mapActions(['deleteSong']),
    deleteItem(item) {
      this.deleteSong(item)
      if (!this.playList.length) {
        this.hide()
      }
    },
    show() {
      this.showFlag = true
      setTimeout(() => {
        this.$refs.scrollList.refresh()
        this.scrollToCurrent(this.currentSong)
      }, 20)
    },
    hide() {
      this.showFlag = false
    },
    getCurrentIcon(item) {
      return item.id === this.currentSong.id ? 'icon-play' : ''
    },
    scrollToCurrent(current) {
      const index = this.sequenceList.findIndex(item => {
        return item.id === current.id
      })
      this.$refs.scrollList.scrollToElement(this.$refs.listItems[index], 300)
    },
    selectItem(song, index) {
      if (this.mode === playMode.random) {
        index = this.playList.findIndex(item => {
          return item.id === song.id
        })
      }
      this.setCurrentIndex(index)
      this.setPlayState(true)
    }
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!newSong || newSong.id === oldSong.id) {
        return
      }
      this.getCurrentIcon(newSong)
      this.scrollToCurrent(newSong)
    }
  },
  components: { scroll }
}
</script>

<style lang="less" scoped>
.playlist {
  position: fixed;
  left: 0;
  bottom: 0;
  top: 0;
  z-index: 300;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
}
.list-wrapper {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #333;
  .list-header {
    padding: 20px 30px 10px 20px;
    .icon {
      display: flex;
      align-items: center;
      i {
        font-size: 30px;
        color: rgba(255, 205, 49, 0.5);
        margin-right: 10px;
      }
      .text {
        font-size: 14px;
        flex: 1;
        color: hsla(0, 0%, 100%, 0.5);
      }
      .icon-clear {
        font-size: 14px;
        color: hsla(0, 0%, 100%, 0.3);
      }
    }
  }
  .list-content {
    max-height: 240px;
    overflow: hidden;
      &.list-enter-active,
      &.list-leave-active {
        transition: all 0.1s;
      }
      &.list-enter,
      &.list-leave-to {
        height: 0;
      }
    .list li {
      display: flex;
      height: 40px;
      align-items: center;
      padding: 0 30px 0 20px;
      overflow: hidden;
    
      i {
        width: 20px;
        font-size: 12px;
        color: rgba(255, 205, 49, 0.5);
        flex: 0 0 20px;
      }
      .text {
        font-size: 14px;
        color: hsla(0, 0%, 100%, 0.3);
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        flex: 1;
      }
      .like i {
        color: #ffcd32;
        font-size: 12px;
        margin-right: 15px;
      }
      .delete i {
        color: #ffcd32;
        font-size: 12px;
      }
    }
  }
  .list-operate {
    width: 140px;
    margin: 20px auto 30px;
    .add {
      display: flex;
      align-items: center;
      padding: 8px 16px;
      border: 1px solid hsla(0, 0%, 100%, 0.5);
      color: hsla(0, 0%, 100%, 0.5);
      border-radius: 100px;
      .icon-add {
        font-size: 10px;
        margin-right: 5px;
      }
      .text {
        font-size: 12px;
      }
    }
  }
  .list-close {
    text-align: center;
    color: hsla(0, 0%, 100%, 0.5);
    line-height: 50px;
    background-color: #222;
    font-size: 16px;
  }
}
</style>
