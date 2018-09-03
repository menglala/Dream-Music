// 和mutations一样,导入mutations-types操作
import * as types from './mutations-types'
import playMode from '../common/js/playMode'
import { shuffle } from '../common/js/util'

function findIndex(list,song) {
  let findIndex=list.findIndex(item=>{
    return item.id===song.id
  })
  return findIndex
}

//第一个参数是个对象,是commit和state
export const selectPlay = function({ commit, state }, { list, index }) {
  //执行commit操作
  commit(types.SET_SEQUENCE_LIST, list)
  if (state.mode===playMode.random) {
    let randomList=shuffle(list)
    commit(types.SET_PLAY_LIST,randomList)
    index=findIndex(randomList,list[index])
  }else{
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
