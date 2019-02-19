// var vConsolePlugin = require('vconsole-webpack-plugin');
var proxy = require('http-proxy-middleware')


// 接收运行参数
// const argv = require('yargs')
//   .describe('debug', 'debug 环境') // use 'webpack --debug'
//   .argv;
module.exports = {
  publicPath: '/ppay',

  // pwa: {
  //   name: '创越医疗'
  // },

  outputDir: undefined,

  assetsDir: 'public',
  filenameHashing: true,
  runtimeCompiler: true,
  productionSourceMap: false,
  parallel: undefined,

  chainWebpack: config => {
    const svgRule = config.module.rule('svg')

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()

    // 添加要替换的 loader
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  },

  // configureWebpack: {
  //   plugins: [
  //     new vConsolePlugin({
  //       // enable: !!argv.debug,
  //       filter: [], // 需要过滤的入口文件
  //       enable: true // 发布代码前记得改回 false
  //     }),
  //   ],
  // },
  css: {
    loaderOptions: {
      sass: {
        data: '@import "@/variables.scss";'
      },
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme',
        ]
      }
    }
  },

  devServer: {
    proxy: {
      '/ppay/testserver': {
        target: 'http://101.132.108.35:8081', // 需要请求的地址
        ws: true,
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^/ppay/testserver': ''
        }
      }

    },
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }

  }
}