import templateUrl from './login.view.html';
import controller  from './login.controller';

export default function config($urlRouterProvider, $stateProvider) {
    "ngInject";
 //:entry  分为 user和admin
    $stateProvider.state('login', {
        url: '/login/:entry',
        controller: controller,
        controllerAs: 'vm',
        templateUrl: templateUrl
    });
}