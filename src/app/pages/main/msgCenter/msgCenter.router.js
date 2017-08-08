import ctrl from './msgCenter.controller';
import temp from './msgCenter.view.html';

export default function config($stateProvider){
    'ngInject'
    $stateProvider.state('pages.msgCenter',{
        url:'/msgCenter',
        controller:ctrl,
        controllerAs:'vm',
        templateUrl:temp
        // ,
        // resolve:{
        //     usersList:function(Apiuser){
        //         'ngInject'
        //         return Apiuser.getuserList();
        //     }
        // }
    })
}