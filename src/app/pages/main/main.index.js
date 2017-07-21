import router from './main.router';

export default
    angular.module('main.index', [])
        .config(router)
        .name;