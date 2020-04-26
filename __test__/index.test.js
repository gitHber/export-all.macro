const pluginTester = require("babel-plugin-tester");
const path = require("path");
const plugin = require("babel-plugin-macros");

pluginTester.default({
  pluginName: "export",
  plugin,
  snapshot: true,
  babelOptions: { filename: __filename, parserOpts: {} },
  tests: {
    "default export": `
      import exportAll from "../macro";
      exportAll("./", {exclude: ["**/*.test.js"]});
    `,
    "export all": `
      import exportAll from "../macro";
      exportAll("./", {exclude: ["**/*.test.js"], onlyIndex: false});
    `,
    "export noDefault": `
      import exportAll from "../macro";
      exportAll("./", {exclude: ["**/*.test.js"], noDefault: true});
    `,
  },
});
