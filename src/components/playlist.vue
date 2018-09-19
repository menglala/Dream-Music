<template>
  <div class="playlist" v-show="showFlag">
    <div class="list-wrapper" @click.stop>
      <div class="list-header">
        <h1 class="icon">
          <i :class="iconMode" @click="changeMode"></i>
          <span class="text">{{modeText}}</span>
          <span class="clear" @click.stop="showConfirm">
            <i class="icon-clear"></i>
          </span>
        </h1>
      </div>
      <scroll class="list-content" ref="scrollList" :data="sequenceList">
        <transition-group class="list" tag="ul" name="songs">
          <li v-for="(item, index) in sequenceList" :key="index" class="icon" ref="listItems" @click="selectItem(item,index)">
            <i :class="getCurrentIcon(item)" class="current"></i>
            <span class="text" v-html="item.name"></span>
            <span class="like">
              <i class="icon-not-favorite"></i>
            </span>
            <span class="delete" @click.stop="deleteItem(item)">
              <i class="icon-delete"></i>
            </span>
          </li>
        </transition-group>
      </scroll>
      <div class="list-operate">
        <div class="icon add" @click="showAddSong">
          <i class="icon-add"></i>
          <span class="text">添加歌曲到队列</span>
        </div>
      </div>
      <div class="list-close" @click.stop="hide">
        <span class="text">关闭</span>
      </div>
    </div>
    <div class="confirm-wrapper" @click.stop>
      <confirm ref="confirm" text="确定要清空歌曲列表吗?" @confirm="deleteSongslist"></confirm>
    </div>
    <add-song ref="addSong"></add-song>
  </div>
</template>

<script>
import { mapActions, } from 'vuex'
import scroll from '../base/scroll'
import playMode from '../common/js/playMode.js'
import confirm from '../base/confirm'
import {playMixin} from '../common/js/mixin.js'
import addSong from '../components/add-song'

export default {
  mixins:[playMixin],
  data() {
    return { showFlag: false }
  },
  computed: {
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
    ...mapActions(['deleteSong','clearSongslist']),
    showAddSong(){
      this.$refs.addSong.show()
    },
    showConfirm(){
      this.$refs.confirm.show()
    },
    deleteSongslist(){
      this.clearSongslist()
      this.hide()
    },
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
      this.setPlayingState(true)
    }
  },
  watch: {
    currentSong(newSong, oldSong) {
      if (!newSong.id || newSong.id === oldSong.id) {
        return
      }
      this.getCurrentIcon(newSong)
      setTimeout(() => {
        this.scrollToCurrent(newSong)
      }, 20)
    }
  },
  components: { scroll,confirm,addSong }
}
</script>

<style lang="less" scoped>
.songs-enter-active,
.songs-leave-active {
  transition: all 0.1s;
}
.songs-enter,
.songs-leave-to {
  height: 0;
}
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
