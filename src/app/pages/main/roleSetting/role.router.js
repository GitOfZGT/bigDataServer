import ctrl from './role.controller';
import temp from './role.view.html';

export default function config($stateProvider){
    'ngInject'
    $stateProvider.state('pages.role',{
        url:'/role',
        controller:ctrl,
        controllerAs:'vm',
        templateUrl:temp
        // ,
        // resolve:{
        //     rolesList:function(Apirole){
        //         'ngInject'
        //         return Apirole.getroleList();
        //     }
        // }
    })
}