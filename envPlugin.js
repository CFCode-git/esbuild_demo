/*
 * @Author: 周啟尧 zhouqy50@chinaunicom.cn
 * @Date: 2022-04-18 12:47:00
 * @LastEditTime: 2022-04-19 14:55:58
 * @LastEditors: 周啟尧
 * @Description: esbuild plugin demo, onResolve 和 onLoad 钩子
 */
let envPlugin = {
  name: 'env',
  setup(build) {
    build.onResolve({ filter: /^env$/ }, args => ({
      path: args.path,
      namespace: 'env-ns',
    }))

    build.onLoad({ filter: /.*/, namespace: 'env-ns' }, () => ({
      contents: JSON.stringify(process.env),
      loader: 'json',
    }))
  },
}

require('esbuild').build({
  entryPoints: ['src/index.jsx'],
  bundle: true,
  outfile: 'out.js',
  // 应用插件
  plugins: [envPlugin],
}).catch(() => process.exit(1))