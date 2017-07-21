import ctrl from './user.controller';
import temp from './user.view.html';

export default function config($stateProvider){
    'ngInject'
    $stateProvider.state('pages.user',{
        url:'/user',
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