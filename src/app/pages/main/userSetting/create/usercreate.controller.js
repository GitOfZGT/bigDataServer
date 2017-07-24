class ctrl {
    constructor(zNotification, $timeout) {
        'ngInject'

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
            //登录的用户：
        this.thisUser = JSON.parse(sessionStorage.getItem('thisUser'));
        this.super = this.thisUser.permission.super;

        let roles = JSON.parse(sessionStorage.getItem('roleData'));
        //角色选择框
        let roleSelectList = [{ name: "" }];
        roles.forEach((el) => {
            roleSelectList.push({
                name: el.roleName
            })
        })
        this.roleSelectList = roleSelectList;
        var region = JSON.parse(sessionStorage.getItem('region'));
        this.branch = JSON.parse(sessionStorage.getItem('branch'));
        region.unshift({ name: '' });
        this.branch.unshift({ name: '' });
        //地区选择框
        this.regionSelectList = region;
        this.branchSelectList = this.branch;
        this.user = {
            roleName: '',
            region: '',
            branch: ''
        };
        this.permission = {
            appManage: false,
            userManage: false,
            roleManage: false
        }
        this.btnName = '创建';


    }
    swichInput() {
        this.user.branch = '';
        this.isInput = !this.isInput;
    }
    selectback() {

    }
    create() {
        this.btnLoading = true;
        this._timeout(() => {
            let userArr = JSON.parse(sessionStorage.getItem('userData'));
            let roleid = 0;
            userArr.forEach((el) => {
                if (roleid < el.id) {
                    roleid = el.id;
                }
            });
            let user = {
                region: this.super ? this.user.region : this.thisUser.region,
                branch: this.super ? this.user.branch : this.thisUser.branch,
                id: parseInt(roleid, 10) + 1,
                userName: this.user.username,
                roleName: this.user.roleName,
                email: this.user.email,
                mobile: this.user.mobile,
                password: this.user.password,
                enbleRemove: true
            }

            userArr.push(user);
            // console.log(userArr)
            sessionStorage.setItem('userData', JSON.stringify(userArr));
            if(this.super){
                this.branch.push({name:this.user.branch});
                this.branch.shift();
                sessionStorage.setItem('branch', JSON.stringify(this.branch));
            }
            this._zNotification.success('创建成功');
            this.btnLoading = false;
        }, 200)

    }
}

export default ctrl;