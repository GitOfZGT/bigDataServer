import ctrl from './usercreate.controller';
import temp from './usercreate.view.html';

export default function config($stateProvider){
    'ngInject'
    $stateProvider.state('pages.usercreate',{
        url:'/usercreate?:id',
        controller:ctrl,
        controllerAs:'vm',
        templateUrl:temp
     
    })
}