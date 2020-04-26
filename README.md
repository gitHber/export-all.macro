English | [简体中文](./README_zh-CN.md)

<div align="center">
<h1>export-all.macro</h1>
export all from current path
</div>

[![NPM version](https://img.shields.io/npm/v/import.macro.svg?style=flat)](https://npmjs.org/package/export-all.macro)
[![Build Status](https://www.travis-ci.org/gitHber/export-all.macro.svg?branch=master)](https://www.travis-ci.org/github/gitHber/export-all.macro)
[![codecov](https://codecov.io/gh/yoyooyooo/import.macro/branch/master/graph/badge.svg)](https://codecov.io/gh/gitHber/export-all.macro)

## install

```shell
npm i -D export-all.macro
// or
yarn add -D export-all.macro
```

## ensure you have installed babel-plugin-macros

`.babelrc`

```shell
{
  plugins: ['babel-plugin-macros']
}
```

## usage

```js
import exportAll from "export-all.macro";

exportAll("./", {
  exclude: ["**/*.test.js"],
  noDefault: false,
  onlyIndex: true,
});
```

output：

```js
export {default as Something} from "./Something";
export * from "./Something";
...
```

## custom import

add a config file:

- .babel-plugin-macrosrc
- .babel-plugin-macrosrc.json
- .babel-plugin-macrosrc.yaml
- .babel-plugin-macrosrc.yml
- .babel-plugin-macrosrc.js
- babel-plugin-macros.config.js
- babelMacros in package.json

Configuration is as follows：

### options

- `exclude` string[]: glob ignore config, alreday add `node_modules/**/*`
- `noDefault` boolean: make sure don't need `export {default as Filename} from './Filename'`, default is false
- `onlyIndex` boolean: for dir, just export index file, default is true

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

then, you can import `customImport` from `import.macro`：

```js
import exportAll from "import.macro";
exportAll("filename", {
  exclude: ["node_modules/**/*"],
  noDefault: false,
  onlyIndex: true,
});
```
