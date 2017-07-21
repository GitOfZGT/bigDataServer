
function SingleScorll(){
    "ngInject";
    return function(){
              angular.element(document).off("scroll").on("scroll",()=>{
             var el= document.querySelector('#configInfos'),$el=angular.element(el);
            
           if(document.body.scrollTop>80){
             if($el.hasClass('hasfixed')){return;}
              var el= document.querySelector('#configInfos'),
                  pos=el.getBoundingClientRect();
                  angular.element(el).addClass('hasfixed').css({position:"fixed",top:80,left:pos.left,right:'auto',
    transition: '0.3s ease-out'});
           }else{
              $el.removeClass('hasfixed').removeAttr('style');
           }
        })
    }
}
export default {name:'SingleScorll',fn:SingleScorll,method:'factory'};

