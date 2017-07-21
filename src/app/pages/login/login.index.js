import router from './login.router';
import directive from './login.directive';
import {slideLeft,slideRight,easingMap} from './login.animation';


export default
  angular.module('main.login', [])
    .config(router)
    .factory('easingMap', easingMap)
    .directive(directive.name, directive.fn)
    .animation('.slide-left', slideLeft)
    .animation('.slide-right', slideRight)
    .name;