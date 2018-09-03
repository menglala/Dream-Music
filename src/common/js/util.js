function getRandomInt(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function shuffle(arr) {
  let randomArr = arr.slice()
  // 每次循环将数组的任意两位交换,避免重复
  for (let i = 0; i < randomArr.length; i++) {
    let randomIndex = getRandomInt(i, 0) // getRandomInt()第一个参数是i
    let value = randomArr[i]
    randomArr[i] = randomArr[randomIndex]
    randomArr[randomIndex] = value
  }
  return randomArr
}
