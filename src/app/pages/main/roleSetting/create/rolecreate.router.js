import ctrl from './rolecreate.controller';
import temp from './rolecreate.view.html';

export default function config($stateProvider){
    'ngInject'
    $stateProvider.state('pages.rolecreate',{
        url:'/rolecreate?:id',
        controller:ctrl,
        controllerAs:'vm',
        templateUrl:temp
     
    })
}