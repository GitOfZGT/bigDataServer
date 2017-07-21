class ApiUser{
    constructor(httpServer,zNotification){
        'ngInject'
        this.http=httpServer;
        this._zNotification=zNotification;
    }
    getUserList(opt){
        if(!opt){
            opt={};
        }
       return this.http('get','/api/users/',{
            page:opt.page||1,
            page_size:opt.page_size||6
        }).catch((re)=>{
            // this._zNotification.error('获取用户列表失败。')
        })
    }
    deleteUser(id){
        return this.http('post','/api/users/delete/',{
            ct_user_id:id.toString()
        }).catch((re)=>{
            // this._zNotification.error('删除用户失败。')
        })
    }
    createUser(opt){
        return this.http('post','/api/account/create_or_update_user/',opt)
        .catch((re)=>{
            // this._zNotification.error('创建用户失败。')
        });
    }
    getUserDetail(id){
        return this.http('get','/api/users/detail/',{ct_user_id:id}).catch((re)=>{
            // this._zNotification.error('获取用户信息失败。')
        });
    }
}
export default {
    name:"ApiUser",
    fn:ApiUser,
    method:'service'
}