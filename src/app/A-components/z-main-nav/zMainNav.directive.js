import temp from './template.view.html'
import './index.scss'

class zMainNav {
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
                angular.element(el).find("a[href='#"+newv+"']").addClass('active');
            })
        })
    }
    static factory() {
        return new zMainNav();
    }
}

export default {
    name: 'zMainNav',
    fn: zMainNav.factory
}