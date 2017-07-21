class ctrl {
    constructor(ApiUser, zNotification, $timeout) {
        'ngInject'
        this._ApiUser = ApiUser;
        this._zNotification = zNotification;
        this._timeout = $timeout;
        this.headInfo = {
            title: '用户创建',
            btnGroup: null,
            crumbs: [{
                    name: '用户管理',
                    router: 'pages.user'
                },
                {
                    name: '用户创建'
                }
            ]
        }
        let roleSelectList=[{name:''}];
        let roles=JSON.parse(sessionStorage.getItem('roleData'));
        roles.forEach((el)=>{
            roleSelectList.push({
                name:el.roleName
            })
        })
        this.roleSelectList=roleSelectList;
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

    }
    selectback(){
        
    }
    create() {
        this.btnLoading = true;
        this._timeout(() => {
            let userArr = JSON.parse(sessionStorage.getItem('userData'));
            let roleid=0;
            userArr.forEach((el)=>{
                if(roleid<el.id){
                    roleid=el.id;
                }
            });
            let thisUser=JSON.parse(sessionStorage.getItem('thisUser'));
            let user = {
                region:thisUser.region,
                branch:thisUser.branch,
                id:parseInt(roleid,10)+1,
                userName: this.user.username,
                roleName: this.user.roleName,
                email:this.user.email,
                mobile:this.user.mobile,
                password:this.user.password,
                enbleRemove:true
            }
            
            userArr.push(user);
            console.log(userArr)
            sessionStorage.setItem('userData', JSON.stringify(userArr));
            this._zNotification.success('创建成功');
            this.btnLoading =false;
        }, 200)

    }
}

export default ctrl;