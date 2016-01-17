angular.module('myApp').factory('NoOfGeographicFeaturesService',
    ['$q', '$timeout', '$http',
        function ($q, $timeout, $http) {
            var receivedUser = null;

            // return available functions for use in controllers
            return ({
                getNumberOfGeographicFeatures: getNumberOfGeographicFeatures
            });

            function getNumberOfGeographicFeatures () {
                var promise = $http.get('/user/numberOfGeographicFeatures').then(function(response){
                    console.log(response);
                    return response.data;
                });
                return promise;
            }

        }]);
