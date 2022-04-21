/*
 * @Author: 周啟尧 zhouqy50@chinaunicom.cn
 * @Date: 2022-04-18 15:46:15
 * @LastEditTime: 2022-04-20 19:05:28
 * @LastEditors: 周啟尧
 * @Description: CDN依赖拉取插件
 */

module.exports = () => ({
  name: "esbuild:http",
  setup(build){
    let https = require('https');
    let http = require('http');
    
    // 1. 拦截 CDN 请求
    // onResolve 路径解析
    // 检查文件中带有 https: 的特征文件,打上 http-url 标签
    build.onResolve({filter:/^https?:\/\//},(args)=>({
      path: args.path,
      namespace: 'http-url'
    }));

    // 拦截间接依赖的路径,并重写路径
    // 间接依赖也会自动带上 http-url 的 namespace
    build.onResolve({filter:/.*/,namespace:"http-url"},(args)=>({
      path: new URL(args.path, args.importer).toString(),
      namespace:'http-url'
    }))


    // 2. 通过 fetch 请求加载 CDN 资源
    // onLoad 模块加载
    // 对于带有 http-url 标签的文件,通过 fetch 请求加载
  build.onLoad({filter:/.*/,namespace:'http-url'},async (args)=>{
    console.log('========')
    console.log('onLoad args',args)
    console.log('========')
    let contents = await new Promise((resolve,reject)=>{
      function fetch(url){
        console.log(`Downloading: ${url}`)
        let lib = url.startsWith('https') ? https : http;
        let req = lib.get(url,(res)=>{ // node http / https 模块发起请求
          if([301,302,307].includes(res.statusCode)){
            // 重定向
            fetch(new URL(res.headers.location,url).toString())
            req.destroy()
          }else if (res.statusCode === 200){
            // 响应成功
            let chunks = []
            res.on('data',(chunk)=>chunks.push(chunk));
            res.on('end',()=>{
              console.log('>>>>>>>chunks',chunks)
              console.log('=======',Buffer.concat(chunks))
              return resolve(Buffer.concat(chunks))
            })
          }else{
            reject(
              new Error(`GET ${url} failed:status ${res.statusCode}`)
            )
          }
        })
        .on('error',reject)
      }
      fetch(args.path)
    })
    return { contents }
  })

  }
})