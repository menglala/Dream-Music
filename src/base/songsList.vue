<template>
  <div class="wrapper">
    <div class="songs-list">
      <ul>
        <li v-for="(song, index) in musicList" :key="index" @click="selectSong(musicList,index)">
          <div class="rank"></div>
          <div class="songText">
            <h2>{{song.name}}</h2>
            <p>{{describe(song.singer,song.name)}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { createSong } from '../common/js/Song.js'
import { mapActions } from 'vuex'

export default {
  props: {
    songsList: {
      type: Array,
      default: ''
    }
  },
  data() {
    return { musicList: [] }
  },
  created() {
    this.normalizeList()
  },
  watch: {
    songsList() {
      this.normalizeList()
    }
  },
  methods: {
    normalizeList() {
      this.songsList.forEach(item => {
        if (item.musicData) {
          this.musicList.push(createSong(item.musicData))
        } else {
          this.musicList.push(createSong(item))
        }
      })
    },
    describe(singer, name) {
      return `${singer} - ${name}`
    },
    selectSong(songs, index) {
      this.selectPlay({ list: songs, index: index })
    },
    ...mapActions(['selectPlay'])
  }
}
</script>

<style lang="less" scoped>
.wrapper {
  padding: 20px 30px;
  width: calc(100% - 60px);
  transform-origin: top;
  li {
    font-size: 14px;
    display: flex;
    justify-content: center;
    flex: 1;
    height: 64px;
    flex-direction: column;
    line-height: 20px;
    h2,
    p {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    p {
      color: hsla(0, 0%, 100%, 0.3);
      margin-top: 4px;
    }
  }
}
</style>