// 该配置基于webpack2.0 详情查看 https://webpack.js.org/guides/migrating/
const path = require('path'); // 导入路径包
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/entry.js', //入口文件
    output: {
        path: path.resolve(__dirname, 'build'), // 指定打包之后的文件夹
　　　　 // publicPath: '/assets/', // 指定资源文件引用的目录，也就是说用/assests/这个路径指代path，开启这个配置的话，index.html中应该要引用的路径全部改为'/assets/...'
         filename: 'main.js' // 指定打包为一个文件 bundle.js
        //filename: '[name].js' // 可以打包为多个文件
    },
    // 使用loader模块
    module: {
        /* 在webpack2.0版本已经将 module.loaders 改为 module.rules 为了兼容性考虑以前的声明方法任然可用，
　　　　　　同时链式loader(用!连接)只适用于module.loader，
　　　　　　同时-loader不可省略 */
        rules: [{
            test: /\.(scss|css)$/,
            use: [
                'style-loader', {
                    loader: 'css-loader',
                    options: {
                        // modules: true // 设置css模块化,详情参考https://github.com/css-modules/css-modules
                    }
                }, {
                    loader: 'postcss-loader',
                    // 在这里进行配置，也可以在postcss.config.js中进行配置，详情参考https://github.com/postcss/postcss-loader
                    options: {
                        plugins: function() {
                            return [
                                require('autoprefixer')
                            ];
                        }
                    }
                },'sass-loader'
            ]
        }
        , {
            test: /\.styl(us)?$/,
            use: [
                'style-loader', 'css-loader', {
                    loader: "postcss-loader",
                    options: {
                        plugins: function() {
                            return [
                                require('autoprefixer')
                            ];
                        }
                    }
                }, 'stylus-loader'
            ]
        },
        {
            test: /\.(js|jsx)$/,
            use: ['babel-loader'],
            exclude: /node_modules/,
            include: path.join(__dirname, 'src')
        },
        {
            test:/\.(png|jpg)$/,
            use:[
                'url-loader'
            ]
        }
    ]
    }
    ,// 配置devServer各种参数
    devServer: {
        contentBase: "./", // 本地服务器所加载的页面所在的目录
        historyApiFallback: true, // 不跳转
        inline: true // 实时刷新
    }
    ,plugins: [
        new HtmlWebpackPlugin({
            template: './index.html' // 模版文件
        })
    ]
}