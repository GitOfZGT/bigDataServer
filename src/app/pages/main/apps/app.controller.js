class ctrl {
    constructor(zAlert, $state, $timeout, $filter, zNotification,applyFor,iframeWin,appDetails) {
        'ngInject'

        this._zAlert = zAlert;
        this._state = $state;
        this._timeout = $timeout;
        this._iframeWin=iframeWin;
        this._appDetails=appDetails;
        this._filter = $filter;
        this._zNotification = zNotification;
        this._applyFor=applyFor;
        this.searchWord = '';
        this.region = JSON.parse(localStorage.getItem('region'));
        // branch = JSON.parse(localStorage.getItem('branch')),
        // use = JSON.parse(localStorage.getItem('use'));
        this.region.unshift({ name: '全部', active: true });
        // branch.unshift({ name: '全部', active: true });
        // use.unshift({ name: '全部', active: true });
        this.chosion = {
            region: this.region,
            branch: []
        }
        this.headInfo = {
            title: '应用服务共享中心',
            btnGroup: [],
            crumbs: [{
                    name: '首页',
                    router: 'pages'
                },
                {
                    name: '应用服务'
                }
            ],
            hideBack: true
        }

        this.page = {
            page: 1,
            page_size: 12,
            total: 0
        }


        //筛选项：
        this.filtrate = {
            keyword: '',
            region: '全部',
            branch: '全部',
            use: '全部'
        }
        this.getThisUser();
        // this.selectRegion('region', this.region[0]);
        this.myBranch();
    }
    openDetail(item){
        this._appDetails.open(item);
    }
     openApp(item) {
        this._iframeWin.open(item);
    }
    setUsers() {
        sessionStorage.setItem('thisUser', JSON.stringify(this.User));
        let allusers = JSON.parse(localStorage.getItem('userData'));
        for (var i = 0; i < allusers.length; i++) {
            if (this.User.id == allusers[i].id) {
                allusers.splice(i, 1, this.User);
                break;
            }
        }
        localStorage.setItem('userData', JSON.stringify(allusers));
    }
    getThisUser() {
        this.User = JSON.parse(sessionStorage.getItem('thisUser'));
        this.super = this.User.permission.super;
        this.getApps();
    }
    getApps() {
        let allapp = JSON.parse(localStorage.getItem('appList'));
        this.Apps = allapp.filter((el) => {
            if (this.User.loveApp.indexOf(el.id) > -1) {
                el.hasLove = true;
            }
            if (this.User.useApp.indexOf(el.id) > -1) {
                el.enabled = true;
            }
            if (this.User.applyApp.indexOf(el.id) > -1) {
                el.applyStatus = 1;
            }
            return true;

        });
        this.filterApp();
    }
    getBranch() {
        let branch = JSON.parse(localStorage.getItem('branch'));
        branch = branch.filter((el) => {
            if (this.filtrate.region == el.region) {
                return true;
            }
        })
        branch.unshift({ name: '全部' });
        this.chosion.branch = branch;
        this.selectBranch('branch', branch[0]);
    }
    notMyBranch() {
        if (this.filtrate.region == this.User.region && this.filtrate.branch == this.User.branch) {
            this.isMyBranch = true;
        } else {
            this.isMyBranch = false;
        }
    }
    selectRB(key) {
        for (let i = 0; i < this.chosion[key].length; i++) {
            if (this.chosion[key][i].name == this.filtrate[key]) {
                this.chosion[key][i].active = true;

            } else {
                this.chosion[key][i].active = false;
            }
        }
    }
    myBranch() {
        
        this.isMyBranch = true;
        this.searchWord = '';
        this.filtrate.keyword = '';
        this.filtrate.region = this.User.region;
        this.selectRB('region');
        this.getBranch();
        this.filtrate.branch = this.User.branch;
        this.selectRB('branch');
        this.filterApp();
        this.getList();
    }
    pushLove(item) {
        let act = '收藏';
        if (item.hasLove) {
            act = '取消收藏';
        }
        this._zAlert.open({
            title: item.appname,
            action: act,
            onAction: () => {
                if (item.hasLove) {
                    item.hasLove = false;
                    let loveList = this.User.loveApp;

                    for (var i = 0; i < loveList.length; i++) {
                        if (item.id == loveList[i]) {
                            loveList.splice(i, 1);
                            this.setUsers();
                            this._zNotification.success('取消收藏成功');
                            break;
                        }
                    }

                } else {
                    item.hasLove = true;
                    this.User.loveApp.push(item.id);
                    this.setUsers();
                    this._zNotification.success('收藏成功');
                }
                this.getThisUser();
            }
        })
    }
    filterApp() {
        this.page.page = 1;
        var staticList = this.Apps;
        //关键词过滤
        if (this.filtrate.keyword != '') {
            staticList = this._filter('filter')(staticList, this.filtrate.keyword);
        }

        //过滤地区
        if (this.filtrate.region != "全部") {
            staticList = staticList.filter((el) => {
                if (el.region == this.filtrate.region) {
                    return true;
                }
            });
        }
        //过滤部门
        if (this.filtrate.branch != "全部") {
            staticList = staticList.filter((el) => {
                if (el.branch == this.filtrate.branch) {
                    return true;
                }
            });
        }
        // //过滤用途
        // if (this.filtrate.use != "全部") {
        //     staticList = staticList.filter((el) => {
        //         if (el.use == this.filtrate.use) {
        //             return true;
        //         }
        //     });
        // }
        if (!this.super) {
            staticList = staticList.filter((el) => {
                if (el.openBranch) { //这个应用白名单
                    if (el.openBranch.length > 0) {
                        var isopen = false;
                        for (var i = 0; i < el.openBranch.length; i++) {
                            //当前用户的部门是否在这个应用的白名单上
                            if (el.openBranch[i].region == this.User.region && el.openBranch[i].branch == this.User.branch) {
                                isopen = true;
                                break;
                            }
                        }
                        if (isopen) {
                            return true;
                        }
                    } else if (el.region == this.User.region && el.branch == this.User.branch) {
                        //如果白名单是空数组，只有这个应用的来源部门才能看到
                        return true;
                    }
                } else {
                    return true;
                }
            })
        }
        this.notMyBranch();
        this.AppsList = staticList;
    }

    selectRegion(key, item) {
        this.setSeartionActive(key, item);
        this.filtrate.region = item.name;
        this.getBranch();
        this.filterApp();
        this.getList();
    }
    selectBranch(key, item) {
        this.setSeartionActive(key, item);
        this.filtrate.branch = item.name;

        this.filterApp();
        this.getList();
    }
    selectUse(key, item) {
        this.setSeartionActive(key, item);
        this.filtrate.use = item.name;
        this.filterApp();
        this.getList();
    }
    setSeartionActive(key, item) {
        for (let i = 0; i < this.chosion[key].length; i++) {
            if (this.chosion[key][i].active) {
                this.chosion[key][i].active = false;
                break;
            }
        }
        item.active = true;
    }
    keywordClose() {
        this.searchWord = '';
        this.filtrate.keyword = '';
        this.filterApp();
        this.getList();
    }
    search() {
        this.filtrate.keyword = this.searchWord;
        this.filterApp();
        this.getList();

    }
    getList() {
        // this.usersList = null;
        this.listLoading=true;
        this._timeout(() => {
            var limit = this.page.page_size, //个数
                begin = this.page.page_size * (this.page.page - 1); //从哪开始
            var result = this._filter('limitTo')(this.AppsList, limit, begin);
            this.usersList = result;
            this.page.total = this.AppsList.length;
            this.listLoading=false;
        }, 250)


    }
    changePage() {
        this.getList();
    }

    applyFor(item){
        this._applyFor.applyAlert(item);
    }
}

export default ctrl;