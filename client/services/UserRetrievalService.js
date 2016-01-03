angular.module('myApp').factory('UserRetrievalService',
    ['$q', '$timeout', '$http',
        function ($q, $timeout, $http) {

            // create user variable
            var user = null;
            var userToLogin = {
                username: null,
                password: null};



            // return available functions for use in controllers
            return ({
                findRegisteredUser: findRegisteredUser
            });


            function findRegisteredUser(username){
                var deferred = $q.defer();
                console.log("Am trimis username: " + username);

                $http.get('/user/findUser', {username: username})
                    // handle success
                    .success(function (data, status) {
                        console.log(data);
                        if(status === 200 && data.status){
                            deferred.resolve();
                        } else {
                            deferred.reject();
                        }
                    })
                    // handle error
                    .error(function (data) {
                        deferred.reject();
                    });
            }
        }]);