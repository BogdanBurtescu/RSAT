var applicationContext = angular.module('myApp');

applicationContext
    .factory('AuthService', AuthenticationService);


AuthenticationService.$inject = [
    '$q',
    '$timeout',
    '$http'
];


function AuthenticationService($q, $timeout, $http) {

    // create user variable
    var user = null;
    var userToLogin = {
        username: null,
        password: null,
        firstName: null,
        lastName: null
    };



    // return available functions for use in controllers
    return ({
        isLoggedIn: isLoggedIn,
        getUserStatus: getUserStatus,
        login: login,
        logout: logout,
        register: register,
        getAuthorizedUser: getAuthorizedUser
    });

    function isLoggedIn() {
        if (user) {
            return true;
        } else {
            return false;
        }
    }

    function getUserStatus() {
        return user;
    }

    function login(username, password) {

        // create a new instance of deferred
        var deferred = $q.defer();
        userToLogin.username = username;
        userToLogin.password = password;

        // send a post request to the server
        $http.post('/user/login', {
                username: username,
                password: password
            })
            // handle success
            .success(function(data, status) {
                if (status === 200 && data.status) {
                    user = true;
                    deferred.resolve();
                } else {
                    user = false;
                    deferred.reject();
                }
            })
            // handle error
            .error(function(data) {
                user = false;
                deferred.reject();
            });

        // return promise object
        return deferred.promise;

    }

    function logout() {

        // create a new instance of deferred
        var deferred = $q.defer();

        // send a get request to the server
        $http.get('/user/logout')
            // handle success
            .success(function(data) {
                user = false;
                deferred.resolve();
            })
            // handle error
            .error(function(data) {
                user = false;
                deferred.reject();
            });

        // return promise object
        return deferred.promise;

    }

    function register(username, password, firstName, lastName, dateOfCreation) {

        // create a new instance of deferred
        var deferred = $q.defer();


        // send a post request to the server
        $http.post('/user/register', {
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName,
                dateOfCreation: dateOfCreation
            })
            // handle success
            .success(function(data, status) {
                console.log(data);
                if (status === 200 && data.status) {
                    deferred.resolve();
                } else {
                    deferred.reject();
                }
            })
            // handle error
            .error(function(data) {
                deferred.reject();
            });

        // return promise object
        return deferred.promise;

    }

    function getAuthorizedUser() {
        return userToLogin;
    }

}