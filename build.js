/*
 * @Author: 周啟尧 zhouqy50@chinaunicom.cn
 * @Date: 2022-04-18 08:56:13
 * @LastEditTime: 2022-04-19 22:10:09
 * @LastEditors: 周啟尧
 * @Description: esbuild build API & buildSync API demo
 */
const { build, buildSync, serve } = require('esbuild');

async function runBuild() {
  // 异步方法,返回一个 Promise
  const result = await build({
    // 常见配置:
    // 当前项目根目录
    absWorkingDir: process.cwd(),
    // 入口文件列表
    entryPoints: ['./src/index.jsx'],
    // 打包产物目录
    outdir: 'dist',
    // 是否需要打包,一般设置为 true
    bundle: true,
    // 模块格式, 包括 esm commonjs 和 iife
    format: 'esm',
    // 需要排除打包的依赖列表
    external: [],
    // 是否开启自动拆包
    splitting: true,
    // 是否生成 SourceMap 文件
    sourcemap: true,
    // 是否生成打包的元信息文件
    metafile: true,
    // 是否代码压缩
    minify: false,
    // 是否开启 watch 模式, 代码变动重新触发打包
    watch: false,
    // 是否将产物写入磁盘
    write: true,
    // Esbuild 内置了一系列 loader,包括 base64, binary, css, dataurl, file, js(x), ts(x), text, json
    // 针对不同的特殊文件, 调用不同的 loader 加载
    loader: {
      '.png': 'base64',
    },
  });
  console.log(result);
}

runBuild();
