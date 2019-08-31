// vue.config.js

'use strict'
const path = require('path')

// 配置文件路径映射
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/production-sub-path/'
    : '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    // 配置web应用标题title，及将src目录路径映射为@
    name: 'video_player',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}
