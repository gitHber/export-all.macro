const { createMacro } = require("babel-plugin-macros");
const path = require("path");
const fs = require("fs");

module.exports = createMacro(
  function (context) {
    const { references, state, babel, config, source } = context;
    console.log(references)
    // throw state.file.path.buildCodeFrameError('\nMacro error: \x1b[31m Some error \x1b[0m')
    references.default.forEach((referencePath) => {
      const [firstArgumentPath] = referencePath.parentPath.get("arguments");
      const stringValue = firstArgumentPath.node.value;
      const gemmafied = stringValue.split(" ").join(" GEMMA ");
      const gemmafyFunctionCallPath = firstArgumentPath.parentPath;
      const gemmafiedStringLiteralNode = babel.types.stringLiteral(gemmafied);
      gemmafyFunctionCallPath.replaceWith(gemmafiedStringLiteralNode);
    });
  },
  {
    configName: "exportHelper",
  }
);
