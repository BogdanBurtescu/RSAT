var applicationContext = angular.module('myApp');

applicationContext
    .factory('NoOfGeographicFeaturesService', NoOfgeographicFeaturesService);

NoOfgeographicFeaturesService.$inject = ['$http'];

function NoOfgeographicFeaturesService($http) {
    var receivedUser = null;

    // return available functions for use in controllers
    return ({
        getNumberOfGeographicFeatures: getNumberOfGeographicFeatures
    });

    function getNumberOfGeographicFeatures() {
        var promise = $http.get('/user/numberOfGeographicFeatures').then(function(response) {
            console.log(response);
            return response.data;
        });
        return promise;
    }
}