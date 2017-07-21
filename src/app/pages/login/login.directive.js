
export default {
    name:'loginBg',
    fn:function($document){
        "ngInject";
    return{
        restrict:'A',
        link:function(scope,el,ar){
            var w=document.documentElement.clientWidth,h=document.documentElement.clientHeight;
            el.css({width:w,height:h});
        }
    }
}
};