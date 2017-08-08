import Mock from 'mockjs';
(function() {
    if (localStorage.getItem('userData') != undefined) {
        return;
    }
    // localStorage.removeItem('region');
    // localStorage.removeItem('branch');
    // localStorage.removeItem('use');
    // localStorage.removeItem('appList');
    // localStorage.removeItem('superRole');
    // localStorage.removeItem('roleData');
    // localStorage.removeItem('userData');
    let region = [{ "name": "省级", "code": "440000" }, { "name": "广州市", "code": "440100" }, { "name": "韶关市", "code": "440200" }, { "name": "深圳市", "code": "440300" }, { "name": "珠海市", "code": "440400" }, { "name": "汕头市", "code": "440500" }, { "name": "佛山市", "code": "440600" }, { "name": "江门市", "code": "440700" }, { "name": "湛江市", "code": "440800" }, { "name": "茂名市", "code": "440900" }, { "name": "肇庆市", "code": "441200" }, { "name": "惠州市", "code": "441300" }, { "name": "梅州市", "code": "441400" }, { "name": "汕尾市", "code": "441500" }, { "name": "河源市", "code": "441600" }, { "name": "阳江市", "code": "441700" }, { "name": "清远市", "code": "441800" }, { "name": "东莞市", "code": "441900" }, { "name": "中山市", "code": "442000" }, { "name": "潮州市", "code": "445100" }, { "name": "揭阳市", "code": "445200" }, { "name": "云浮市", "code": "445300" }],
        branchs = [{ name: '工商局' }, { name: '民政局' }, { name: '税务局' }, { name: '公安局' }, { name: '国税局' }],
        use = [{ name: '用途1' }, { name: '用途2' }, { name: '用途3' }];

    let branch = [];

    region.forEach(function(el) {
        for (var i = 0; i < branchs.length - 2; i++) {
            var pb = {
                "region": el.name,
                "name": branchs[Math.round(Math.random() * (branchs.length - 1))].name
            }
            var has = false;
            branch.forEach(function(item) {
                if (pb.region == item.region && pb.name == item.name) {
                    has = true;
                }
            });
            if (!has)
                branch.push(pb);
        }
    })

    localStorage.setItem('region', JSON.stringify(region));
    localStorage.setItem('branch', JSON.stringify(branch));
    localStorage.setItem('use', JSON.stringify(use));
    //总数据：
    let data = Mock.mock({
            "list|100": [{
                "id|+1": 1,
                "createTime": function() {
                    return Mock.Random.date('yyyy-MM-dd');
                },
                "use": function() {
                    return use[Math.round(Math.random() * (use.length - 1))].name;
                },
                "region": function() {
                    return region[Math.round(Math.random() * (region.length - 1))].name;
                },
                "branch": function() {
                    var r = this.region;
                    var rb = branch.filter(function(el) {
                        if (el.region == r) {
                            return true;
                        }
                    })
                    return rb[Math.round(Math.random() * (rb.length - 1))].name;
                },
                "appname": function() {
                    // return Mock.Random.csentence(2, 8)+this.id;
                    return "应用名称-" + this.id;
                },
                "dict": function() {
                    return Mock.Random.cparagraph(2, 4)
                },
                "url": "https://www.baidu.com",
                "hasLove": false,
                "enabled": false,
                "openType":function(){
                    if(Math.round(Math.random())>0){
                        return 'iframe';
                    }else{
                        return 'url';
                    }
                }
            }]
        })
        // 时间排序
    data.list.sort(function(p, n) {
        var d1 = p.createTime.split('-');
        var d2 = n.createTime.split('-');
        if (d1[0] < d2[0]) {
            return 1;
        } else if (d1[0] > d2[0]) {
            return -1
        } else {
            if (d1[1] < d2[1]) {
                return 1;
            } else if (d1[1] > d2[1]) {
                return -1;
            } else {
                if (d1[2] < d2[2]) {
                    return 1;
                } else if (d1[2] > d2[2]) {
                    return -1;
                } else {
                    return 0;
                }
            }
        }
    });
    localStorage.setItem('appList', JSON.stringify(data.list));
    //用户账号数据：
    //角色管理数据
    let roleData = [{
            "id": 2,
            "roleName": "管理员",
            "permission": {
                "appManage": true,
                "userManage": true,
                "roleManage": true,
                "approveManage":true,
                "admin": true
            },
            "region": "通用",
            "branch": "通用",
            "enbleRemove": false,
            "hideRole": true
        },
        {
            "id": 3,
            "roleName": "普通用户",
            "permission": {
                "appManage": false,
                "userManage": false,
                "roleManage": false
            },
            "region": "通用",
            "branch": "通用",
            "enbleRemove": false
        }
    ]
    let superRole = [{
        "id": 1,
        "roleName": "超级管理员",
        "permission": {
            "appManage": true,
            "userManage": true,
            "roleManage": true,
            "branchManage": true,
            "super": true,
            "admin": true
        },
        "enbleRemove": false,
        "enbleRole": true
    }];

    localStorage.setItem('superRole', JSON.stringify(superRole));
    localStorage.setItem('roleData', JSON.stringify(roleData));
    //用户管理
    let userData = Mock.mock({
        "list|50": [{
            "id|+1": 1,
            "createTime": function() {
                return Mock.Random.date('yyyy-MM-dd');
            },
            "userName": function() {
                return 'user-' + this.id;
            },
            "password": "123456",
            "region": function() {
                return region[Math.round(Math.random() * (region.length - 1))].name;
            },
            "branch": function() {
                var _this = this;
                var mb = branch.filter(function(el) {
                    if (_this.region == el.region) {
                        return true;
                    }
                })
                return mb[Math.round(Math.random() * (mb.length - 1))].name;
            },
            "roleName": function() {
                return roleData[Math.round(Math.random() * (roleData.length - 1))].roleName;
            },
            "enbleRemove": true,
            "email": function() {
                return Mock.Random.email();
            },
            "mobile": function() {
                return Mock.Random.zip();
            },
            "useApp": function() {
                let appids = [];
                let len = Math.ceil(Math.random() * 10);
                for (var i = 0; i < len; i++) {
                    var id = data.list[Math.round(Math.random() * (data.list.length - 1))].id;
                    if (appids.indexOf(id) == -1) {
                        appids.push(id);
                    }
                }

                return appids;
            },
            "loveApp": function() {
                let appids = [];
                let len = Math.ceil(Math.random() * 7);
                for (var i = 0; i < len; i++) {
                    var id = data.list[Math.round(Math.random() * (data.list.length - 1))].id;
                    if (appids.indexOf(id) == -1) {
                        appids.push(id);
                    }
                }

                return appids;
            },
            "applyApp":[]
        }]

    })
    let allid = [];
    data.list.forEach(function(el) {
        allid.push(el.id);
    })
    userData.list = userData.list.concat([{
        "branch": "全部",
        "createTime": "1992-09-16",
        "email": "g.yvbnvybd@lqux.ck",
        "enbleRemove": true,
        "id": 55,
        "mobile": "167665",
        "password": "superAdmin",
        "region": "全部",
        "roleName": "超级管理员",
        "userName": "superAdmin",
        "useApp": allid,
        "loveApp": [],
        "applyApp":[]
    }])
    //用户数据
    localStorage.setItem('userData', JSON.stringify(userData.list));
    //申请消息：
    localStorage.setItem('applyForMsg',JSON.stringify([]));
    //反馈消息
    localStorage.setItem('feedbackMsg',JSON.stringify([]));
    //审批数据
    localStorage.setItem('approves',JSON.stringify([]));
})();