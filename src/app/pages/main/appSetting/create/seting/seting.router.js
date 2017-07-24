import ctrl from './seting.controller';
import temp from './seting.view.html';

export default function config($stateProvider){
    'ngInject'
    $stateProvider.state('pages.appcreate.seting',{
        url:'/seting',
        controller:ctrl,
        controllerAs:'vm',
        templateUrl:temp
     
    })
}