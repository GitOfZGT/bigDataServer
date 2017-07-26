import temp from './template.view.html';

class userMenus {
    constructor() {
        this.restrict="AE";
         this.replace=true;
         this.scope={};
         this.templateUrl=temp;
    }
    link(scope, el, attr) {
        scope.exit='login({entry:"'+sessionStorage.getItem('entry')+'"})';
        scope.urls = attr.templateUrl;
        scope.src = scope.$root.headPortrait.imgs;
        let user= JSON.parse(sessionStorage.getItem('thisUser'));
        scope.username =user.userName;
        scope.power=user.roleName;
        scope.isClick = false;
        scope.isopen = false;
        el.find('>div').on({
            'click': function(event) {
                scope.isopen = scope.isopen ? false : true;
                scope.$apply('');
                event.stopPropagation();
            },
            'mouseup': function(event) {
                event.stopPropagation();
            }
        });
        angular.element(document).on('mouseup', function(event) {
            scope.isopen = false;
            scope.$apply('');
        })
    }
 static factory() {
        return new userMenus();
    }
}

export default {
    name: 'userMenus',
    fn: userMenus.factory
}