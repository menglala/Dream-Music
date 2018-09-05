import { getLyric } from 'api/index'

export class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id,
    this.mid = mid,
    this.singer = singer,
    this.name = name,
    this.album = album,
    this.duration = duration,
    this.image = image,
    this.url = url
  }

  _getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.id).then(res => {
        if (res.retcode === 0) {
          this.lyric = HtmlDecode(res.lyric)
          resolve(this.lyric)
        } else {
          reject(console.log('获取歌词失败!'))
        }
      })
    })
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: singerSlice(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${
      musicData.albummid
    }.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/C100${
      musicData.songmid
    }.m4a?fromtag=46&guid=126548448`
  })
}

function singerSlice(singer) {
  if (!singer) {
    return
  }
  let singerArr = []
  singer.forEach(item => {
    singerArr.push(item.name)
  })

  return singerArr.join('/') // ' 刘德华/王菲 '
}

// 将html实体字符的歌词转译成能解析的格式,歌词已经不是base64的格式了
function HtmlDecode(str) {
  var t = document.createElement('div')
  t.innerHTML = str
  return t.textContent || t.innerText
}
