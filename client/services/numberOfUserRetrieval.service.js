angular.module('myApp').factory('NoOfUsersRetrievalService',
    ['$q', '$timeout', '$http',
        function ($q, $timeout, $http) {
            var receivedUser = null;

            // return available functions for use in controllers
            return ({
                getNumberOfUsers: getNumberOfUsers

            });


            function getNumberOfUsers () {
                var promise = $http.get('/user/numberOfUsers').then(function(response){
                    return response.data;
                });
                return promise;
            }

        }]);
