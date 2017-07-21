function httpServer($http, $state, $rootScope, $timeout, $location, $q) {
    "ngInject";

    return function(method, link, params) {
        // $rootScope.showLoading=true;
        // link = $location.protocol() + '://' + $location.host() + ':' + $location.port() + "/api"+link;
        // link = 'http://42.123.127.38:9981'+link;
        var deferred = $q.defer();
        var opt = {
            url: link,
            method
        };
        if (method == 'get') {
            opt.params = params;
        }
        if (method == 'post') {
            opt.data = params;
        }
        $http(opt).then((re) => {
            if (re.data.errstatus == 0) {
                deferred.resolve(re.data);
            } else {
                deferred.reject(re.data);
            }
            deferred.notify(re.data);
        }, (re) => {
            deferred.reject(re.data);
            deferred.notify(re.data);
        });
        return deferred.promise;
    }

}
export default { name: 'httpServer', fn: httpServer, method: 'factory' };