var applicationContext = angular.module('myApp');
var serviceName = 'UserService';

applicationContext.factory(serviceName, UserService);

UserService.$inject = ['ServerCommunication'];

function UserService(ServerCommunication) {
    var receivedUser = null;

    return ({
        findRegisteredUser: findRegisteredUser,
        retUser: retUser,
        getNumberOfUsers: getNumberOfUsers
    });

    function findRegisteredUser(username) {
        var _result = ServerCommunication.initGetRequest('/user/findUser', username);
        return _result;
    }

    function getNumberOfUsers() {
        var _result =  ServerCommunication.initGetRequest('/user/numberOfUsers');
        return _result;
    }
    function retUser() {
        return receivedUser;
    }



}