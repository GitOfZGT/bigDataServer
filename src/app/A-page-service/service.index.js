import './zApi/data.mock.js'
import Mock from 'mockjs';

// let population = Mock.mock({
//         "list|10000": [{
//             "id|+1": 1,
//             //居民身份证号
//             "id_number": function() {
//                 return Mock.Random.natural(10000000000000000, 99999999999999999) + this.id.toString();
//             },
//             "name": function() {
//                 return Mock.Random.cname();
//             },
//             //性别
//             "gender": function() {
//                 var sex = ['男', '女'];
//                 return sex[Math.round(Math.random())];
//             },
//             //出生地
//             "birth_place": function() {
//                 var region = '北京';
//                 while (region.indexOf('广东省') < 0) {
//                     region = Mock.Random.county(true);
//                 }
//                 return region;
//             },
//             //出生日期
//             "birth_date": function() {
//                 var date = '1965-09-24',
//                     y = '1939';
//                 while (y < 1940 || y > 2005) {
//                     date = Mock.Random.date('yyyy-MM-dd');
//                     y = date.split('-')[0];
//                 }
//                 return date;
//             }
//         }]
//     })
//     // console.log(JSON.stringify(population.list))
// let edu = Mock.mock({
//         "list|10000": [{
//             "id|+1": 1,
//             //居民身份证号
//             "id_number": function() {
//                 return population.list[this.id - 1].id_number;
//             },
//             //最高学历
//             "zgxl": function() {
//                 var ed = ['小学', "初中", "高中", "大专", "本科", "研究生", "博士", "硕士", "其他"];
//                 return ed[Math.round(Math.random() * (ed.length - 1))];
//             }
//         }]
//     })
//     // console.log(JSON.stringify(edu.list))
// let jy = Mock.mock({
//     "list|10000": [{
//         "id|+1": 1,
//         //居民身份证号
//         "id_number": function() {
//             return population.list[this.id - 1].id_number;
//         },
//         //就业单位
//         "gzdw": function() {
//             var ed = [Mock.Random.csentence(8), "无"];
//             return ed[Math.round(Math.random())];
//         }
//     }]
// })
// let qy = Mock.mock({
//     "list|1000": [{
//         "id|+1": 1,
//         //企业住所/经营地址
//         "qyzs": function() {
//             var region = '北京';
//             while (region.indexOf('广东省') < 0) {
//                 region = Mock.Random.county(true);
//             }
//             return region;
//         },
//         //行业类型
//         "hylx": function() {
//             var ed = ["国有及国有控股企业", "外商及港澳台商投资企业", "民营企业"];
//             return ed[Math.round(Math.random() * (ed.length - 1))];
//         },
//         // 核准日期
//         "hzrq": function() {
//             var date = '1965-09-24',
//                 y = '1939';
//             while (y < 1990 || y > 2017) {
//                 date = Mock.Random.date('yyyy-MM-dd');
//                 y = date.split('-')[0];
//             }
//             return date;
//         }
//     }]
// })

// let regions = [{ "name": "广东省", "code": "440000"},
//     { "name": "广州市", "code": "440100" },
//     { "name": "韶关市", "code": "440200" },
//     { "name": "深圳市", "code": "440300" },
//     { "name": "珠海市", "code": "440400" },
//     { "name": "汕头市", "code": "440500" },
//     { "name": "佛山市", "code": "440600" },
//     { "name": "江门市", "code": "440700" },
//     { "name": "湛江市", "code": "440800" },
//     { "name": "茂名市", "code": "440900" },
//     { "name": "肇庆市", "code": "441200" },
//     { "name": "惠州市", "code": "441300" },
//     { "name": "梅州市", "code": "441400" },
//     { "name": "汕尾市", "code": "441500" },
//     { "name": "河源市", "code": "441600" },
//     { "name": "阳江市", "code": "441700" },
//     { "name": "清远市", "code": "441800" },
//     { "name": "东莞市", "code": "441900" },
//     { "name": "中山市", "code": "442000" },
//     { "name": "潮州市", "code": "445100" },
//     { "name": "揭阳市", "code": "445200" },
//     { "name": "云浮市", "code": "445300" }
// ]
// let years = ["2016", "2015", "2014", "2013", "2012"];
// let gdp = [];
// let gpdid=1;
// regions.forEach((el)=>{
//     years.forEach((item)=>{
//         gdp.push({
//             id:gpdid,
//             GDP:Mock.Random.float(10000, 99999,2,2),
//             region:el.name,
//             regionCode:el.code,
//             year:item,
//             increase:Mock.Random.float(5, 20,1,2)
//         })
//         gpdid++;
//     })
// })

// console.log(JSON.stringify(gdp));
// let fr= Mock.mock({
//     "list|500": [{
//         "id|+1": 1,
//         //法定代表人/负责人公民身份证号码
//         "fddbrsfzhm": function() {
//             return population.list[this.id-1].id_number;
//         },
//         //法定代表人/负责人
//         "fddbr": function() {
//             var ed=[Mock.Random.csentence(8),"无"];
//             return ed[Math.round(Math.random())];
//         },
//         //注册地址
//         "zcdz":function(){

//         },
//         //注册日期
//         "zcrq":function(){

//         }
//     }]
// })
// console.log(JSON.stringify(jy.list))
let component = require.context('./', true, /\.service.js$/);

let module = angular.module('page-service', []);

component.keys().forEach((key) => {
    let def = component(key).default;
    module[def.method](def.name, def.fn);
});

export default module.name;