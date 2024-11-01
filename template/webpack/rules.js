const { loader: MiniCssExtractPluginLoader } = require("mini-css-extract-plugin");
const { SRC_PATH } = require("./paths");

const cssRules = {
  test: /\.(scss|sass|css)$/,
  oneOf: [
    {
      test: /\.module\.(scss|sass|css)$/,
      use: [
        {
          loader: MiniCssExtractPluginLoader,
          options: {
            defaultExport: true,
          },
        },
        {
          loader: "css-loader",
          options: {
            modules: {
              localIdentName: "[name]__[local]__[hash:base64:5]",
              exportLocalsConvention: "as-is",
            },
            sourceMap: true,
          },
        },
        {
          loader: "sass-loader",
          options: {
            sourceMap: true,
          },
        },
      ],
    },
    {
      use: [
        MiniCssExtractPluginLoader,
        "css-loader",
        {
          loader: "sass-loader",
          options: {
            sourceMap: true,
          },
        },
      ],
    },
  ],
};

module.exports = [
  {
    test: /\.(js|jsx)$/,
    include: SRC_PATH,
    exclude: /node_modules/,
    use: [
      {
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
          presets: ["@babel/preset-env", ["@babel/preset-react", { runtime: "automatic" }]],
          plugins: ["@babel/plugin-transform-react-jsx"],
        },
      },
    ],
    sideEffects: true,
  },
  cssRules,
  {
    test: /\.(png)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "src/assets/pngs/[name].[ext]",
        },
      },
    ],
  },
  {
    test: /\.(webp)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "src/assets/webps/[name].[ext]",
        },
      },
    ],
  },
  {
    test: /\.(jpg)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "src/assets/jpgs/[name].[ext]",
        },
      },
    ],
  },
  {
    test: /\.(gif)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "src/assets/gifs/[name].[ext]",
        },
      },
    ],
  },
  {
    test: /\.(svg)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "src/assets/svgs/[name].[ext]",
        },
      },
    ],
  },
  {
    test: /\.(ico)$/,
    use: [
      {
        loader: "file-loader",
        options: {
          name: "src/assets/icos/[name].[ext]",
        },
      },
    ],
  },
  {
    test: /\.(json)$/i,
    type: "asset/resource",
    generator: {
      filename: "src/assets/json/[name][ext]",
    },
  },
  {
    test: /\.(woff|woff2|eot|ttf|otf)$/i,
    type: "asset/resource",
    generator: {
      filename: "src/assets/fonts/[name][ext]",
    },
  },
];
