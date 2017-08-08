import temp from './template.view.html'
import CanvasAnimate from './CanvasAnimate';
class zLoginCanvas {
    constructor() {
        this.templateUrl = temp;
        this.restrict = 'AE';
        this.replace = true;
    }
    link(scope, el, attr) {
        var dw=document.documentElement.clientWidth,
            dh=document.documentElement.clientHeight;
        el[0].width=dw;
        el[0].height=dh;
         var CA = new CanvasAnimate(el[0],{length:120,clicked:true,moveon:true});
             CA.Run();
    }
    static factory() {
        return new zLoginCanvas();
    }
}

export default {
    name: 'zLoginCanvas',
    fn: zLoginCanvas.factory
}