class ctrl {
    constructor(ApiUser) {
        'ngInject'
        this._ApiUser = ApiUser;
        this.headInfo = {
            title: '应用服务接入',
            btnGroup: null,
            crumbs: [{
                    name: '应用服务',
                    router: 'pages.apps'
                },
                {
                    name: '应用服务接入'
                }
            ]
        }
        this.user = {};
        this.btnName = '应用接入';
        // if (detail) {
        //     this.btnName = '应用修改';
        //     this.userId=true;
        //    this.user = {
        //         "username": detail.detail.username,
        //         "ct_user_id": detail.detail.ct_user_id,
        //         "mobile": detail.detail.mobile,
        //         "ct_account_id": re.detail.ct_account_id,
        //         "email": detail.detail.email
        //     }
        // }

    }
    create() {
        this.btnLoading=true;
        this._ApiUser.createUser(this.user).then((re) => {
            console.log(re);
        }).finally(()=>{
            this.btnLoading=false;
        })
    }
}

export default ctrl;