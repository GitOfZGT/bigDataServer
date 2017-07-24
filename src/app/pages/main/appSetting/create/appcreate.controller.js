class ctrl {
    constructor($state) {
        'ngInject'
     
        this.headInfo = {
            title: '应用服务接入',
            btnGroup: null,
            onBack:()=>{
                $state.go('pages.appSetting')
            },
            crumbs: [{
                    name: '应用服务',
                    router: 'pages.apps'
                },
                {
                    name: '应用服务接入'
                }
            ]
        }
       
    }
}

export default ctrl;