[English](./README.md) | 简体中文

<div align="center">
<h1>export.macro</h1>
从当前目录导出所有
</div>

[![NPM version](https://img.shields.io/npm/v/export.macro.svg?style=flat)](https://npmjs.org/package/export.macro)
[![Build Status](https://www.travis-ci.org/gitHber/export-all.macro.svg?branch=master)](https://www.travis-ci.org/github/gitHber/export-all.macro)
[![codecov](https://codecov.io/gh/gitHber/export-all.macro/branch/master/graph/badge.svg)](https://codecov.io/gh/gitHber/export-all.macro)

## 安装

```shell
npm i -D export.macro
// or
yarn add -D export.macro
```

## 需要先安装 babel-plugin-macros

`.babelrc`

```shell
{
  plugins: ['babel-plugin-macros']
}
```

## 使用

```js
import exportAll from "export.macro";

exportAll("./", {
  exclude: ["**/*.test.js"],
  noDefault: false,
  onlyIndex: true,
});
```

输出：

```js
export {default as Something} from "./Something";
export * from "./Something";
...
```

## 配置

添加配置文件:

- .babel-plugin-macrosrc
- .babel-plugin-macrosrc.json
- .babel-plugin-macrosrc.yaml
- .babel-plugin-macrosrc.yml
- .babel-plugin-macrosrc.js
- babel-plugin-macros.config.js
- babelMacros in package.json

如下：

### 配置项

- `exclude` string[]: glob 的 ignore 配置, 已经排除`node_modules/**/*`
- `noDefault` boolean: 确认不需要 default 导出`export {default as Filename} from './Filename'`, 默认为 false
- `onlyIndex` boolean: 文件夹只导出 index 文件, 默认为 true

```js
// .babel-plugin-macrosrc.js
module.exports = {
  exportAllHelper: {
    exclude: ["node_modules/**/*"],
    noDefault: false,
    onlyIndex: true,
  },
};
```

也可以使用时：

```js
import exportAll from "export.macro";
exportAll("filename", {
  exclude: ["node_modules/**/*"],
  noDefault: false,
  onlyIndex: true,
});
```
