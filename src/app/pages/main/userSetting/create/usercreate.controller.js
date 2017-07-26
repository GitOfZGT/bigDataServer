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

        let roles = JSON.parse(localStorage.getItem('roleData'));
        //角色选择框
        let roleSelectList = [{ name: "" }];
        roles.forEach((el) => {
            roleSelectList.push({
                name: el.roleName
            })
        })
        this.roleSelectList = roleSelectList;
        this.region = JSON.parse(localStorage.getItem('region'));
        //地区选择框
        this.region.unshift({name:''})
        this.regionSelectList = this.region;
        this.branchSelectList = [{name:""}];
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
            let userArr = JSON.parse(localStorage.getItem('userData'));
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
                enbleRemove: true,
                useApp:[],
                loveApp:[]
            }

            userArr.push(user);
            // console.log(userArr)
            localStorage.setItem('userData', JSON.stringify(userArr));

            this._zNotification.success('创建成功');
            this.btnLoading = false;
        }, 200)

    }
}

export default ctrl;