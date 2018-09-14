let getters = {
  playing: state => state.playing,
  fullScreen: state => state.fullScreen,
  sequenceList: state => state.sequenceList,
  mode: state => state.mode,
  playList: state => state.playList,
  currentIndex: state => state.currentIndex,
  currentSong: state => {
    return state.playList[state.currentIndex] || {}
  },
  disc: state => state.disc,
  topList:state=>state.topList,
  query:state=>state.query,
  searchHistory:state=>state.searchHistory,
}

export default getters
