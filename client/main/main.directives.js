var applicationContext = angular.module('myApp');

applicationContext
    .directive('adaptationDataView', function() {
        return {

            templateUrl: '../partials/views/adaptationData.view.html'
        };
    })

    .directive('geographyDataView', function() {
        return {

            templateUrl: '../partials/views/geographyData.view.html'
        };
    })

    .directive('weatherDataView', function() {
        return {

            templateUrl: '../partials/views/weatherData.view.html'
        };
    })

    .directive('userInformationView', function() {
        return {

            templateUrl: '../partials/views/userInformation.view.html'
        };
    })

    .directive('airspaceView', function() {
        return {

            templateUrl: '../partials/views/airspace.view.html'
        };
    })

    .directive('flightDataView', function() {
        return {

            templateUrl: '../partials/views/flightData.view.html'
        };
    })

    .directive('simulationView', function() {
        return {

            templateUrl: '../partials/views/simulation.view.html'
        };
    })

    .directive('mainView', function() {
        return {

            templateUrl: '../partials/views/dashboard.view.html'
        };
    })

    .directive('mainMenuComponent', function() {
        return {

            templateUrl: '../partials/views/components/mainMenu.component.html',
            controller: 'mainMenuController'
        };
    })

    .directive('dashboardComponent', function() {
        return {
            templateUrl: '../partials/views/components/dashboard.component.html',
            controller: 'dashboardPanelController'

        };
    })

    .directive('fileUploadComponent', function() {
        return {

            templateUrl: '../partials/views/components/uploadFiles.component.html'
        };
    })