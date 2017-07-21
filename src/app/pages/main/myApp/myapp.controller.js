class ctrl {
    constructor(ApiUser, zAlert, $state, $timeout, $filter, zNotification) {
        'ngInject'
        this._ApiUser = ApiUser;
        this._zAlert = zAlert;
        this._state = $state;
        this._timeout = $timeout;
        this._filter = $filter;
        this._zNotification = zNotification;
        this.AppsList = JSON.parse(sessionStorage.getItem('myAppList'));
        this.searchWord = '';

        this.headInfo = {
            title: '我的应用',
            btnGroup: [],
            crumbs: [{
                    name: '首页',
                    router: 'pages'
                },
                {
                    name: '我的应用'
                }
            ],
            hideBack: true
        }

        this.page = {
            page: 1,
            page_size: 6,
            total: 0
        }
        this.getList();

        //筛选项：
        this.filtrate = {
            keyword: ''
        }
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
                    let loveList = JSON.parse(sessionStorage.getItem('loveAppList'));

                    for (var i = 0; i < loveList.length; i++) {
                        if (item.id == loveList[i].id) {
                            loveList.splice(i, 1);
                            sessionStorage.setItem('loveAppList', JSON.stringify(loveList));
                            this._zNotification.success('取消收藏成功');
                            break;
                        }
                    }

                } else {
                    item.hasLove = true;
                    let loveList = JSON.parse(sessionStorage.getItem('loveAppList'));
                    loveList.push(item);
                    sessionStorage.setItem('loveAppList', JSON.stringify(loveList));
                    this._zNotification.success('收藏成功');
                }
            }
        })
    }
    filterApp() {
        this.page.page = 1;
        var staticList = JSON.parse(sessionStorage.getItem('myAppList'));
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
            result.forEach((el) => {
                var loveList = JSON.parse(sessionStorage.getItem('loveAppList'));
                for (var i = 0; i < loveList.length; i++) {
                    if (el.id == loveList[i].id) {
                        el.hasLove = true;
                    }else{
                        el.hasLove=false;
                    }
                }
            })
            this.usersList = result;
            this.page.total = this.AppsList.length;
        }, 250)


    }
    changePage() {
        this.getList();
    }
}

export default ctrl;