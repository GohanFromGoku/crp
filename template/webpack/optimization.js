const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  minimize: true,
  minimizer: [
    new TerserPlugin({
      parallel: true,
      extractComments: false,
      terserOptions: {
        sourceMap: true,
        compress: {
          // drop_console: true,
          evaluate: true,
          reduce_funcs: true,
          reduce_vars: true,
          unused: false,
          inline: true,
          pure_getters: true,
          pure_new: true,
          dead_code: true,
        },
        format: {
          comments: false,
        },
      },
    }),
  ],
  removeEmptyChunks: true,
  runtimeChunk: "single",
  splitChunks: {
    chunks: "all",
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name(module) {
          const packageName = module.context.split("node_modules/")[1];
          return packageName;
        },
        chunks: "all",
      },
    },
  },
};
