const optimization = require("./optimization");
const { DIST_PATH, SRC_PATH } = require("./paths");
const rules = require("./rules");

const createWebpackConfig = ({ devServer, mode, plugins }) => {
  const performance = {
    hints: false,
  };
  const target = "web";
  const extensions = [".js", ".jsx"];
  const resolve = {
    extensions,
    alias: {
      "@actions": `${SRC_PATH}/redux/actions/`,
      "@components": `${SRC_PATH}/components/`,
      "@containers": `${SRC_PATH}/containers/`,
      "@gifs": `${SRC_PATH}/assets/gifs/`,
      "@helpers": `${SRC_PATH}/helpers/`,
      "@hooks": `${SRC_PATH}/hooks/`,
      "@layout": `${SRC_PATH}/layout/`,
      "@navigation": `${SRC_PATH}/navigation/`,
      "@pngs": `${SRC_PATH}/assets/pngs/`,
      "@private": `${SRC_PATH}/screens/private/`,
      "@providers": `${SRC_PATH}/providers/`,
      "@public": `${SRC_PATH}/screens/public/`,
      "@reducers": `${SRC_PATH}/redux/reducers/`,
      "@root": `${SRC_PATH}/`,
      "@services": `${SRC_PATH}/services/`,
      "@svgs": `${SRC_PATH}/assets/svgs/`,
      "@webps": `${SRC_PATH}/assets/webps/`,
    },
  };
  const entry = {
    index: `${SRC_PATH}/index.js`,
  };

  const output = {
    path: DIST_PATH,
    publicPath: "/",
    filename: (pathData) => {
      const name = pathData.chunk.name || pathData.chunk.id;

      if (name === "index") {
        return `${name}.js`;
      }
      return `src/js/packages/${name}.js`;
    },
    chunkFilename: (pathData) => {
      const name = pathData.chunk.hash || pathData.chunk.id;
      return `src/js/chunks/${name}.js`;
    },
    clean: true,
    libraryTarget: "umd",
  };
  const module = { rules };

  return {
    cache: true,
    mode,
    entry,
    output,
    devServer,
    performance,
    target,
    plugins,
    resolve,
    optimization,
    module,
  };
};

module.exports = createWebpackConfig;
