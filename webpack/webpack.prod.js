const createWebpackConfig = require("./webpack.common");
const getPlugins = require("./plugins");

const config = () => {
  const mode = "production";
  const plugins = getPlugins(true, mode);

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
