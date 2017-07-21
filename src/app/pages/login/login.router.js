import templateUrl from './login.view.html';
import controller  from './login.controller';

export default function config($urlRouterProvider, $stateProvider) {
    "ngInject";

    $stateProvider.state('login', {
        url: '/login',
        controller: controller,
        controllerAs: 'vm',
        templateUrl: templateUrl
    });
}