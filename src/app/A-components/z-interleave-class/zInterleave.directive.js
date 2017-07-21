class zInterleave {
    constructor() {
        this.restrict = 'A';
    }
    controller($scope) {
        'ngInject'
        this.count = 1;
        $scope.getWidth=(w)=>{
            this.width=w;
        }
        this.getHcount=(w)=>{
            this.Hcount=Math.round(this.width/w);
        }
    }
    link(scope,el,attr){
        scope.getWidth(el.width());
    }
    static factory() {
        return new zInterleave();
    }
}
export default {
    name: 'zInterleave',
    fn: zInterleave.factory
}