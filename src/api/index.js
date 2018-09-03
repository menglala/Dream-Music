import axios from 'axios'
import jsonp from '../common/js/jsonp'
import {commonParams,options} from './commonParams'

export let getRecommend=()=>{
  let url ='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: "h5",
    uin: 0,
    needNewCode: 1
  });
  
  return jsonp(url,data,options)
}

export let getSingerlist=()=>{
  let url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    g_tk: 1928093487,
  });

  return jsonp(url,data,options)
}

export function getSingerInfo(singerId) {
  let url ='https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data=Object.assign({},commonParams,{
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: singerId
  })

  return jsonp(url,data,options)
}

export function getLyric(id) {
  const url='/lyric'

  const data = Object.assign({}, {}, {
    // songmid: songmid,
    // platform: 'yqq',
    // hostUin: 0,
    // needNewCode: 0,
    // categoryId: 10000000,
    // pcachetime: +new Date(),
    // format: 'json',
    // needNewCode: 0,
    // g_tk: 1928093487
    nobase64: 1,
    musicid: id, //不再是mid
    songtype: 0
  })

  return axios.get(url,{params:data}).then(res=>{
    return Promise.resolve(res.data)
  })
}

// callback: MusicJsonCallback_lrc
// jsonpCallback: MusicJsonCallback_lrc
