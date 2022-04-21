/*
 * @Author: 周啟尧 zhouqy50@chinaunicom.cn
 * @Date: 2022-04-18 09:37:48
 * @LastEditTime: 2022-04-19 14:56:51
 * @LastEditors: 周啟尧
 * @Description: esbuild serve API demo
 */

const { build, buildSync, serve } = require('esbuild');

const runBuild = () => {
  serve(
    {
      port: 8000,
      servedir: './dist',
    },
    {
      absWorkingDir: process.cwd(),
      entryPoints: ['./src/index.jsx'],
      bundle: true,
      format: 'esm',
      splitting: true,
      sourcemap: true,
      ignoreAnnotations: true,
      metafile: true,
    }
  ).then((server) => {
    console.log('HTTP server listening on port',server.port);
  })
};

runBuild()