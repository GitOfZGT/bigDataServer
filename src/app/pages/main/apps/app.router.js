import ctrl from './app.controller';
import temp from './app.view.html';

export default function config($stateProvider){
    'ngInject'
    $stateProvider.state('pages.apps',{
        url:'/apps',
        controller:ctrl,
        controllerAs:'vm',
        templateUrl:temp
        // ,
        // resolve:{
        //     appsList:function(Apiapp){
        //         'ngInject'
        //         return Apiapp.getappList();
        //     }
        // }
    })
}