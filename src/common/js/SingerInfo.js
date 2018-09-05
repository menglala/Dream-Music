export default class SingerInfo {
  constructor({ mid,name }) {
    this.mid = mid, this.name = name, 
    this.bgImage =`https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.mid}.jpg?max_age=2592000`
  }
}