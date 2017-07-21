import webpack       from 'webpack';
import config        from './config';
import webpackConfig from './webpack.config';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

webpackConfig.devtool = 'sourcemap';

webpackConfig.output = {
    filename: 'scripts/[name].min.js',
    publicPath: '',
    path: config.PATH_DIST
};

webpackConfig.module.loaders = webpackConfig.module.loaders.concat([
    {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("css!autoprefixer!sass")
    }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("css")
    }
]);

webpackConfig.plugins = webpackConfig.plugins.concat([
    /**
     * 压缩js
     */
    new webpack.optimize.UglifyJsPlugin({
        mangle: {
            except: ['$super', '$', 'exports', 'require', 'angular']
        }
    }),

    /**
     * 将webpack中css抽出存入单独文件
     */
    new ExtractTextPlugin('[name].min.css',{
        allChunks: true
    })
]);

export default webpackConfig;