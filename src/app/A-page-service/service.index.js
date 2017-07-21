import './zApi/data.mock.js'
let component = require.context('./', true, /\.service.js$/);

let module=angular.module('page-service',[]);

component.keys().forEach((key) => {
    let def=component(key).default;
    module[def.method](def.name,def.fn);
});

export default module.name;