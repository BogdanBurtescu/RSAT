var applicationContext = angular.module('myApp');


applicationContext
    .controller('loginController', loginControllerMainFunction)

loginControllerMainFunction.$inject = [
    '$scope',
    '$location',
    'AuthService'
];

function loginControllerMainFunction($scope, $location, AuthService) {

    $scope.login = function() {

        // initial values
        $scope.error = false;
        $scope.disabled = true;

        // call login from service
        AuthService.login($scope.loginForm.username, $scope.loginForm.password)
            // handle success
            .then(function() {
                //toastr.success("You have logged in as " + $scope.loginForm.username);
                swal({
                    title: "Login successful!",
                    text: "You have logged in successful!",
                    timer: 2000,
                    type: "success",
                    showConfirmButton: false
                });
                $location.path('/dashboard');
                $scope.disabled = false;
                $scope.loginForm = {};
            })
            // handle error
            .catch(function() {
                $scope.error = true;
                $scope.errorMessage = "Invalid username and/or password";
                $scope.disabled = false;
                $scope.loginForm = {};
            });
    };

    $scope.goToRegistration = function() {
        $location.path('/register');
    }

}