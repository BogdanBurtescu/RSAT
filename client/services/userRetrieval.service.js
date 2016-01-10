angular.module('myApp').factory('UserRetrievalService',
    ['$q', '$timeout', '$http',
        function ($q, $timeout, $http) {
            var receivedUser = null;

            // return available functions for use in controllers
            return ({
                findRegisteredUser: findRegisteredUser,
                retUser: retUser
            });



            //function findRegisteredUser(username){
            //    var deferred = $q.defer();
            // $http.get('/user/findUser', username)
            //        // handle success
            //        .success(function (data, status) {
            //            if(status === 200 && data.status){
            //                angular.copy(data, receivedUser);
            //                deferred.resolve();
            //            } else {
            //                deferred.reject();
            //            }
            //        })
            //        // handle error
            //        .error(function (data) {
            //            deferred.reject();
            //        })
            //
            //
            //}

            function findRegisteredUser (username) {
                var promise = $http.get('/user/findUser', username).then(function(response){
                    return response.data;
                });
                return promise;
            }



            function retUser(){
                return receivedUser;
            }



        }]);