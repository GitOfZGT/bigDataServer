import ctrl from './myapp.controller';
import temp from './myapp.view.html';

export default function config($stateProvider){
    'ngInject'
    $stateProvider.state('pages.myapp',{
        url:'/myapp',
        controller:ctrl,
        controllerAs:'vm',
        templateUrl:temp
        // ,
        // resolve:{
        //     myappsList:function(Apimyapp){
        //         'ngInject'
        //         return Apimyapp.getmyappList();
        //     }
        // }
    })
}