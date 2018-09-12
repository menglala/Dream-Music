<template>
  <div class="wrapper">
    <div class="songs-list">
      <ul>
        <li v-for="(song, index) in musicList" :key="index" @click="selectSong(musicList,index)">
          <div class="rank" v-show="showRank">
            <span class="icon" :class="getRankCls(index)" v-text="getRankText(index)">
            </span>
          </div>
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
    },
    showRank: {
        type: Boolean,
        default: false
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
        }else if(item.data){
          this.musicList.push(createSong(item.data))
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
    getRankCls(index){
      if (index<=2) {
        return `icon${index}`
      }else{
        return 'text'
      }
    },
    getRankText(index){
      if (index>2) {
        return index+1
      }
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
    flex: 1;
    align-items: center;
    height: 64px;
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
.rank{width: 25px;text-align: center;margin-right: 30px;flex: 0 0 25px;
.icon{width: 25px;height: 24px;background-size: 100%; display: inline-block;}
.icon0{background-image: url("../assets/first@3x.png")};
.icon1{background-image: url('../assets/second@3x.png')};
.icon2{background-image: url('../assets/third@3x.png')};
.text{color:#ffcd32;font-size: 16px;}
}
.songText{flex: 1;overflow: hidden;}
</style>