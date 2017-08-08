class ctrl {
    constructor(zAlert, $state, $timeout, $filter, zNotification, iframeWin,appDetails) {
        'ngInject'

        this._zAlert = zAlert;
        this._state = $state;
        this._timeout = $timeout;
        this._filter = $filter;
        this._iframeWin = iframeWin;
         this._appDetails=appDetails;
        this._zNotification = zNotification;

        this.searchWord = '';

        this.headInfo = {
            title: '可用的应用服务',
            btnGroup: [],
            crumbs: [{
                    name: '首页'
                },
                {
                    name: '可用的应用服务'
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
        this.getApps();
    }

    getApps() {
        let allapp = JSON.parse(localStorage.getItem('appList'));
        this.myApps = allapp.filter((el) => {
            if (this.User.useApp.indexOf(el.id) > -1) {
                el.enabled = true;
                if (this.User.loveApp.indexOf(el.id) > -1) {
                    el.hasLove = true;
                }
                 return true;
            }
        });
        this.filterApp();
    }
    openApp(item) {
        this._iframeWin.open(item);
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
                    let i = loveList.indexOf(item.id);
                    if (i > -1) {
                        loveList.splice(i, 1);
                        this.setUsers();
                        this._zNotification.success('取消收藏成功');
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
        var staticList = this.myApps.slice(0);
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
}

export default ctrl;