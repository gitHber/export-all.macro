const pluginTester = require("babel-plugin-tester");
const path = require("path");
const plugin = require("babel-plugin-macros");

pluginTester.default({
  pluginName: "export",
  plugin,
  snapshot: true,
  babelOptions: { filename: __filename, parserOpts: { plugins: ["jsx"] } },
  tests: {
    'default export': `
      import exportAll from '../macro';
      exportAll('../components');
    `
  }
});
