import gulp     from 'gulp';
import webpack  from 'webpack';
import url      from 'url';
import serve    from 'browser-sync';
import config   from './config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import proxy from "http-proxy-middleware";

gulp.task('serve', () => {
    const webpackConfig = require('./webpack.dev.config').default;
    webpackConfig.entry.app = [
        // 启用webpack HRM
        'webpack-hot-middleware/client?reload=true'
    ].concat(webpackConfig.entry.app);

    var compiler = webpack(webpackConfig);

//    var proxyOptions = proxy(function(pathname,req){
//        return !pathname.match('^/src') && !pathname.match('^/dist');
//    },{target: 'http://42.123.125.171:8777/ctg-dwf-admin', changeOrigin: true});
//    var proxyOptions = proxy('/api',{target: 'http://42.123.127.38:9981', changeOrigin: true});
    serve({
        port: process.env.PORT || config.SERVER_PORT,
        open: false,
        server: { baseDir: config.PATH_SRC,port:config.SERVER_PORT},
        middleware: [
            webpackDevMiddleware(compiler, {
                hot:true,
                stats: {
                    colors: true,
                    chunks: false,
                    modules: false
                },
                publicPath: webpackConfig.output.publicPath
            }),
            webpackHotMiddleware(compiler)
            // proxyOptions
        ]
    })
});
