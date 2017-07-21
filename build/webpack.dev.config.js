import webpack       from 'webpack';
import config        from './config';
import webpackConfig from './webpack.config';

webpackConfig.devtool = 'inline-source-map';

webpackConfig.output = {
    filename: 'scripts/[name].js',
    publicPath: '/',
    path: config.PATH_SRC
};

webpackConfig.module.loaders = webpackConfig.module.loaders.concat([
    {
        test: /\.scss$/,
        loader: 'style!css!autoprefixer!sass'
    }, {
        test: /\.css$/,
        loader: 'style!css'
    }
]);

webpackConfig.plugins = webpackConfig.plugins.concat([
    /**
     * 增加webpack HMR支持
     * 监听到文件改动后自动刷新浏览器
     */
    new webpack.HotModuleReplacementPlugin()
]);

export default webpackConfig;