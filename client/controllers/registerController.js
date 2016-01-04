angular.module('myApp').controller('registerController',
    ['$scope', '$location', 'AuthService',
        function ($scope, $location, AuthService) {


            $scope.register = function () {
                // initial values
                $scope.error = false;
                $scope.disabled = true;
                var todayDate = new Date();
                console.log(todayDate.getFullYear());
                $scope.dateOfCreation = new Date();

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
                            swal({
                                title: "Registration successful!",
                                text: "You have registered successfully!",
                                timer: 1500,
                                type: "success",
                                showConfirmButton: false });
                            $location.path('/login');
                            $scope.disabled = false;
                            $scope.registerForm = {};
                        })
                        // handle error
                        .catch(function () {
                            swal({
                                title: "Error!",
                                text: "An error has occurred!",
                                timer: 1500,
                                type: "error",
                                showConfirmButton: false });
                            $scope.error = true;
                            $scope.errorMessage = "Something went wrong!";
                            $scope.disabled = false;
                        });
                }else{
                    swal({
                        title: "Password mismatch!",
                        text: "The passwords you have provided do not match! Please review the form and submit it again.",
                        timer: 1500,
                        type: "error",
                        showConfirmButton: false });
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