var applicationContext = angular.module('myApp');


applicationContext
    .factory('CountryRetrievalService', CountryRetrievalService);

CountryRetrievalService.$inject = ['$http', '$q'];

function CountryRetrievalService($http, $q) {
    // return available functions for use in controllers
    return ({
        getCountries: getCountries,
        deleteCountry: deleteCountry
    });

    function getCountries() {
        var promise = $http.get('/user/countries').then(function (response) {
            return response.data;
        });
        return promise;
    }

    function deleteCountry(geographicEntityId) {
        var deferred = $q.defer();

        console.log("Sending " + geographicEntityId);
        $http.post('/user/deleteCountry', {
                geographicEntityId: geographicEntityId
            })
            .success(function (data, status) {
                console.log(data);
                if (status === 200 && data.status) {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            })

    }
}
