/*
 * @Author: 周啟尧 zhouqy50@chinaunicom.cn
 * @Date: 2022-04-20 18:39:41
 * @LastEditTime: 2022-04-20 19:30:06
 * @LastEditors: 周啟尧
 * @Description: html-plugin.js 辅助函数
 */
const createScript = (src) => `<script type="module" src="${src}"></script>`;


const createLink = (src) => `<link rel="stylesheet" href="${src}"></link>`;


const generateHTML = (scripts, links) => `
<!DOCTYPE html>
<html hang='en'>
  <head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Esbuild App</title>
  ${links.join('\n')}
  </head>


  <body>
  <div id="root">JueJin</div> 
  ${scripts.join('\n')}
  </body>
</html>
`;

module.exports = { createLink, createScript, generateHTML };
