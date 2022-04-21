/*
 * @Author: 周啟尧 zhouqy50@chinaunicom.cn
 * @Date: 2022-04-18 14:41:06
 * @LastEditTime: 2022-04-19 14:56:17
 * @LastEditors: 周啟尧
 * @Description: esbuild plugin onStart 和 onEnd 钩子
 */
let examplePlugin = {
  name: 'example',
  setup(builder){
    builder.onStart(()=>{
      console.log('build started')
    })
    builder.onEnd((buildResult)=>{
      if(buildResult.errors.length){
        return;
      }
      // 构建元信息
      // 获取元信息后做一些自定义的事情,比如生成 HTML
      console.log(buildResult.metafile)
    })
  }
}