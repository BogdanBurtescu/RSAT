var applicationContext = angular.module('myApp');

applicationContext
    .factory('NavigationService', NavigationService);

NavigationService.$inject = [
    '$q',
    '$timeout',
    '$http',
    '$location'
];

function NavigationService($location) {

    return ({
        goToPath: goToPath
    });

    function goToPath(url) {
        $location.path(url);
    }
}