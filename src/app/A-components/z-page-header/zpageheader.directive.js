import tempUrl from './template.view.html';
import './index.scss'

class zPageHeader {
    constructor() {
        this.scope = {
            headerInfo: '='
           /* headerInfo {
                title: '',
                crumbs: [{ name: '', router: '' }]
                btnGroup[{ name: '', icon: '', onClick: function() {} }]
            }*/

        };
        this.restrict = 'AE';
        this.replace = true;
        this.templateUrl = tempUrl;
        this.controller=function($scope){
            'ngInject'
            if(!$scope.headerInfo.onBack){
                $scope.headerInfo.onBack=()=>{
                    history.back();
                }
            }
        }
    }
    
    static factory() {
        return new zPageHeader();
    }
}

export default {
    name: 'zPageHeader',
    fn: zPageHeader.factory
};