import ctrl from './approveCenter.controller';
import temp from './approveCenter.view.html';

export default function config($stateProvider){
    'ngInject'
    $stateProvider.state('pages.approveCenter',{
        url:'/approveCenter',
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