const AutoImport = require('unplugin-auto-import/dist/webpack');
const Components = require('unplugin-vue-components/dist/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/dist/resolvers');

module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  indexPath: "index.html",
  productionSourceMap: false,

  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      })
    ]
  },
  
  devServer: {
    open: true,
    host: "localhost",
    port: "8082",
    overlay: {
      warning: true,
      errors: true
    },
    proxy: {
      "/api/": {
        target: "http://localhost:8080/", // 目标url
        changeOrigin: true, // 是否跨域
        ws: false, //是否支持websocket
        secure: false,
        pathRewrite: {
          "^/api": ""
        }
      },
      "/auth/": {
        target: "http://10.9.102.123:7669/", // 目标url
        changeOrigin: true, // 是否跨域
        ws: false, //是否支持websocket
        secure: false,
      },
      "/special/": {
        target: "http://10.9.102.123:7662/", // 目标url
        changeOrigin: true, // 是否跨域
        ws: false, //是否支持websocket
        secure: false,
      },
    }
  }
}