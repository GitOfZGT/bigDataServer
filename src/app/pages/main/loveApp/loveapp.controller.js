class ctrl {
    constructor(zAlert, $state, $timeout, $filter, zNotification, applyFor, iframeWin,appDetails) {
        'ngInject'

        this._zAlert = zAlert;
        this._state = $state;
        this._timeout = $timeout;
        this._filter = $filter;
        this._applyFor = applyFor;
        this._iframeWin = iframeWin;
        this._zNotification = zNotification;
        this._appDetails=appDetails;

        this.searchWord = '';

        this.headInfo = {
            title: '我的收藏',
            btnGroup: [],
            crumbs: [{
                    name: '首页',
                    router: 'pages'
                },
                {
                    name: '我的收藏'
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
            keyword: ''
        }
        this.getThisUser();

        this.getList();

    }
      openDetail(item){
        this._appDetails.open(item);
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
        this.getLoveApps();
    }
    getLoveApps() {
        let allapp = JSON.parse(localStorage.getItem('appList'));
        this.loveApps = allapp.filter((el) => {
            if (this.User.loveApp.indexOf(el.id) > -1) {
                el.hasLove = true;
                if (this.User.useApp.indexOf(el.id) > -1) {
                    el.enabled = true;
                }
                if (this.User.applyApp.indexOf(el.id) > -1) {
                    el.applyStatus = 1;
                }
                return true;
            }
        });
        this.filterApp();
    }
    deleteLove(item) {
        this._zAlert.open({
            title: item.appname,
            action: '移除',
            onAction: () => {
                let loveList = this.User.loveApp;
                let i = loveList.indexOf(item.id);
                if (i > -1) {
                    loveList.splice(i, 1);
                    this.setUsers();
                    this._zNotification.success('移除收藏成功');
                }

                this.getThisUser();
                this.getList();
            }
        })


    }
    filterApp() {
        this.page.page = 1;
        var staticList = this.loveApps.slice(0);
        //关键词过滤
        if (this.filtrate.keyword != '') {
            staticList = this._filter('filter')(staticList, this.filtrate.keyword);
        }
        this.AppsList = staticList;
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
        this.usersList = null;
        this._timeout(() => {
            var limit = this.page.page_size, //个数
                begin = this.page.page_size * (this.page.page - 1); //从哪开始
            var result = this._filter('limitTo')(this.AppsList, limit, begin);

            this.usersList = result;
            this.page.total = this.AppsList.length;
        }, 250)


    }
    changePage() {
        this.getList();
    }

    applyFor(item) {
        this._applyFor.applyAlert(item);
    }
    openApp(item) {
        this._iframeWin.open(item);
    }
}

export default ctrl;