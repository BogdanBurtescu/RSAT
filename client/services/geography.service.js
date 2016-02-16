var applicationContext = angular.module('myApp');
var serviceName = 'GeographyService';

applicationContext
    .factory(serviceName, GeographyService);

GeographyService.$inject = ['ServerCommunication'];

function GeographyService(ServerCommunication) {
    // return available functions for use in controllers
    return ({
        getGeographicEntities: getGeographicEntities,
        getGeographicEntity: getGeographicEntity,
        deleteGeographicEntity: deleteGeographicEntity,
        getNumberOfGeographicEntities: getNumberOfGeographicEntities,
        deleteAllGeographicEntities: deleteAllGeographicEntities
    });

    function getGeographicEntities() {
        var _requestResult =  ServerCommunication.initGetRequest('/geography/geographicEntities');
        return _requestResult;
    }


    function getNumberOfGeographicEntities() {
        var _requestResult =  ServerCommunication.initGetRequest('/geography/numberOfGeographicEntities');
        return _requestResult;
    }

    function deleteGeographicEntity(geographicEntityId) {
        ServerCommunication.initPostRequest('/geography/deleteGeographicEntity', {
            geographicEntityId: geographicEntityId
        })
    }

    function deleteAllGeographicEntities(){
        ServerCommunication.initGetRequest('/geography/deleteAllGeographicEntities');
    }

    function getGeographicEntity(geographicEntityId)
    {
        ServerCommunication.initPostRequest('/geography/geographicEntity', {geographicEntityId: geographicEntityId})
    }
}
