/* eslint-disable @typescript-eslint/no-explicit-any */
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import * as fs from "fs";
import HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import RemovePlugin from "remove-files-webpack-plugin";
import * as webpack from "webpack";
import merge from "webpack-merge";
import WebpackLoadChunksPlugin from "./webpack.plugin.LoadChunks";

const pSrc = path.resolve("src");
const pDist = path.resolve("dist");
export const pBuild = path.resolve("build");
const pAssets = path.resolve("src/assets");
const pCss = path.resolve("src/assets/styles");
const pImg = path.resolve("src/assets/images");

const p1 = path.resolve("./node_modules/@momentum-ui");
const p2 = path.resolve("../node_modules/@momentum-ui");
const pMomentum = fs.existsSync(p1) ? p1 : fs.existsSync(p2) ? p2 : null;
if (!pMomentum) {
  throw new Error("Can't find Momentum UI");
}

const common: webpack.Configuration = {
  output: {
    publicPath: "/",
  },
  resolve: {
    extensions: [".ts", ".js", ".scss"],
    alias: {
      "@": pSrc,
      "@css": pCss,
      "@img": pImg,
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpe?g)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "images-cjaas-common/[name].[hash:8].[ext]",
            esModule: false,
          },
        },
        include: pSrc,
      },
    ],
  },
};

function ruleTS({ isDev }: { isDev: boolean }) {
  return {
    test: /\.ts$/,
    loader: "ts-loader",
    include: pSrc,
    options: {
      compilerOptions: {
        declarationMap: isDev,
        sourceMap: isDev,
      },
    },
  };
}

function ruleCSS({ isDev }: { isDev: boolean }) {
  return {
    test: /\.scss$/,
    use: [
      { loader: "lit-scss-loader", options: { minify: !isDev } },
      { loader: "string-replace-loader", options: { search: /\\/g, replace: "\\\\" } },
      { loader: "extract-loader" },
      { loader: "css-loader", options: { sourceMap: isDev, importLoaders: 2 } },
      {
        loader: "sass-loader",
        options: {
          sourceMap: isDev,
          sassOptions: {
            outputStyle: "compressed",
          },
        },
      },
      {
        loader: "alias-resolve-loader",
        options: {
          alias: {
            "@css": pCss,
            "@img": pImg,
          },
        },
      },
    ],
    include: pSrc,
  };
}

// DEV
// ----------

export const commonDev = merge(common, {
  name: "dev",
  mode: "development",
  devtool: "source-map",
  entry: "./src/[sandbox]/sandbox.ts",
  output: {
    path: pBuild,
  },
  module: {
    rules: [ruleTS({ isDev: true }), ruleCSS({ isDev: true })],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/[sandbox]/index.html",
      favicon: "./src/[sandbox]/favicon.ico",
    }),
    new CopyWebpackPlugin([
      { from: `${pMomentum}/core/fonts`, to: "fonts" },
      { from: `${pMomentum}/core/images`, to: "images" },
      { from: `${pMomentum}/icons/fonts`, to: "icons/fonts" },
      { from: `${pMomentum}/icons/fonts`, to: "fonts" },
      { from: `${pMomentum}/core/css/momentum-ui.min.css`, to: "css" },
      { from: `${pMomentum}/core/css/momentum-ui.min.css.map`, to: "css" },
      { from: `${pMomentum}/icons/css/momentum-ui-icons.min.css`, to: "css" },
      { from: `${pCss}/*.css`, to: "css", flatten: true },
    ]),
  ],
});

const dev = merge(commonDev, {
  plugins: [new CleanWebpackPlugin()],
});

// DIST
// ----------

const commonDist = merge(common, {
  entry: {
    "index-entry": "./src/index.ts",
    "comp/cjaas-condition": "./src/components/condition/Condition.ts",
    "comp/cjaas-condition-block": "./src/components/condition-block/ConditionBlock.ts",
    "comp/cjaas-profile-entry": "./src/components/profile/Profile.ts",
    "comp/cjaas-event-toggles-entry": "./src/components/event-toggles/EventToggles.ts",
    "comp/cjaas-timeline-entry": "./src/components/timeline/Timeline.ts",
    "comp/cjaas-timeline-item-entry": "./src/components/timeline/TimelineItem.ts",
    "comp/cjaas-timeline-item-group-entry": "./src/components/timeline/TimelineItemGroup.ts",
    "comp/cjaas-webex-walkin-entry": "./src/components/webexWalkin/WebexWalkin.ts",
    "comp/cjaas-identity-entry": "./src/components/identity/Identity.ts",
    "comp/cjaas-timer-entry": "./src/components/timer/Timer.ts",
    "comp/cjaas-timeline-v2-entry": "./src/components/timeline-v2/TimelineV2.ts",
    "comp/cjass-profile-v2-entry": "./src/components/profile-v2/ProfileV2.ts",
    "comp/cjaas-error-notification-entry": "./src/components/error-notification/ErrorNotification.ts",
  },
  output: {
    path: pDist,
    publicPath: "/",
    filename: "[name].js",
    chunkFilename: "chunks/cjaas-[id].js",
    libraryTarget: "umd",
    jsonpFunction: "common-components-[id]",
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      maxAsyncRequests: Infinity,
      minSize: 0,
    },
    minimize: true,
    chunkIds: "size",
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackLoadChunksPlugin({
      trimNameEnd: 6,
    }),
    new CopyWebpackPlugin([
      { from: `${pMomentum}/core/fonts`, to: "assets/fonts" },
      { from: `${pMomentum}/core/images`, to: "assets/images" },
      { from: `${pMomentum}/icons/fonts`, to: "assets/fonts" },
      { from: `${pMomentum}/icons/fonts`, to: "assets/icons/fonts" },
      { from: `${pMomentum}/core/css/momentum-ui.min.css`, to: "assets/styles" },
      { from: `${pMomentum}/core/css/momentum-ui.min.css.map`, to: "assets/styles" },
      { from: `${pMomentum}/icons/css/momentum-ui-icons.min.css`, to: "assets/styles" },
      { from: `${pCss}/*.css`, to: "assets/styles", flatten: true },
    ]),
    new RemovePlugin({
      after: {
        log: false,
        include: ["./dist/types/[sandbox]"],
        test: [
          {
            folder: "./dist/types",
            method: p => new RegExp(/\.test\.d\.ts(\.map)*$/).test(p),
            recursive: true,
          },
          {
            folder: "./dist/types",
            method: p => new RegExp(/\.stories\.d\.ts(\.map)*$/).test(p),
            recursive: true,
          },
        ],
      },
    }) as any,
  ],
});

const distDev = merge(commonDist, {
  name: "distDev",
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [ruleTS({ isDev: true }), ruleCSS({ isDev: true })],
  },
});

const distDevWatch = merge(distDev, {
  name: "distDevWatch",
  watch: true,
});

const distProd = merge(commonDist, {
  name: "distProd",
  mode: "production",
  module: {
    rules: [ruleTS({ isDev: false }), ruleCSS({ isDev: false })],
  },
});

export default [dev, distDev, distDevWatch, distProd];
