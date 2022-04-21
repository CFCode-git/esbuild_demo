/*
 * @Author: 周啟尧 zhouqy50@chinaunicom.cn
 * @Date: 2022-04-18 11:29:47
 * @LastEditTime: 2022-04-19 14:57:38
 * @LastEditors: 周啟尧
 * @Description: esbuild transform & transformAsync API demo
 */
const { transform, transformSync } = require('esbuild');

async function runTransform() {
  // 第一个参数是代码字符串,第二个参数是编译配置
  const content = await transform(
    'const isNull = (str:string):boolean => str.length > 0;',
    {
      sourcemap: true,
      loader: 'tsx',
    },
  );
  console.log(content);
}

runTransform();
