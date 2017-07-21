import ctrl from './appcreate.controller';
import temp from './appcreate.view.html';

export default function config($stateProvider){
    'ngInject'
    $stateProvider.state('pages.appcreate',{
        url:'/appcreate?:id',
        controller:ctrl,
        controllerAs:'vm',
        templateUrl:temp
     
    })
}