var applicationContext = angular.module('myApp');
var serviceName = 'ServerCommunication';

applicationContext
    .factory(serviceName, ServerCommunication);

ServerCommunication.$inject = ['$http', '$q'];

function ServerCommunication($http, $q) {
    // return available functions for use in controllers
    return ({
        initGetRequest: initGetRequest,
        initPostRequest: initPostRequest
    });

    function initGetRequest(url, params)
    {
        var promise = $http.get(url, params).then(function(response) {
            return response.data;
        });
        return promise;
    }

    function initPostRequest(url, params)
    {
        var deferred = $q.defer();

        $http.post(url, params)
            .success(function (data, status) {
                console.log(data);
                if (status === 200 && data.status) {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            });
        return deferred.promise;
    }


}
