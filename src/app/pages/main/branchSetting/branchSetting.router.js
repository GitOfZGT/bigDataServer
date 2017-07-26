import ctrl from './branchSetting.controller';
import temp from './branchSetting.view.html';

export default function config($stateProvider){
    'ngInject'
    $stateProvider.state('pages.branchSetting',{
        url:'/branchSetting',
        controller:ctrl,
        controllerAs:'vm',
        templateUrl:temp
        // ,
        // resolve:{
        //     branchSettingsList:function(ApibranchSetting){
        //         'ngInject'
        //         return ApibranchSetting.getbranchSettingList();
        //     }
        // }
    })
}