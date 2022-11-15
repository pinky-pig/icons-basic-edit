/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
export default function myExample() {
  // 返回的是插件对象
  return {
    name: 'my-example', // 名称用于警告和错误展示
    // enforce: 'pre'|'post'
    // 初始化hooks，只走一次
    options(opts: any) {
      console.log('options', opts)
    },
    buildStart() {
      console.log('buildStart')
    },
    config(config: any) {
      console.log('config', config)
      return {}
    },
    configResolved(resolvedCofnig: any) {
      console.log('configResolved')
    },
    configureServer(server: any) {
      console.log('configureServer')
      // server.app.use((req, res, next) => {
      //   // custom handle request...
      // })
    },
    transformIndexHtml(html: any) {
      console.log('transformIndexHtml')
      return html
      // return html.replace(
      //   /<title>(.*?)<\/title>/,
      //   `<title>Title replaced!</title>`
      // )
    },
    // id确认
    resolveId(source: any) {
      if (source === 'virtual-module') {
        console.log('resolvedId', source)
        return source // 返回source表明命中，vite不再询问其他插件处理该id请求
      }
      return null // 返回null表明是其他id要继续处理
    },
    // 加载模块代码
    load(id: any) {
      if (id === 'virtual-module') {
        console.log('load')
        return 'export default "This is virtual!"' // 返回"virtual-module"模块源码
      }
      return null // 其他id继续处理
    },
    // 转换
    transform(code: any, id: any) {
      if (id === 'virtual-module')
        console.log('transform')

      return code
    },
  }
}
