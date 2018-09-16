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