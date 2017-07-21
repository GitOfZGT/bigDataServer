
let component = require.context('./', true, /\.filter.js$/);

let module=angular.module('page-filter',[]);

component.keys().forEach((key) => {
    module.filter(component(key).default.name,component(key).default.fn);
});

export default module.name;