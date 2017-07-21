
let component = require.context('./', true, /\.animate.js$/);

let module=angular.module('page-animate',[]);

component.keys().forEach((key) => {
    module.animation(component(key).default.name,component(key).default.fn);
});

export default module.name;