const fs = require('fs'); // 引入文件系统模块，用于读写文件
const path = require('path'); // 引入路径模块，用于处理文件路径

// 文件根目录
const DIR_PATH = path.resolve();
// 白名单，过滤不适文章的文件和文件夹
const WHITE_LIST = [
  'index.md',
  '.vitepress',
  'node_modeules',
  '.idea',
  'assets'
];
// 判断是否是文件夹
const isDirectory = (path) => fs.lstatSync(path).isDirectory();
// 取差值
const intersections = (arr1, arr2)=> Array.from(new Set(arr1.filter((item)=> !new Set(arr2).has(item))));

// 把方法导出直接使用
function getList(params, path1, pathname){
  // 存放结果
  const res = [];
  // 开始遍历params
  for(let file in params){
    // 拼接目录
    const dir = path.join(path1, params[file]);
    // 判断是否是文件夹
    const isDir = isDirectory(dir);
  }
}