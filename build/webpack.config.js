import webpack from 'webpack';
import config  from './config';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
    entry: {
        app: config.WEBPACK_APP
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: [/libs/, /node_modules/],
                loader: 'ng-annotate!babel'
            }, {
                test: /\.view\.html$/,
                loader: 'ngtemplate?relativeTo=' + config.PATH_SRC + '/app/!html'
            }, {
                test: /\.json$/,
                loader: 'json'
            }, {
                test: /\.png/,
                loader: 'url?name=images/[name].[ext]&limit=' + config.BASE64_LIMIT + '&mimetype=image/png'
            }, {
                test: /\.jpg/,
                loader: 'url?name=images/[name].[ext]&limit=' + config.BASE64_LIMIT + '&mimetype=image/jpg'
            }, {
                test: /\.gif/,
                loader: 'url?name=images/[name].[ext]&limit=' + config.BASE64_LIMIT + '&mimetype=image/gif'
            }, {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff&prefix=fonts'
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream&prefix=fonts'
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=application/vnd.ms-fontobject&prefix=fonts'
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml&prefix=fonts'
            }
        ]
    },
    resolve: {
        /**
         * 配置PASP-UI中的文件别名
         */
        alias: {
            framework_js: config.PATH_NODE_MODULES + '/ctg-pasp-ui/scripts/framework.min.js',
            pasp_js: config.PATH_NODE_MODULES + '/ctg-pasp-ui/scripts/pasp.js',
            pasp_css: config.PATH_NODE_MODULES + '/ctg-pasp-ui/styles/pasp.min.css',
            velocity: config.PATH_NODE_MODULES + '/velocity-animate/velocity.min.js'
        }
    },
    plugins: [
        /**
         * 将webpack打包后的js插入html中
         */
        new HtmlWebpackPlugin({
            template: config.PATH_SRC + '/index.html',
            inject: 'body',
            hash: true
        }),

        /**
         * 合并公用代码
         */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module, count) {
                return module.resource && module.resource.indexOf(config.PATH_SRC) === -1;
            }
        })
    ]
};