/*
 * @Author: 周啟尧 zhouqy50@chinaunicom.cn
 * @Date: 2022-04-19 14:53:17
 * @LastEditTime: 2022-04-20 07:47:41
 * @LastEditors: 周啟尧
 * @Description: test html-plugin.js
 */

const { build } = require('esbuild');

const htmlPlugin = require('./plugins/html-plugin');

async function runBuild() {
  build({
    absWorkingDir: process.cwd(),
    entryPoints: ['./src/index.jsx'],
    outdir: 'dist',
    bundle: true,
    format: 'esm',
    splitting: true,
    sourcemap: true,
    metafile: true,
    plugins: [htmlPlugin()],
  }).then(() => {
    console.log('🚀 Build Finished!');
  }).catch(error=>{
    console.log('====')
    console.log(JSON.stringify(error,null,2))
    console.log('====')
  });
}

runBuild();
