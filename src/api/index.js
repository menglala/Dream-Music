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
