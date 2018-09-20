<template>
  <div class="user-center" @click.stop>
    <div class="icon header">
      <i class="icon-back" @click.stop="back"></i>
      <switches :switches="switches" @switch="switchIndex" :currentIndex="currentIndex" @click.stop></switches>
    </div>
    <div class="icon play-btn" @click.stop="random">
      <i class="icon-play"></i>
      <span class="text">
        随机播放全部
      </span>
    </div>
    <div class="list-wrapper">
      <scroll class="list-scroll" v-if="currentIndex===0" :data="favoriteList" ref="favoritelist">
        <div class="list-inner">
          <songs :songs="favoriteList" @select="selectItem"></songs>
        </div>
      </scroll>
      <scroll class="list-scroll" v-show="currentIndex===1" :data="playHistory" ref="historyScroll">
        <songs :songs="playHistory" @select="selectItem"></songs>
      </scroll>
    </div>
    <div class="no-result-wrapper" v-show="noResult">
      <no-result :title="noResultDesc"></no-result>
    </div>
  </div>
</template>

<script>
import Switches from '../base/switch'
import { mapActions, mapGetters } from 'vuex'
import songs from '../base/songs'
import scroll from '../base/scroll'
import NoResult from '../base/no-result'

export default {
  data() {
    return {
      switches: [{ name: '我喜欢的' }, { name: '最近播放' }],
      currentIndex: 0
    }
  },
  computed: {
    ...mapGetters(['favoriteList', 'playHistory']),
    noResult() {
      if (this.currentIndex === 0) {
        return !this.favoriteList.length
      } else {
        return !this.playHistory.length
      }
    },
    noResultDesc() {
      if (this.currentIndex === 0) {
        return '暂无收藏歌曲'
      } else {
        return '你还没有听过歌曲'
      }
    }
  },
  methods: {
    ...mapActions(['insertSong', 'randomPlay']),
    refreshList() {
      setTimeout(() => {
        if (this.currentIndex === 0) {
          this.$refs.favoritelist.refresh()
        } else {
          this.$refs.historyScroll.refresh()
        }
      }, 20)
    },
    switchIndex(index) {
      this.currentIndex = index
    },
    selectItem(item) {
      this.insertSong(item)
    },
    back() {
      this.$router.back()
    },
    random() {
      let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
      if (!list.length) {
        return
      }
      this.randomPlay({ list: list })
    }
  },
  watch: {
    currentIndex(newVal) {
      setTimeout(() => {
        this.refreshList()
      }, 20)
    }
  },
  mounted() {
    setTimeout(() => {
      this.refreshList()
    }, 20)
  },
  components: {
    Switches,
    songs,
    scroll,
    NoResult
  }
}
</script>

<style lang="less" scoped>
.user-center {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  top: 0;
  z-index: 100;
  background-color: #222;
  .header {
    margin: 10px 0 30px;
  }
  .icon-back {
    color: #ffcd32;
    display: block;
    position: absolute;
    top: 2px;
    left: 6px;
    font-size: 22px;
    padding: 10px;
  }
  .play-btn {
    box-sizing: border-box;
    width: 135px;
    padding: 7px 0;
    margin: 0 auto;
    text-align: center;
    border: 1px solid hsla(0, 0%, 100%, 0.5);
    color: hsla(0, 0%, 100%, 0.5);
    border-radius: 100px;
    font-size: 0;
    i {
      display: inline-block;
      vertical-align: middle;
      margin-right: 6px;
      font-size: 16px;
    }
    .text {
      display: inline-block;
      vertical-align: middle;
      font-size: 12px;
    }
  }
  .list-wrapper {
    position: absolute;
    top: 110px;
    bottom: 0;
    width: 100%;
    .list-scroll {
      height: 100%;
      overflow: hidden;
      padding: 20px 30px;
    }
  }
  .no-result-wrapper {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
