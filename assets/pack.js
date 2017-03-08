module.exports = (modulePath) => {

    var path = require('path');
    var webpack = require(`${modulePath}/webpack`);
    var HtmlWebpackPlugin = require(`${modulePath}/html-webpack-plugin`);

    return {
        // if single entry is used, bundle name will be named as main.js
        entry: {
            main: "./index",
            common: ['jquery', 'vue', 'vue-router', 'vue-i18n', 'vue-validator', 'vuex', 'taggle', 'select2']
        },
        output: {
            publicPath: '/'
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
                chunks: ['main', 'common']
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: "common"
            })
        ],
        module: {
            rules: []
        },
        resolve: {
            alias: {
                templates: path.resolve("./templates")
            }
        },
        externals: [],
        devServer: {
            proxy: {
                '*': 'http://localhost:3000'
            }
        }
    };
};
