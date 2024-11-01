const dotenv = require("dotenv");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { PUBLIC_PATH } = require("./paths");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");
const HtmlWebpackInjectPreload = require("@principalstudio/html-webpack-inject-preload");
const appJSON = require("../app.json");

dotenv.config();

const plugins = [
  new HtmlWebpackPlugin({
    title: appJSON.name,
    template: `${PUBLIC_PATH}/index.html`,
    minify: true,
    hash: false,
    cache: true,
    hot: true,
    favicon: `${PUBLIC_PATH}/favicon.ico`,
    publicPath: "/",
    chunksSortMode: "auto",
  }),

  new HtmlWebpackInjectPreload({
    files: [
      {
        match: /.*\.gif$/,
        attributes: { as: "image" },
      },
      {
        match: /.*\.png$/,
        attributes: { as: "image", fetchpriority: "high" },
      },
      {
        match: /.*\.svg$/,
        attributes: { as: "image", fetchpriority: "high" },
      },
      {
        match: /.*\.webp$/,
        attributes: { as: "image", fetchpriority: "high" },
      },
      {
        match: /.*\.js$/,
        attributes: { as: "script", fetchpriority: "high", defer: true },
      },
      {
        match: /.*\.css$/,
        attributes: { as: "style", fetchpriority: "high", defer: true },
      },
      {
        match: /^(?!.*manifest\.json).*\.json$/,
        attributes: { as: "fetch" },
      },
      {
        match: /.*\.woff2$/,
        attributes: { as: "font", type: "font/woff2", crossorigin: true, fetchpriority: "high" },
      },
    ],
  }),
  new CopyWebpackPlugin({
    patterns: [
      { from: `${PUBLIC_PATH}/robots.txt`, to: "." },
      { from: `${PUBLIC_PATH}/manifest.json`, to: "." },
      { from: `${PUBLIC_PATH}/logo192.svg`, to: "." },
      { from: `${PUBLIC_PATH}/logo512.svg`, to: "." },
    ],
  }),
  new MiniCssExtractPlugin({
    linkType: "text/css",
    filename: (pathData) => {
      const hash = pathData.chunk.hash;
      return `src/css/${hash}.css`;
    },
    chunkFilename: (pathData) => {
      const hash = pathData.chunk.hash;
      return `src/css/${hash}.css`;
    },
  }),
];

const getPlugins = (isProduction) => {
  if (isProduction) {
    plugins.push(
      new GenerateSW({
        clientsClaim: true,
        cleanupOutdatedCaches: true,
        sourcemap: false,
        disableDevLogs: true,
        maximumFileSizeToCacheInBytes: 1024 * 1024 * 50,
        swDest: `service-worker.js`,
        include: [/\.(png|jpg|jpeg|gif|svg|webp|ico|woff2|woff|html|js|css)$/],
        runtimeCaching: [
          {
            urlPattern: /\.(html)$/,
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "html-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: /\.(css)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "css-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: /\.(js)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "js-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: /\.(json)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "json-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: /\.(woff2|woff|ttf)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "fonts-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
            },
          },
          {
            urlPattern: /\.(png|jpg|jpeg|gif|svg|ico|webp)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 7 * 24 * 60 * 60,
              },
            },
          },
        ],
      })
    );
  }

  return plugins;
};

module.exports = getPlugins;
