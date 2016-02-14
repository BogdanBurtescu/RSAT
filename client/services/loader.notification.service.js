var applicationContext = angular.module('myApp');
var serviceName = 'LoaderService';

applicationContext
    .factory(serviceName, LoaderService);


function LoaderService($http, $q) {
    // return available functions for use in controllers
    return ({
        initiateLoader: initiateLoader,
        destroyLoader: destroyLoader
    });



    function initiateLoader(displayedText)
    {
        swal({
            title: displayedText,
            text: "<i class='fa fa-cog fa-spin' style='font-size: 48px;'></i>",
            html: true
        });
    }

    function destroyLoader()
    {
        swal.close();
    }
}