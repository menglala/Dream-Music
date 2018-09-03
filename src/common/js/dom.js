export let getIndex=(el,key,val)=>{
  const prefix='item-'
  if (val) {
    return el.setAttribute(prefix+key,val)
  }
  return el.getAttribute(prefix+key)
}