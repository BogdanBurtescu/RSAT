angular.module('myApp').controller('userInformationController',
    ['$scope', '$location', 'AuthService', 'UserRetrievalService',
        function ($scope, $location, AuthService, UserRetrievalService) {

            $scope.mainAppName = "RSAT";
            $scope.authUser = AuthService.getAuthorizedUser();

            $scope.showEntireUser = function (){
                console.log($scope.authUser);
            };


        }]);