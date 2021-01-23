let {
    join
} = require('path')
// const webpack = require('webpack')
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')

function resolve(...path) {
    return join(__dirname, 'src', ...path)
}
module.exports = {
    lintOnSave: false,
    publicPath: '/',
    outputDir: process.env.VUE_APP_OUTPUT || 'dist',
    productionSourceMap: false,
    devServer: {
        port: 888,
        // proxy: {
        //     '/dev': {
        //         target: 'http://localhost:888/mock',
        //         ws: true,
        //         changeOrigin: true
        //     }
        // }
    },
    configureWebpack: {
        //性能优化  https://www.webpackjs.com/configuration/externals/#externals  
        externals: {
            vue: "Vue",
            vuex: "Vuex",
            'vue-router': 'VueRouter'
        },
        plugins: [
            /**
             * vue优化小tip
             * 
             * IgnorePlugin是webpack内置插件
               作用是：忽略第三方包指定目录，让这些指定目录不要被打包进去

               而moment被打包时，会一次性把所有语言包打包进去
               所以忽略moment包中各国语言包，可减小打包后核心文件chunk-vendor的体积
               可以直接打开dist/chunk-vendor对比查看
             */
            // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new AntdDayjsWebpackPlugin({
                preset: 'antdv3'
            })
        ],
        //关闭 webpack 的性能提示，如果打包后文件过大，打包会失败
        performance: {
            hints: 'warning',
            //入口起点的最大体积
            maxEntrypointSize: 50000000,
            //生成文件的最大体积
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function (assetFilename) {
                return assetFilename.endsWith('.js');
            }
        }
    },
    chainWebpack: config => {
        config.resolve.alias
            .set('~views', resolve('views'))
            .set('~Layout', resolve('views', 'Layout'))
            .set('~components', resolve('components'))
            .set('~assets', resolve('assets'))
            .set('~utils', resolve('utils'))
            .set('~rules', resolve('rules'))
            .set('~routes', resolve('routes'))
            .set('~store', resolve('store'))
            .set('~plugin', resolve('plugin'))
            .set('~vendor', resolve('vendor'))
            .set('~config', resolve('config'))
            .set('~mixins', resolve('plugin', 'mixins'))
            .set('~simbajs', resolve('plugin', 'simba'))
            .set('~api', resolve('api'))
        config
            .plugin('html')
            .tap(args => {
                args[0].title = process.env.VUE_APP_TITLE
                return args
            })
    },

}