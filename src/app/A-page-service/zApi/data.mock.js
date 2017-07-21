import Mock from 'mockjs';
let region = [{ name: "广州市" }, { name: "深圳市" }, { name: "珠海市" }, { name: "河源市" }],
    branch = [{ name: '工商局' }, { name: '民政局' }, { name: '税务局' }],
    use = [{ name: '用途1' }, { name: '用途2' }, { name: '用途3' }]

sessionStorage.setItem('region', JSON.stringify(region));
sessionStorage.setItem('branch', JSON.stringify(branch));
sessionStorage.setItem('use', JSON.stringify(use));
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
            return branch[Math.round(Math.random() * (branch.length - 1))].name;
        },
        "appname": function() {
            // return Mock.Random.csentence(2, 8)+this.id;
            return "应用名称-" + this.id;
        },
        "dict": function() {
            return Mock.Random.cparagraph(2, 4)
        },
        "hasLove": false,
        "enabled": false
    }]
})
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
let lovedata = [];
//从总数据中随机抽取作为收藏数据：
for (var i = 0; i < 5; i++) {
    let app = data.list[Math.round(Math.random() * 99)];
    app.hasLove = true;
    lovedata.push(app);
}


let mydata = [];
//从总数据中随机抽取作为我的应用数据：
for (var i = 0; i < 8; i++) {
    let app = data.list[Math.round(Math.random() * 99)];
    app.enabled = true;
    mydata.push(app);
}
sessionStorage.setItem('loveAppList', JSON.stringify(lovedata));
sessionStorage.setItem('myAppList', JSON.stringify(mydata));
sessionStorage.setItem('appList', JSON.stringify(data.list));
//用户账号数据：
//角色管理数据
let roleData = [{
        "id": 2,
        "roleName": "管理员",
        "permission": {
            "appManage": true,
            "userManage": true,
            "roleManage": true,
            "admin": true
        },
        "enbleRemove": false,
        "enbleRole": true
    },
    {
        "id": 3,
        "roleName": "普通用户",
        "permission": {
            "appManage": false,
            "userManage": false,
            "roleManage": false
        },
        "enbleRemove": false
    }
]
let allrole = [{
    "id": 1,
    "roleName": "超级管理员",
    "permission": {
        "appManage": true,
        "userManage": true,
        "roleManage": true,
        "super": true,
        "admin": true
    },
    "enbleRemove": false,
    "enbleRole": true
}];
allrole = allrole.concat(roleData);
sessionStorage.setItem('allroleData', JSON.stringify(allrole));
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
            return branch[Math.round(Math.random() * (branch.length - 1))].name;
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
        }
    }]

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
    "permission": {
        "appManage": true,
        "userManage": true,
        "roleManage": true,
        "super": true,
        "admin": true
    }
}])
sessionStorage.setItem('userData', JSON.stringify(userData.list));