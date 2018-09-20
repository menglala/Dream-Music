import storage from 'good-storage'

function insertArray(arr, val, compare, maxLength) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLength && arr.length > maxLength) {
    arr.pop()
  }
}

function deleteArray(arr,compare) {
  const index=arr.findIndex(compare)
  if (index>-1) {
    arr.splice(index,1)
  }
}

export function saveSearch(query) {
  const SEARCH_KEY = '_search_'
  const SEARCH_MAX_LENGTH = 15

  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches,query,item => {
      return item === query
    },
    SEARCH_MAX_LENGTH
  )
  storage.set(SEARCH_KEY, searches)
  return searches
}

export function loadSearchHistory(){
  const SEARCH_KEY = '_search_'
  return storage.get(SEARCH_KEY,[])
}

export function deleteSearch(query) {
  const SEARCH_KEY = '_search_'
  let searches=storage.get(SEARCH_KEY,[])
  deleteArray(searches,item=>{
    return item===query
  })
  storage.set(SEARCH_KEY,searches)
  return searches
}

export function clearSearch() {
  const SEARCH_KEY = '_search_'
  storage.remove(SEARCH_KEY)
  return []
}

export function savePlay(song) {
  const PLAY_KEY='_play_'
  const PLAY_KEY_LENGTH=200

  let songs=storage.get(PLAY_KEY,[])
  insertArray(songs,song,item => {
    return item.id === song.id
  }, PLAY_KEY_LENGTH)
  storage.set(PLAY_KEY, songs)
  return songs
}

export function loadPlayHistory() {
  const PLAY_KEY = '_play_'
  return storage.get(PLAY_KEY, [])
}

export function saveFavorite(song) {
  const FAVORITE_KEY  = '_favorite_'
  const FAVORITEKEY_KEY_LENGTH = 200

  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, item => {
    return item.id === song.id
  }, FAVORITEKEY_KEY_LENGTH)
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function deleteFavorite(song) {
  const FAVORITE_KEY = '_favorite_'
  let songs = storage.get(FAVORITE_KEY, [])
  deleteArray(songs, item => {
    return item.id===song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}

export function loadFavorite() {
  const FAVORITE_KEY = '_favorite_'
  return storage.get(FAVORITE_KEY, [])
}