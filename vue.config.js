"use strict"
module.exports = {
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "static",
  indexPath: "index.html",
  productionSourceMap: false,

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
      }
    }
  }
}