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
  disc: state => state.disc
}

export default getters
