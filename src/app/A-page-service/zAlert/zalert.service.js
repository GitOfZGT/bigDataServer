import tempUrl from './zalert.view.html'
import ctrl from './zalert.controller.js'
import './index.scss'
class zAlert {
    constructor($uiModal) {
        'ngInject'
        this._uimodal = $uiModal;
    }
  /*  opt:{
        title:'操作信息',
        action:'删除',
        onAction:'操作后的回调',
        onCancel:'取消回调'
    }*/
    open(opt) {
        this._uimodal.open({
            templateUrl: tempUrl,
            controller: ctrl,
            controllerAs: 'vm',
            size: 'sm',
            windowClass: 'alert-dialog alert-dialog-ctg z-alert',
            resolve: {
                alert: () => {
                    return {
                        title: opt.title,
                        action: opt.action
                    }
                }
            }
        }).result.then(opt.onAction,opt.onCancel)
    }
}

export default {
    name: 'zAlert',
    fn: zAlert,
    method: 'service'
}