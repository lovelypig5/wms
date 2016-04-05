module.exports = (modulePath) => {

    var path = require('path');
    var webpack = require(`${modulePath}/webpack`);
    var HtmlWebpackPlugin = require(`${modulePath}/html-webpack-plugin`);

    return {
        // if single entry is used, bundle name will be named as main.js
        entry: {
            main: "./index",
            common: ['jquery', 'vue'],
            dependences: ['taggle', 'select2']
        },
        output: {
            publicPath: ''
        },
        // plugins example, default no more
        plugins: [
            new webpack.ProvidePlugin({
                Vue: 'vue',
                $: "jquery",
                jQuery: "jquery"
            }),
            new HtmlWebpackPlugin({
                template: './index.html',
                filename: './index.html',
                chunks: ['main', 'common', 'dependences']
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "common",
                chunks: ['main']
            })
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: "dependences",
        //     chunks: ['main']
        // })
        ],
        module: {
            loaders: []
        },
        externals: [],
        devServer: {
            proxy: {
                '*': 'http://localhost:3000'
            }
        }
    }
}