angular.module('myApp').factory('CountryRetrievalService',
    ['$q', '$timeout', '$http',
        function ($q, $timeout, $http) {
            // return available functions for use in controllers
            return ({
                getCountries: getCountries
            });

            function getCountries () {
                var promise = $http.get('/user/countries').then(function(response){
                    return response.data;
                });
                return promise;
            }

        }]);
