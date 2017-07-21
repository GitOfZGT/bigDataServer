import ctrl from './appSetting.controller';
import temp from './appSetting.view.html';

export default function config($stateProvider){
    'ngInject'
    $stateProvider.state('pages.appSetting',{
        url:'/appSetting',
        controller:ctrl,
        controllerAs:'vm',
        templateUrl:temp
        // ,
        // resolve:{
        //     appSettingsList:function(ApiappSetting){
        //         'ngInject'
        //         return ApiappSetting.getappSettingList();
        //     }
        // }
    })
}