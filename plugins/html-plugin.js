/*
 * @Author: 周啟尧 zhouqy50@chinaunicom.cn
 * @Date: 2022-04-20 18:37:23
 * @LastEditTime: 2022-04-21 09:15:40
 * @LastEditors: 周啟尧
 * @Description: HTML 构建插件,自动生成 HTML 效果
 */

const fs = require('fs/promises');
const path = require('path');
const {createScript,createLink,generateHTML} = require('../utils/html-generator');

module.exports = () => {
  return {
    name: 'esbuild:html',
    setup(build) {
      build.onEnd(async (buildResult) => {
        if (buildResult.errors.length) {
          return;
        }
        const { metafile } = buildResult;
        console.log('metafile:', JSON.stringify(metafile, null, 2));
        // 拿到 metafile 后获取所有的 js 和 css 产物路径
        const scripts = [];
        const links = [];
        if (metafile) {
          const { outputs } = metafile;
          const assets = Object.keys(outputs);
          console.log('assets:', JSON.stringify(assets, null, 2));
          assets.forEach((asset) => {
            if (asset.endsWith('.js')) {
              scripts.push(outputs[createScript(asset)]);
            } else if (asset.endsWith('.css')) {
              links.push(outputs[createLink(asset)]);
            }
          });
        }

        // 根据路径生成 HTML 文件
        const templateContent  = generateHTML(scripts, links);
        // HTML 写入磁盘
        const templatePath = path.join(process.cwd(),'index.html')
        await fs.writeFile(templatePath, templateContent);
      });
    },
  };
};
