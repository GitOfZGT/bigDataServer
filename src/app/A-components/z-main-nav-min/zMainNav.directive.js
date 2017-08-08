import temp from './template.view.html'
import './index.scss'

class zMainNavMin {
    constructor() {
        this.templateUrl = temp;
        this.restrict = 'AE';
        this.replace = true;
        this.scope = {
            navData: '='
        }
    }
    controller($scope, $location) {
        'ngInject'
        $scope._location = $location;
    }
    link(scope, el, attr) {
        scope.$watch(() => scope._location.path(), (newv) => {
            setTimeout(() => {
                el.find('.active').removeClass('active');
                angular.element(el).find("a[href='#"+newv.split('?')[0]+"']").addClass('active');
            })
        })
    }
    static factory() {
        return new zMainNavMin();
    }
}

export default {
    name: 'zMainNavMin',
    fn: zMainNavMin.factory
}