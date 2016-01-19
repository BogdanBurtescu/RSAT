var applicationContext = angular.module('myApp');


applicationContext
    .controller('userInformationController', userInformationMainFunction);

userInformationMainFunction.$inject = [
    '$scope',
    '$location',
    'AuthService',
    'UserRetrievalService'
];

function userInformationMainFunction($scope, AuthService) {

    $scope.mainAppName = "RSAT";
    $scope.authUser = AuthService.getAuthorizedUser();

    $scope.showEntireUser = function() {
        console.log($scope.authUser);
    };


}