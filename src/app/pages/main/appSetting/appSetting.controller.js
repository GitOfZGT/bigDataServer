
class ctrl {
    constructor(ApiUser, zAlert, $state, $timeout, $filter) {
        'ngInject'
        this._ApiUser = ApiUser;
        this._zAlert = zAlert;
        this._state = $state;
        this._timeout = $timeout;
        this._filter = $filter;
 this.User= JSON.parse(sessionStorage.getItem('thisUser'));
        this.AppsList = JSON.parse(sessionStorage.getItem('appList'));
        this.searchWord = '';
        var region = JSON.parse(sessionStorage.getItem('region')),
            branch = JSON.parse(sessionStorage.getItem('branch')),
            use = JSON.parse(sessionStorage.getItem('use'));
        region.unshift({ name: '全部', active: true });
        branch.unshift({ name: '全部', active: true });
        use.unshift({ name: '全部', active: true });
        this.chosion = {
            region: region,
            branch: branch,
            use: use
        }
        this.headInfo = {
            title: '应用服务管理',
            btnGroup: [],
            crumbs: [{
                    name: '首页',
                    router: 'pages'
                },
                {
                    name: '应用服务管理'
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
            keyword: '',
            region: '全部',
            branch: '全部',
            use: '全部'
        }
    }
     notMyBranch(){
        if(this.filtrate.region==this.User.region&&this.filtrate.branch==this.User.branch){
            this.isMyBranch=true;
        }else{
             this.isMyBranch=false;
        }
    }
    selectRB(key){
         for (let i = 0; i < this.chosion[key].length; i++) {
            if (this.chosion[key][i].name==this.filtrate[key]) {
                this.chosion[key][i].active = true;
               
            }else{
                this.chosion[key][i].active = false;
            }
        }
    }
    myBranch(){
        if(this.isMyBranch){
            return;
        }
        this.isMyBranch=true;
        this.filtrate.keyword='';
        this.searchWord = '';
        this.filtrate.region=this.User.region;
        this.filtrate.branch=this.User.branch;
        this.selectRB('region');
        this.selectRB('branch');
        this.filterApp();
        this.getList();
    }
    filterApp() {
        this.page.page = 1;
        var staticList = JSON.parse(sessionStorage.getItem('appList'));
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
        //过滤用途
        if (this.filtrate.use != "全部") {
            staticList = staticList.filter((el) => {
                if (el.use == this.filtrate.use) {
                    return true;
                }
            });
        }
        this.notMyBranch();
        this.AppsList = staticList;
    }
    
    selectRegion(key, item) {
        this.setSeartionActive(key, item);
        this.filtrate.region = item.name;

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
        this.usersList = null;
        this._timeout(() => {
            var limit = this.page.page_size, //个数
                begin = this.page.page_size * (this.page.page - 1); //从哪开始

            this.usersList = this._filter('limitTo')(this.AppsList, limit, begin);
            this.page.total = this.AppsList.length;
        }, 250)


    }
    changePage() {
        this.getList();
    }
}

export default ctrl;