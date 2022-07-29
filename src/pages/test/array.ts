// 快速生成数组
let url = 'https://img1.baidu.com/it/u=1966616150,2146512490&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1659114000&t=08e0d8330904b0bbf831140c1978d4cd'
let allItems = Array.from(Array(100).keys(), (item,index)=>{return {url,idx:item}});
let fillArr = new Array(10).fill({url})

// 一维数组划分成三个一组
const sliceBy3 = (arr:Array<any>,result:Array<any> = []) => {
  if(arr.length == 0)
    return
  result.push(arr.splice(0,3))
  sliceBy3(arr,result)
  return result
}

// 筛选对象
const obj = Array.from(Array(100).keys(), (item,index)=>{return {url,idx:item}}).reduce((prev, current) => {
  return prev.idx > current.idx ? prev : current
})

// 筛选数组
let arr =  new Array(10).fill({url}).filter( (i:any) => i.url)
