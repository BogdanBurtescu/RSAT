angular.module('myApp').controller('registerController',
    ['$scope', '$location', 'AuthService',
        function ($scope, $location, AuthService) {


            $scope.register = function () {
                // initial values
                $scope.error = false;
                $scope.disabled = true;
                var todayDate = new Date();
                console.log(todayDate.getFullYear());
                $scope.dateOfCreation = new Date(Date.UTC(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDay()));

                // call register from service
                if(checkPasswordMatch() === true){
                    AuthService.register($scope.registerForm.username,
                        $scope.registerForm.password,
                        $scope.registerForm.firstName,
                        $scope.registerForm.lastName,
                        $scope.dateOfCreation
                        )
                        // handle success
                        .then(function () {
                            toastr.success("You have succesfully registered!");
                            $location.path('/login');
                            $scope.disabled = false;
                            $scope.registerForm = {};
                        })
                        // handle error
                        .catch(function () {
                            toastr.error("Something went wrong!");
                            $scope.error = true;
                            $scope.errorMessage = "Something went wrong!";
                            $scope.disabled = false;
                        });
                }else{
                    toastr.error("Passwords must match!");
                    $scope.disabled = false;

                }


            };

            function checkPasswordMatch(){
                var result;
                if($scope.registerForm.password === $scope.registerForm.passwordConfirmation)
                {
                    result = true;
                }else{
                    result = false;
                }
                return result;
            }

        }]);