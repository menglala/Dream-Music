<template>
  <scroll 
    class="suggest-box"
    @scrollToEnd="_searchMove" 
    :pullup="pullup" 
    ref="scroller" 
    :data="result" 
    :beforeScroll="beforeScroll" 
    @beforeScroll="listScroll">
    <div class="suggest-list">
      <li v-for="(item, index) in result" :key="index" @click="selectItem(item)">
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <span v-html="showName(item)"></span>
      </li>
      <div> 
        <loading v-show="hasMore" title=""></loading>
      </div>
    </div>
    <div class="no-result-wrapper" v-show="!hasMore&&!result.length">
      <no-result  title="抱歉 ! 暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script>
import { search } from '../api/index.js'
import { createSong } from '../common/js/Song.js'
import scroll from '../base/scroll'
import loading from '../base/loading'
import {mapActions} from 'vuex'
import noResult from '../base/no-result'

const perpage = 20

export default {
  props: {
    query: {
      type: String,
      default: ''
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return { page: 1, result: [], hasMore: true,flag:true,pullup:true,beforeScroll:true, }
  },
  created() {
    this._search()
  },
  methods: {
    ...mapActions([
      'insertSong'
    ]),
    listScroll(){
      this.$emit('listenScroll')
    },
    selectItem(item){
      if (item.TYPE==='singer') {
        this.$router.push(`/search/${item.singermid}`)
      }else{
        this.insertSong(item)
      }
      this.$emit('select',this.query)
    },
    _searchMove() {
      if (!this.hasMore||!this.flag) {
        return
      }
      this.flag=false
      this.page++
      search(this.query, this.page, this.showSinger, perpage).then(res => {
        if (res.code === 0) {
          this.result=this.result.concat(this.getResult(res.data))
          this.checkMove(res.data)
          this.flag=true
        }
      })
    },
    checkMove(data) {
      const song = data.song
      if (!song.list.length || (song.curnum + perpage * song.curpage) > song.totalnum) {
        this.hasMore = false
      }
    },
    showName(item) {
      if (item.TYPE === 'singer') {
        return item.singername
      } else {
        return `${item.name} - ${item.singer}`
      }
    },
    getIconCls(item) {
      if (item.TYPE === 'singer') {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    _search() {
      this.page = 1
      this.hasMore=true
      this.$refs.scroller.scrollTo(0,0)
      search(this.query, this.page, this.showSinger, perpage).then(res => {
        this.result = this.getResult(res.data)
      })
    },
    getResult(data) {
      let ret = []
      if (data.zhida && data.zhida.singerid&&this.page === 1 ) {
        ret.push({ ...data.zhida, ...{ TYPE: 'singer' } }) // 对象的扩展运算符
      }
      if (data.song) {
        ret = ret.concat(this.normalizeList(data.song.list))
      }
      return ret // [{...}.Array[20]]
    },
    normalizeList(list) {
      let ret = []
      list.forEach(item => {
        ret.push(createSong(item))
      })
      return ret
    }
  },
  watch: {
    query(newVal) {
      this._search(newVal)
    }
  },
  components: {
    loading,scroll,noResult
  }
}
</script>

<style lang="less" scoped>
.no-result-wrapper{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width:100%;
}
.suggest-box {
  width: 100%;
  overflow: hidden;
  height: 100%;
}
.suggest-list {
  padding: 0 30px;
  // position: relative;
  li {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    .icon {
      width: 30px;
      flex: 0 0 30px;
      i {
        font-size: 14px;
        color: hsla(0, 0, 100%, 0.5);
      }
    }
    span {
      flex: 1;
      color: hsla(0, 0, 100%, 0.5);
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>