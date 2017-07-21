//
function showEl(element, doneFn,easingMap) {
          var $el = jQuery(element);
          var pos = element[0].getBoundingClientRect();
          $el.velocity("stop");
          $el.css({ position: 'relative', top:'-20px', left: 0, height:0,overflow:'hidden' }).velocity({ top: 0, height: pos.height }, 300, easingMap.easeOut, () => {
            $el.removeAttr('style');
            doneFn();
          });

          // remember to call doneFn so that AngularJS
          // knows that the animation has concluded
        }
    function hideEl(element, doneFn,easingMap) {
          var $el = jQuery(element);
          var pos = element[0].getBoundingClientRect();
          $el.velocity("stop");
          $el.css({overflow:'hidden',position:'relative',height:pos.height}).velocity({ height:0,paddingTop:0,paddingBottom:0 }, 300, easingMap.easeOut, () => {
            $el.removeAttr('style');
            doneFn();
          });
        }
function expandDown(easingMap){
      "ngInject";
      return {
        // make note that other events (like addClass/removeClass)
        // have different function input parameters
        enter: function (element, doneFn) {
            showEl(element, doneFn,easingMap);
        },
        move: function (element, doneFn) {

        },
        leave: function (element, doneFn) {
            hideEl(element, doneFn,easingMap);
        },
        addClass:function (element,classname, doneFn) {
            hideEl(element, doneFn,easingMap);
        },
        removeClass:function (element,classname, doneFn) {
            showEl(element, doneFn,easingMap);
        }
      }
    }
export default {name:'.expandDown',fn:expandDown}