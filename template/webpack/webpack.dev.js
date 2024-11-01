const getPlugins = require("./plugins");
const createWebpackConfig = require("./webpack.common");

const config = () => {
  const mode = "development";
  const plugins = getPlugins(false, mode);

  const devServer = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    compress: true,
    port: 3000,
    client: {
      logging: "info",
    },
    hot: true,
    historyApiFallback: true,
  };

  return createWebpackConfig({ devServer, mode, plugins });
};

module.exports = config;
