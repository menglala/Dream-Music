// 和mutations一样,导入mutations-types操作
import * as types from './mutations-types'
import playMode from '../common/js/playMode'
import { shuffle } from '../common/js/util'
import { saveSearch, deleteSearch, clearSearch ,savePlay,saveFavorite,deleteFavorite} from '../common/js/cache'

function findIndex(list, song) {
  let findIndex = list.findIndex(item => {
    return item.id === song.id
  })
  return findIndex
}

//第一个参数是个对象,是commit和state
export const selectPlay = function({ commit, state }, { list, index }) {
  //执行commit操作
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode === playMode.random) {
    let randomList = shuffle(list)
    commit(types.SET_PLAY_LIST, randomList)
    index = findIndex(randomList, list[index])
  } else {
    commit(types.SET_PLAY_LIST, list)
  }
  commit(types.SET_CURRENT_INDEX, index)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const randomPlay = function({ commit, state }, { list }) {
  commit(types.SET_PLAY_MODE, playMode.random)
  commit(types.SET_SEQUENCE_LIST, list)
  let randomList = shuffle(list)
  commit(types.SET_PLAY_LIST, randomList)
  commit(types.SET_CURRENT_INDEX, 0)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

export const insertSong = function({ commit, state }, song) {
  let playlist = state.playList.slice()
  let sequencelist = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let currentSong = playlist[currentIndex]

  let fpIndex = findIndex(playlist, song)
  currentIndex++
  playlist.splice(currentIndex, 0, song)
  if (fpIndex > -1) {
    if (fpIndex < currentIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }

  let currentSIndex = findIndex(sequencelist, currentSong)
  currentSIndex++
  let fsIndex = findIndex(sequencelist, song)
  sequencelist.splice(currentSIndex, 0, song)
  if (fsIndex > -1) {
    if (fsIndex < currentSIndex) {
      sequencelist.splice(fsIndex, 1)
    } else {
      sequencelist.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAY_LIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequencelist)
  commit(types.SET_FULLSCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
  commit(types.SET_CURRENT_INDEX, currentIndex)
}

export const saveSearchHistory = function({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function({ commit }, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}
export const clearSearchHistory = function({ commit }) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

export const deleteSong=function ({commit,state},song){
  let playlist = state.playList.slice()
  let sequencelist = state.sequenceList.slice()
  let currentIndex = state.currentIndex

  let pIndex=findIndex(playlist,song)
  if (pIndex>-1) {
     playlist.splice(pIndex,1)
  }
  if (pIndex<currentIndex) {
    currentIndex--
  }

  let sIndex=findIndex(sequencelist,song)
    sequencelist.splice(sIndex,1)
  
  commit(types.SET_PLAY_LIST,playlist)
  commit(types.SET_SEQUENCE_LIST,sequencelist)
  commit(types.SET_CURRENT_INDEX,currentIndex)
  commit(types.SET_PLAYING_STATE,true)

  if (!playlist.length) {
    commit(types.SET_PLAYING_STATE,false)
  }
}

export const clearSongslist = function ({ commit }) {
  commit(types.SET_CURRENT_INDEX,-1)
  commit(types.SET_PLAY_LIST,[])
  commit(types.SET_SEQUENCE_LIST,[])
  commit(types.SET_PLAYING_STATE,false)
}

export const savePlayHistory=function ({commit},song) {
  commit(types.SET_PLAY_HISTORY,savePlay(song))
}

export const saveFavoriteList=function ({commit},song) {
  commit(types.SET_FAVORITE_LIST,saveFavorite(song))
}

export const deleteFavoriteList = function ({ commit }, song) {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}