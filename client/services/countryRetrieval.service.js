var applicationContext = angular.module('myApp');


applicationContext
    .factory('CountryRetrievalService', CountryRetrievalService);

CountryRetrievalService.$inject = ['$http'];

function CountryRetrievalService($http) {
    // return available functions for use in controllers
    return ({
        getCountries: getCountries
    });

    function getCountries() {
        var promise = $http.get('/user/countries').then(function(response) {
            return response.data;
        });
        return promise;
    }

}