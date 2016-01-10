angular.module('myApp').factory('NavigationService',
    ['$q', '$timeout', '$http', '$location',
        function ($q, $timeout, $http, $location) {

            return ({
                goToPath: goToPath
            });

            function goToPath(url){
                $location.path(url);
            }


        }]);