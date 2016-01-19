var applicationContext = angular.module('myApp');

applicationContext.factory('UserRetrievalService', UserRetrievalService);

UserRetrievalService.$inject = ['$http'];

function UserRetrievalService($http) {
    var receivedUser = null;

    // return available functions for use in controllers
    return ({
        findRegisteredUser: findRegisteredUser,
        retUser: retUser
    });

    function findRegisteredUser(username) {
        var promise = $http.get('/user/findUser', username).then(function(response) {
            return response.data;
        });
        return promise;
    }

    function retUser() {
        return receivedUser;
    }



}