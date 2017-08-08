class approveCenter {
    constructor(zNotification) {
        'ngInject'
        this._zNotification = zNotification;
    }
    setList(apply) {
        let list = this.getApproves();
        let id = 0;
        if (list.length > 0) {
            list.forEach((element) => {
                if (element.id > id) {
                    id = element.id;
                }
            });
        }
        list.push(angular.extend({ id:id+1,status:1 }, apply));
        this.setApproves(list);
    }
    setApproves(list){
        localStorage.setItem('approves',JSON.stringify(list));
    }
    getApproves() {
        return JSON.parse(localStorage.getItem('approves'));
    }
}

export default {
    name: 'approveCenter',
    fn: approveCenter,
    method: 'service'
}