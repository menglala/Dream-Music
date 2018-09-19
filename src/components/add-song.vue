<template>
  <div class="add-song" v-show="showAdd">
    <div class="header">
      <h1 class="title">添加到歌曲列表</h1>
      <div class="icon close" @click="hide">
        <i class="icon-close"></i>
      </div>
    </div>
    <div class="search-box-wrapper">
      <search-box placeholder="搜索歌曲..." ref="searchBox" @query="search"></search-box>
    </div>
    <div class="shortcut" v-show="!query">
      <switches :switches="switches" @switch="switchItem" ref="switches" :currentIndex="currentIndex"></switches>
      <div class="list-wrapper">
        <scroll class="list-scroll" v-if="currentIndex===0" :data="playHistory" ref="songslist">
          <div class="list-inner">
            <songs :songs="playHistory" @select="selectItem"></songs>
          </div>
        </scroll>
        <scroll class="list-scroll" v-show="currentIndex===1" :data="searchHistory" ref="searchScroll" :refreshDelay="refreshDelay">
          <search-list @select="addQuery" @delete="deleteSearchHistory" :searches="searchHistory"></search-list>
        </scroll>
      </div>
    </div>
    <div class="search-result" v-show="query">
      <scroll ref="result-scroll">
        <div class="result">
          <suggest :query="query" :showSinger="showSinger" @select="selectSuggest" @listenScroll="blurInp"></suggest>
        </div>
      </scroll>
    </div>
    <top-tip ref="topTip">
      <div class="icon tip-title">
        <i class="icon-ok"></i>
        <span class="text">1首歌曲已经添加到播放列表</span>
      </div>
    </top-tip>
  </div>
</template>

<script>
import searchBox from '../base/search-box'
import switches from '../base/switch'
import songs from '../base/songs'
import searchList from '../base/search-list'
import scroll from '../base/scroll'
import suggest from '../components/suggest'
import { searchMixin } from '../common/js/mixin.js'
import { mapGetters, mapActions } from 'vuex'
import topTip from '../base/top-tips'

export default {
  mixins: [searchMixin],
  data() {
    return {
      switches: [{ name: '最近播放' }, { name: '搜索历史' }],
      showAdd: false,
      showSinger: false,
      currentIndex: 0,
      query: '',
      refreshDelay: 120
    }
  },
  computed: {
    ...mapGetters(['playHistory'])
  },
  methods: {
    ...mapActions(['insertSong']),
    selectItem(song, index) {
      if (index !== 0) {
        this.insertSong(song)
      }
      this.$refs.topTip.show()
    },
    selectSuggest(item) {
      this.$refs.topTip.show()
      this.saveSearchHistory(item)
    },
    search(newQuery) {
      this.query = newQuery
    },
    refreshList() {
      setTimeout(() => {
        if (this.currentIndex === 0) {
          this.$refs.songslist.refresh()
        } else {
          this.$refs.searchScroll.refresh()
        }
      }, 20)
    },
    switchItem(index) {
      this.currentIndex = index
    },
    show() {
      this.showAdd = true
      this.refreshList()
    },
    hide() {
      this.showAdd = false
    }
  },
  watch: {
    query(newVal) {
      if (!newVal) {
        this.refreshList()
      }
    },
    currentIndex(newVal) {
      this.refreshList()
    }
  },
  components: {
    searchBox,
    switches,
    songs,
    searchList,
    scroll,
    suggest,
    topTip
  }
}
</script>

<style lang="less" scoped>
@import '../common/less/variable.less';

.add-song {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 200;
  background-color: #222;
  width: 100%;
  .search-result {
    position: fixed;
    top: 124px;
    bottom: 0;
    width: 100%;
  }
  .search-box-wrapper {
    margin: 20px;
  }
  .header {
    position: relative;
    height: 44px;
    text-align: center;
    .title {
      font-size: 18px;
      line-height: 44px;
      color: #fff;
    }
    .close {
      position: absolute;
      top: 0;
      right: 8px;
      i {
        font-size: 20px;
        padding: 12px;
        color: #ffcd32;
        display: block;
      }
    }
  }
  .list-wrapper {
    position: absolute;
    top: 165px;
    bottom: 0;
    width: 100%;
    .list-scroll {
      height: 100%;
      overflow: hidden;
      padding: 20px 30px;
    }
  }
  .tip-title {
    text-align: center;
    padding: 18px 0;
    font-size: 0;
  }

  .icon-ok {
    font-size: @font-size-medium;
    color: @color-theme;
    margin-right: 4px;
  }

  .text {
    font-size: @font-size-medium;
    color: @color-text;
  }
}
</style>