import temp from './template.view.html'
import './index.scss'

class zMorePanel{
    constructor(){
        this.templateUrl=temp;
        this.restrict='AE';
        this.replace=true;
        this.scope={
            openPanel:"="
        }
    }
    link(scope,el,attr){
        scope.close=()=>{

            el.find('.more-panel').addClass('move-left');
            setTimeout(()=>{
                el.addClass('hide');
            },300)
        }
        scope.openPanel=()=>{
            el.removeClass('hide');
            setTimeout(()=>{
                el.find('.more-panel').removeClass('move-left');
            })
        }
    }
    static factory(){
        return new zMorePanel();
    }
}

export default {
    name:'zMorePanel',
    fn:zMorePanel.factory
}