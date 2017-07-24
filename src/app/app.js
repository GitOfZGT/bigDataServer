import 'framework_js'; //请查看build/webpack.config.js
import 'pasp_js';
import 'pasp_css';
import '../styles/index.scss';
import 'velocity';
import imgs from './images/contact_man.png';

/**
 * 自动页面加载
 */
// angular.module('A-directives',[]);

let dependencies = ['pasp.ui'];
let pageModules = require.context('./', true, /\.index.js$/);
pageModules.keys().forEach((key) => {
    dependencies.push(pageModules(key).default);
});

/**
 * 创建应用
 */
let app = angular.module('main', dependencies).run(($rootScope, $location, $state, $timeout) => {
    if (!localStorage.getItem('hasLogin')) {
        $state.go('login');
    }
    $rootScope.headPortrait = { imgs }; //头像
    $rootScope.ifameSrc = '';
    $rootScope.prveClass = '';
    $rootScope.$watch(function() {
        return $location.path();
    }, function(newV) {
        document.body.scrollTop = 0;
        angular.element(document.body).removeClass($rootScope.prveClass).addClass($rootScope.prveClass = newV.split('/').pop());
    });


    // $rootScope.$on('$stateChangeStart', function(event, transition) {
    // //   event.preventDefault();
    // //   console.log(1)

    //   $rootScope.showLoading=true;

    // })
    // $rootScope.$on('$stateChangeSuccess', function(event, transition) {
    // //   event.preventDefault();
    // //   console.log(2)
    //    $timeout(function(){
    //   $rootScope.showLoading=false;

    //   },1000)
    // })
}).constant('uibPaginationConfig', {
    firstText: '第一页',
    previousText: '上一页',
    nextText: '下一页',
    lastText: '最后一页',
    boundaryLinks: false,
    directionLinks: true,
    itemsPerPageSelect: false
});


/**
 * 注册应用
 */
angular.bootstrap(document.body, [app.name]);