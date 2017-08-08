class iframeWin {
    constructor($rootScope, $timeout) {
        'ngInject'
        this._rootScope = $rootScope;
        this._timeout = $timeout;
    }
    open(item) {
        let iframe = document.querySelector('#iframeWin');
        if(iframe==null){
            return;
        }
        var thisCtrl = this;
        this._rootScope.iframeLoading = true;
        iframe.onload = () => {
            this._timeout(function() {
                thisCtrl._rootScope.iframeLoading = false;
            })

        }
        iframe.src = item.url;
        this._rootScope.showIframeWin = true;
        angular.element(document.body).addClass('main-iframe');
    }
    close() {
        var iframe = document.querySelector('#iframeWin');
        if (iframe) {
            iframe.src = '';
            this._rootScope.showIframeWin = false;
            angular.element(document.body).removeClass('main-iframe');
        }

    }
}

export default {
    name: 'iframeWin',
    fn: iframeWin,
    method: 'service'
}