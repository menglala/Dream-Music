import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getter' 
// 在actions.js中没有默认导出actions所以需要用* as 引入
import * as actions from './actions'
import mutations from './mutations'
import playMode from '../common/js/playMode'
import { loadSearchHistory,loadPlayHistory } from '../common/js/cache'

Vue.use(Vuex)

const state = {
  playing: false,
  fullScreen: true, //是否全屏播放
  sequenceList: [], // 歌曲播放的顺序列表
  currentIndex: -1,
  playList: [], // 歌曲播放列表
  mode: playMode.sequence, // 播放的模式 (顺序,随机,循环)
  disc:{},
  topList:{},
  query:'',
  searchHistory:loadSearchHistory(),
  playHistory: loadPlayHistory(),
}

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
})

export default store
