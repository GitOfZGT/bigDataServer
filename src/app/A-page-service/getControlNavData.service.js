
function getControlNavData($stateParams){
    "ngInject";
    
    function setValues(){
        var sideNavData,titleInfo;
        if($stateParams.witchpage==1){
        titleInfo={title:'云主机控制台',icon:"fa-cubes"};

        sideNavData=[{
           name:"总览",
           router:"control-head.control-frame.control-hostall",
           icon:"fa-globe"
       },{
           name:"弹性云主机",
           router:"control-head.control-frame.control-cloudhost",
           icon:"fa-hdd-o"
       },{
           name:"云硬盘",
           router:"control-head.control-frame.control-clouddisk",
           icon:"fa-floppy-o"
       },{
           name:"磁盘类型",
           router:"control-head.control-frame.control-clouddiskType",
           icon:"fa-inbox"
       },{
           name:"云硬盘备份",
           router:"control-head.control-frame.control-diskbackup",
           icon:"fa fa-print"
       },{
           name:"镜像",
           router:"control-head.control-frame.control-cloudclone",
           icon:"fa-clone"
       },
       {
           name:"镜像类型",
           router:"control-head.control-frame.control-clonetype",
           icon:"fa-laptop"
       },{
           name:"弹性伸缩",
           router:"control-head.control-frame.control-flexible",
            icon:"fa-object-ungroup"
       },{
           name:"弹性负载均衡",
           router:"control-head.control-frame.control-balancing",
           icon:"fa-object-group"
       },{
           name:"密钥对",
           router:"control-head.control-frame.control-keys",
           icon:"fa-key"
       }]
    }else if($stateParams.witchpage==2){
        titleInfo={title:'网络控制台',icon:"fa-diamond"}
        sideNavData=[{
           name:"总览",
           router:"control-head.control-frame.control-hostall",
            icon:"fa-globe"
       },{
           name:"虚拟私有云",
           router:"control-head.control-frame.control-privatecloud",
           icon:"fa-cloud-upload"
       },{
           name:"安全组",
           router:"control-head.control-frame.control-security",
           icon:"fa-life-ring"
       },{
           name:"弹性IP",
           router:"control-head.control-frame.control-ip",
           icon:"fa-paper-plane-o"
       },{
           name:"VPN",
           router:"control-head.control-frame.control-vpn",
           icon:"fa-vimeo"
       }]
    }
    return {sideNavData,titleInfo};
    }
    
    return setValues;
}
export default {name:'getControlNavData',fn:getControlNavData,method:'factory'};

