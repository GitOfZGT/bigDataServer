class ctrl {
    constructor(zNotification, $timeout) {
        'ngInject'
     
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
           //登录的用户：
        this.thisUser = JSON.parse(sessionStorage.getItem('thisUser'));
        this.super = this.thisUser.permission.super;
         this.region = JSON.parse(localStorage.getItem('region'));
        //地区选择框
        this.regionSelectList = this.region;
        this.branchSelectList = [{name:''}];
        this.user = {
            roleName: '',
            region: this.regionSelectList[0].name,
            branch: ''
        };
        this.permission = {
            appManage: false,
            userManage: false,
            roleManage: false
        }
        this.btnName = '创建';
        this.getBranch();

    }
     getBranch() {
        setTimeout(() => {
            let branch = JSON.parse(localStorage.getItem('branch'));
            branch = branch.filter((el) => {
                if (this.user.region == el.region) {
                    return true;
                }
            })
            if (branch.length > 0)
                this.user.branch = '';
            this.branchSelectList = branch;
        })

    }
    create() {
        this.btnLoading = true;
        this._timeout(() => {
            let roleArr = JSON.parse(localStorage.getItem('roleData'));
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
            var admin=false;
            for(var ky in this.permission){
                    if(this.permission[ky]){
                        console.log(this.permission[ky])
                        admin=true;
                        break;
                    }
            }
            if(admin){
                role.permission.admin=admin;
            }
            roleArr.push(role);
            localStorage.setItem('roleData', JSON.stringify(roleArr));
            this._zNotification.success('创建成功');
            this.btnLoading =false;
        }, 200)

    }
}

export default ctrl;