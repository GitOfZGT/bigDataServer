import showRole from './show.role.view.html';
class ctrl {
    constructor(zAlert, $state, $timeout, $filter, zNotification) {
        'ngInject'

        this._zAlert = zAlert;
        this._state = $state;
        this._timeout = $timeout;
        this._filter = $filter;
        this._zNotification = zNotification;
        // this.AppsList = JSON.parse(localStorage.getItem('roleData'));
        this.User = JSON.parse(sessionStorage.getItem('thisUser'));
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
        this.showRoleHtml=showRole;
        this.page = {
                page: 1,
                page_size: 6,
                total: 0
            }
            //筛选项：
        this.filtrate = {
            keyword: '',
            region: '全部',
            branch: '全部',
        }
         this.selectRegion('region', this.region[0]);
        this.filterApp();
        this.getList();


    }
     getBranch() {
        let branch = JSON.parse(localStorage.getItem('branch'));
        branch = branch.filter((el) => {
            if (this.filtrate.region == el.region) {
                return true;
            }
        })
        branch.unshift({ name: '全部'});
        this.chosion.branch = branch;
         this.selectBranch('branch', branch[0]);
    }
    removeRole(id) {
        var staticList = JSON.parse(localStorage.getItem('roleData'));
        for (let i = 0; i < staticList.length; i++) {
            if (id == staticList[i].id) {
                staticList.splice(i, 1);
                localStorage.setItem('roleData', JSON.stringify(staticList));
                this._zNotification.success("删除成功");
                break;
            }
        }

        this.filterApp();
        this.getList();
    }
    filterApp() {
        this.page.page = 1;
        var staticList = JSON.parse(localStorage.getItem('roleData'));
        //关键词过滤
        if (this.filtrate.keyword != '') {
            staticList = this._filter('filter')(staticList, this.filtrate.keyword);
        }
        //超级管理员的权限：
        if (this.User.permission.super) {
            staticList.forEach(function(el) {
                if (el.region == "通用") {
                    el.hideRole = false;
                    // el.enbleRemove = true;
                }
            });
            //过滤地区
            if (this.filtrate.region != "全部") {
                staticList = staticList.filter((el) => {
                    if (el.region == this.filtrate.region || el.region == "通用") {
                        return true;
                    }
                });
            }
            //过滤部门
            if (this.filtrate.branch != "全部") {
                staticList = staticList.filter((el) => {
                    if (el.branch == this.filtrate.branch || el.branch == "通用") {
                        return true;
                    }
                });
            }
        }else{
            //获取登录用户的部门对应角色
           staticList= staticList.filter((el)=>{
                if((el.region==this.User.region&&el.branch==this.User.branch)||el.region=="通用"){
                    return true;
                }
            });
        }
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
}

export default ctrl;