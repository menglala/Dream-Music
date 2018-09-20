import { mapMutations, mapGetters, mapActions } from 'vuex'
import playMode from './playMode.js'
import { shuffle } from './util.js'

export const playMixin = {
  computed: {
    ...mapGetters([
      'sequenceList',
      'currentSong',
      'mode',
      'playList',
      'favoriteList'
    ]),
    iconMode() {
      return this.mode === playMode.random
        ? 'icon-random'
        : this.mode === playMode.sequence
          ? 'icon-sequence'
          : 'icon-loop'
    }
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULLSCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setPlayList: 'SET_PLAY_LIST'
    }),
    ...mapActions(['deleteFavoriteList', 'saveFavoriteList']),
    toggleFavorite(item) {
      if (this.isFavorite(item)) {
        this.deleteFavoriteList(item)
      } else {
        this.saveFavoriteList(item)
      }
    },
    getFavoriteIcon(item) {
      if (this.isFavorite(item)) {
        return 'icon-favorite'
      } else {
        return 'icon-not-favorite'
      }
    },
    isFavorite(song) {
      const index = this.favoriteList.findIndex(item => {
        return item.id === song.id
      })
      return index > -1  // 返回布尔值,index>-,否则为false 
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
    }
  }
}

export const searchMixin = {
  computed: {
    ...mapGetters(['searchHistory'])
  },
  methods: {
    ...mapActions(['saveSearchHistory', 'deleteSearchHistory']),
    addQuery(item) {
      this.query = item
      // 点击热门搜索时,搜索框自动补充搜索热词
      this.$refs.searchBox.setQuery(item)
      this.saveSearchHistory(item)
    },
    blurInp() {
      this.$refs.searchBox.blur()
    }
  }
}
