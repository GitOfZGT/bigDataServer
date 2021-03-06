    import templateUrl from './main.view.html';
import controller  from './main.controller';

export default function config($urlRouterProvider, $stateProvider) {
    "ngInject";

    $urlRouterProvider
    // .when('/main','/main/myapp')
    .when('/login','/login/user')
    .when('','/login/user');
    $stateProvider.state('pages', {
        url: '/main',
        controller: controller,
        controllerAs: 'vm',
        templateUrl: templateUrl
    });
}