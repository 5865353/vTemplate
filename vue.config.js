/**
 * @Description 项目的整体配置文件
 */
const webpack = require('webpack')
const path = require('path')
const productionGzipExtensions = ['js', 'css']
// 资源文件开启 gzip加速
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 压缩优化
const UglifyPlugin = require("uglifyjs-webpack-plugin")

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,
    configureWebpack: config => {
        // config.mode = 'production'
        // 为生产环境修改配置...
        if (process.env.NODE_ENV === 'production') {
            // 将每个依赖包打包成单独的js文件
            let optimization = {
                runtimeChunk: "single",
                splitChunks: {
                    chunks: "all",
                    maxInitialRequests: Infinity,
                    minSize: 20000,
                    cacheGroups: {
                        vendor: {
                            test: /[\\/]node_modules[\\/]/,
                            name(module) {
                                const packageName = module.context.match(
                                    /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                                )[1]
                                return `npm.${packageName.replace("@", "")}`
                            }
                        },
                    }
                },
                minimizer: [
                    new UglifyPlugin({
                        uglifyOptions: {
                            compress: {
                                drop_console: true, // console
                                drop_debugger: false,
                                pure_funcs: ["console.log"] // 移除console
                            }
                        }
                    })
                ]
            }
            Object.assign(config, {
                optimization
            })
            // 生产环境中开启gzip加速
            config.plugins.push(new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
                    threshold: 10024, // 对超过100kb 的文件进行压缩
                    minRatio: 0.8
                }), new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),  // 减少 moment的体积
                new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja|it/))
        } else {
            // 开发环境下的测试
            // config.mode = "development";
        }
    },
    // webpack 配置
    chainWebpack: config => {
        // 配置文件夹别名
        config.resolve.alias
            .set('@', resolve('src'))
            .set('public', resolve('public'))
        // 移除prefetch 插件 提高访问速度
        config.plugins.delete('prefetch')
    },
    devServer: {
        // 开发环境下 服务器配置
        port: 8080,
        disableHostCheck: true,
    },
    // ui 工具如果不是用的 ant-design 可删除下面这行
    transpileDependencies: ["_ant-design-vue@1.3.13@ant-design-vue", "ant-design-vue"]
}