import ctrl from './base.controller';
import temp from './base.view.html';

export default function config($stateProvider){
    'ngInject'
    $stateProvider.state('pages.appcreate.base',{
        url:'/base',
        controller:ctrl,
        controllerAs:'vm',
        templateUrl:temp
     
    })
}