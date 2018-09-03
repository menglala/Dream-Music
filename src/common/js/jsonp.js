import originJsonp from 'jsonp'

export default function jsonp(url, data, options) {
  url += url.indexOf('?') < 0 ? `?${urlSplice(data)}` : `&${urlSplice(data)}`
  return new Promise((resolve, reject) => {
    originJsonp(url, options, (err, data) => { // err写在前面...
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function urlSplice(data) {
  let url = ''

  for (const key in data) {
    let value = data[key] === undefined ? (data[key] = '') : data[key]
    url += `&${key}=${encodeURIComponent(value)}`
  }

  return url ? url.substring(1) : ''// 将第一个‘&’除去
}
