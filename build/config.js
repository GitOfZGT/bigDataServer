import path from 'path';

const BASE_PATH = path.join(__dirname, '../');
console.log(BASE_PATH)

export default {
    /**
     * 服务器端口
     */
    SERVER_PORT: 5001,


    /**
     * 路径地址
     */
    PATH_SRC: path.join(BASE_PATH, 'src'),
    PATH_DIST: path.join(BASE_PATH, 'dist'),
    PATH_NODE_MODULES: path.join(BASE_PATH, 'node_modules'),


    /**
     * Webpack 入口文件
     */
    WEBPACK_APP: [ path.join(BASE_PATH, 'src/app/app.js') ],


    /**
     * 指定图片转换成BASE64的最大比特数
     * 当图片大小小于指定比特数时转换为BASE64以减少请求数，否则直接使用图片文件
     */
    BASE64_LIMIT: 2048
}