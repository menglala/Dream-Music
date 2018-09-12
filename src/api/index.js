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

export function getDiscList() {
  const url = '/getDiscList' //原视频中是 '/api/getDiscList'
  const data = Object.assign({}, commonParams, {
    picmid: 1,
    rnd: Math.random(),
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    categoryId: 10000000,
    sortId: 5,
    sin: 0,
    ein: 29
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
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
    nobase64: 1,
    musicid: id, //不再是mid
    songtype: 0
  })

  return axios.get(url,{params:data}).then(res=>{
    return Promise.resolve(res.data)
  })
}

export function getDiscSongs(disstid) {
  const url = '/getDiscSongs'

  const data = Object.assign({}, commonParams, {
    format: 'json',
    needNewCode: 1,
    disstid: disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    g_tk: 1800233000,
    platform: 'yqq',
    needNewCode: 0,
    onlysong: 0,
    notice: 0
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}

export function getTopSongs(topid) {
  const url ='https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'

  const data = Object.assign({}, commonParams, {
    topid,
    needNewCode: 1,
    uin: 0,
    tpl: 3,
    page: 'detail',
    type: 'top',
    platform: 'h5'
  })

  return jsonp(url,data,options)
}

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}


export function search(query, page, zhida, perpage) {
  const url = '/search'

  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    perpage,
    n: perpage,
    catZhida: zhida ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all',
    uin: 0,
    needNewCode: 1,
    platform: 'h5',
    format:'json'
  })

  return axios.get(url,{params:data}).then(res=>{
    return Promise.resolve(res.data)
  })
}