class zInterleaveClass{
    constructor(){
        this.restrict='A';
        this.require='^^zInterleave'
    }
    link(scope,el,attr,pctrl){
       if(!pctrl.Hcount){
           pctrl.getHcount(el[0].clientWidth);
       }
       if(scope.$index==0){
           pctrl.count=1;
       }
       if((scope.$index+1)*pctrl.count==pctrl.Hcount+1){
           el.addClass(attr.zInterleaveClass);
            pctrl.count++;
       }
    }
    static factory(){
        return new zInterleaveClass();
    }
}
export default {
    name:'zInterleaveClass',
    fn:zInterleaveClass.factory
}