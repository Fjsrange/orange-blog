// const fs = require("fs"); // 引入文件系统模块，用于读写文件
// const path = require("path"); // 引入路径模块，用于处理文件路径
import path from "node:path";
import fs from "node:fs";

// 文件根目录
const DIR_PATH = path.resolve();
// 白名单，过滤不适文章的文件和文件夹
const WHITE_LIST = [
  "index.md",
  ".vitepress",
  "node_modeules",
  ".idea",
  "assets",
];
// 判断是否是文件夹
const isDirectory = (path) => fs.lstatSync(path).isDirectory();
// 取差值
const intersections = (arr1, arr2) =>
  Array.from(new Set(arr1.filter((item) => !new Set(arr2).has(item))));

// 把方法导出直接使用
function getList(params, path1, pathname) {
  // 存放结果
  const res = [];
  // 开始遍历params
  for (let file in params) {
    // 拼接目录
    const dir = path.join(path1, params[file]);
    // 判断是否是文件夹
    const isDir = isDirectory(dir);
    if (isDir) {
      // 如果是文件夹，则递归调用getList方法
      // res.push(...getList(params[file], dir, pathname));
      const files = fs.readdirSync(dir);
      res.push({
        text: params[file],
        collapsible: true,
        items: getList(files, dir, `${pathname}/${params[file]}`),
      });
    } else {
      // 获取文件名
      const name = path.basename(params[file]);
      // 排除非 md 文件
      const suffix = path.extname(params[file]);
      if (suffix != ".md") {
        continue;
      }
      let link = `${pathname}/${params[file]}`;
      link = link.replace("/docs", "").replace(".md", "");
      res.push({
        text: name.replace(".md", ""),
        link,
      });
    }
  }
  // 目录推荐
  var resSort = res.sort(function (a, b) {
    var aNum = a.text.split("-")[0];
    var bNum = b.text.split("-")[0];
    return aNum - bNum;
  });
  return resSort;
}

export const setSidebar = (pathname) => {
  console.log("pathname", pathname);
  // 获取pathname的路径
  const dirPath = path.join(DIR_PATH, pathname);
  console.log("dirPath", dirPath);
  // 读取pathname下的所有文件或者文件夹
  const files = fs.readdirSync(dirPath);
  // 过滤掉不在白名单中的文件或者文件夹
  const filterFiles = intersections(files, WHITE_LIST);
  // getList方法，用于获取目录结构
  console.log(filterFiles, dirPath, pathname);
  return getList(filterFiles, dirPath, pathname);
};
