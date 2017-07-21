import ctrl from './loveapp.controller';
import temp from './loveapp.view.html';

export default function config($stateProvider){
    'ngInject'
    $stateProvider.state('pages.loveapp',{
        url:'/loveapp',
        controller:ctrl,
        controllerAs:'vm',
        templateUrl:temp
        // ,
        // resolve:{
        //     loveappsList:function(Apiloveapp){
        //         'ngInject'
        //         return Apiloveapp.getloveappList();
        //     }
        // }
    })
}