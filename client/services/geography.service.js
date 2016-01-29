var applicationContext = angular.module('myApp');
var serviceName = 'GeographyService';

applicationContext
    .factory(serviceName, GeographyService);

GeographyService.$inject = ['ServerCommunication'];

function GeographyService(ServerCommunication) {
    // return available functions for use in controllers
    return ({
        getGeographicEntity: getGeographicEntity,
        deleteGeographicEntity: deleteGeographicEntity,
        getNumberOfGeographicEntities: getNumberOfGeographicEntities
    });

    function getGeographicEntity() {
        var _requestResult =  ServerCommunication.initGetRequest('/geography/geographicEntity');
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
}
