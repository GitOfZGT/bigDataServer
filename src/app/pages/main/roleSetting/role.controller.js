
class ctrl {
    constructor(ApiUser, zAlert, $state, $timeout, $filter,zNotification) {
        'ngInject'
        this._ApiUser = ApiUser;
        this._zAlert = zAlert;
        this._state = $state;
        this._timeout = $timeout;
        this._filter = $filter;
this._zNotification = zNotification;
        this.AppsList = JSON.parse(sessionStorage.getItem('roleData'));
        console.log(this.AppsList)
        this.searchWord = '';
       
        this.headInfo = {
            title: '角色管理',
            btnGroup: [],
            crumbs: [{
                    name: '首页',
                    router: 'pages'
                },
                {
                    name: '角色管理'
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
    removeRole(id){
        var staticList = JSON.parse(sessionStorage.getItem('roleData'));
        for(let i=0;i<staticList.length;i++){
            if(id==staticList[i].id){
                staticList.splice(i,1);
                sessionStorage.setItem('roleData',JSON.stringify(staticList));
                this._zNotification.success("删除成功");
                break;
            }
        }
        this.filterApp();
        this.getList();
    }
    filterApp() {
        this.page.page = 1;
        var staticList = JSON.parse(sessionStorage.getItem('roleData'));
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