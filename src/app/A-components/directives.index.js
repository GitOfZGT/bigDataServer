let component = require.context('./', true, /\.directive.js$/);

let module=angular.module('A-directives',[]);

component.keys().forEach((key) => {
    let def=component(key).default;
    module.directive(def.name,def.fn);
});

export default module.name;