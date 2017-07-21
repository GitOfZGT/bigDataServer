import gulp     from 'gulp';
import gutil    from 'gulp-util';
import del      from 'del';
import webpack  from 'webpack';
import config   from './config';

gulp.task('clean-dist', () => {
    del([config.PATH_DIST]).then(function (paths) {
        gutil.log("[clean]", paths);
    })
});


gulp.task('build', ['clean-dist'], () => {
    const webpackConfig = require('./webpack.build.config').default;

    webpack(webpackConfig, (err, stats) => {
        if(err) {
            throw new gutil.PluginError("webpack", err);
        }

        gutil.log("[webpack]", stats.toString({
            colors: true,
            chunks: false,
            errorDetails: true
        }));
    });
});


