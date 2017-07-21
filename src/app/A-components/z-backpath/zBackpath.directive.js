class zBackpath{
    constructor(){
        
        this.restrict='A';
        this.replace=false;
    }
    controller($scope,$location){
        'ngInject'
        $scope._location=$location;
    }
    link(scope,el,attr){
        el.on('mousedown',()=>{
            sessionStorage.setItem('fromMainPath','#'+scope._location.path());
        })
    }
    static factory(){
        return new zBackpath();
    }
}

export default {
    name:"zBackpath",
    fn:zBackpath.factory
}