class ctrl {
    constructor(ApiUser, zNotification, $timeout) {
        'ngInject'
        this._ApiUser = ApiUser;
        this._zNotification = zNotification;
        this._timeout = $timeout;
        this.headInfo = {
            title: '角色创建',
            btnGroup: null,
            crumbs: [{
                    name: '角色管理',
                    router: 'pages.role'
                },
                {
                    name: '角色创建'
                }
            ]
        }
        this.user = {};
        this.permission = {
            appManage: false,
            userManage: false,
            roleManage: false
        }
        this.btnName = '创建';
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
        this.thisUser=JSON.parse(sessionStorage.getItem('thisUser'));

    }
    create() {
        this.btnLoading = true;
        this._timeout(() => {
            let roleArr = JSON.parse(sessionStorage.getItem('allroleData'));
            let roleid=0;
            roleArr.forEach((el)=>{
                if(roleid<el.id){
                    roleid=el.id;
                }
            })

            let role = {
                id:parseInt(roleid,10)+1,
                roleName: this.user.username,
                permission: this.permission,
                enbleRemove:true,
                region:this.thisUser.region,
                branch:this.thisUser.branch
            }
            
            roleArr.push(role);
            let branchrole=JSON.parse(sessionStorage.getItem('roleData'));
            branchrole.push(role);
            sessionStorage.setItem('roleData', JSON.stringify(branchrole));
            sessionStorage.setItem('allroleData', JSON.stringify(branchrole));
            this._zNotification.success('创建成功');
            this.btnLoading =false;
        }, 200)

    }
}

export default ctrl;