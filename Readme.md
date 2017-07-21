###此开发环境基于nodejs,由gulp+webpack配置的
###环境准备
先在本地安装nodejs

###依赖包安装
依赖包全部记录在package.json

命令行进入项目文件夹
运行命令：npm install
等待全部安装完成


###运行项目  /build/gulp.dev.js
命令：gulp serve

运行如有报错，可能是依赖包版本问题，用npm uninstall jquery （此处以jquery为例）卸载对应的依赖包，重新安装一个版本 npm install jquery@2.2.0后
再运行

启动成功后浏览器打开
 http://localhost:5001    //端口可在/build/config.js设置


###打包  /build/gulp.build.js
命令：gulp build       //最后会在项目根目录生成dist文件夹

