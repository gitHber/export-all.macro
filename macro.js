const { createMacro } = require("babel-plugin-macros");
const glob = require("glob");
const fs = require("fs");
const path = require("path");
const t = require("@babel/types");

function logError(path, msg) {
  throw path.buildCodeFrameError("\nMacro error: \x1b[31m" + msg + "\x1b[0m");
}

function hasDefault(file) {
  let data = fs.readFileSync(file, { encoding: "utf8" });
  return data.includes("export default");
}
function getDefaultName(filename) {
  const { name, dir } = path.parse(filename);
  return dir && name.startsWith("index")
    ? dir.substring(dir.lastIndexOf("/") + 1)
    : name;
}
function getAllExports(config, cwd) {
  const { exclude = [], noDefault = false, onlyIndex = true } = config;
  const exps = [];
  const files = glob.sync("**/*.{js,jsx,ts,tsx}", {
    cwd,
    statCache: true,
    ignore: ["node_modules/**/*", "./index.{js,ts,jsx,tsx}", ...exclude],
  });
  files.forEach((file) => {
    if (onlyIndex && file.includes("/") && !file.includes("index")) {
      return false;
    }
    if (noDefault) {
      exps.push({ file: `./${file}`, hasDefault: false });
    } else {
      let hasDef = hasDefault(path.join(cwd, file));
      exps.push({ file: `./${file}`, hasDefault: hasDef });
    }
  });
  return exps;
}

module.exports = createMacro(
  function (context) {
    const { references, state, babel, config, source } = context;
    if (!references.default) {
      logError(state.file.path, "only support default import");
    }
    references.default.forEach((referencePath) => {
      const args = referencePath.parentPath.get("arguments");
      let cwdPath = args[0] ? args[0].node.value : "";
      let options = args[1] ? args[1].evaluate().value : {};
      const exps = getAllExports(
        { ...config, ...options },
        path.join(path.dirname(state.filename), cwdPath)
      );
      exps.forEach(({ file, hasDefault }) => {
        const exportAll = t.exportAllDeclaration(t.stringLiteral(file));
        state.file.path.unshiftContainer("body", exportAll);
        if (hasDefault) {
          const exportDefault = t.exportNamedDeclaration(
            null,
            [
              t.exportSpecifier(
                t.identifier("default"),
                t.identifier(getDefaultName(file))
              ),
            ],
            t.stringLiteral(file)
          );
          state.file.path.unshiftContainer("body", exportDefault);
        }
      });
      referencePath.parentPath.remove();
    });
  },
  {
    configName: "exportAllHelper",
  }
);
