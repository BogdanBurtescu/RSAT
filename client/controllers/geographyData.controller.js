var applicationContext = angular.module('myApp');
var controllerName = "geographyDataController";

    applicationContext
        .controller(controllerName, geographyDataMainFunction);

        geographyDataMainFunction.$inject =
            [
                '$scope',
                '$timeout',
                '$location',
                'FileUploader',
                '$http',
                'SocketConnectionService',
                'GeographyService',
                '$q'
            ];

        function geographyDataMainFunction($scope, $timeout, $location, FileUploader, $http, SocketConnectionService, GeographyService, $q) {
            $scope.geographicalEntities = [];
            //socket listener active on every update of the number of users in the db
            SocketConnectionService.on('geographicEntityUpdate', function(data) {
                $scope.geographicalEntities.push(data);
            });

            SocketConnectionService.on('numberOfGeographicalEntitiesSignal', function(data) {
                $scope.numberOfGeographicEntities = data;
            });

            initUploader();

            $scope.pageSize = 10;
            $scope.maxSize = 10;


            function initUploader(){

                var uploader = $scope.uploader = new FileUploader({
                    url: '/fileUploadService'
                });
                uploader.filters.push({
                    name: 'customFilter',
                    fn: function(item /*{File|FileLikeObject}*/, options) {
                        return this.queue.length < 10;
                    }
                });

                // CALLBACKS

                uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
                    console.info('onWhenAddingFileFailed', item, filter, options);
                };
                uploader.onAfterAddingFile = function(fileItem) {
                    console.info('onAfterAddingFile', fileItem);
                };
                uploader.onAfterAddingAll = function(addedFileItems) {
                    console.info('onAfterAddingAll', addedFileItems);
                };
                uploader.onBeforeUploadItem = function(item) {
                    console.info('onBeforeUploadItem', item);
                };
                uploader.onProgressItem = function(fileItem, progress) {
                    console.info('onProgressItem', fileItem, progress);
                };
                uploader.onProgressAll = function(progress) {
                    console.info('onProgressAll', progress);
                };
                uploader.onSuccessItem = function(fileItem, response, status, headers) {
                    console.info('onSuccessItem', fileItem, response, status, headers);
                };
                uploader.onErrorItem = function(fileItem, response, status, headers) {
                    console.info('onErrorItem', fileItem, response, status, headers);
                };
                uploader.onCancelItem = function(fileItem, response, status, headers) {
                    console.info('onCancelItem', fileItem, response, status, headers);
                };
                uploader.onCompleteItem = function(fileItem, response, status, headers) {
                    console.info('onCompleteItem', fileItem, response, status, headers);
                };
                uploader.onCompleteAll = function() {
                    console.info('onCompleteAll');
                };

                $scope.sortType     = 'name'; // set the default sort type
                $scope.sortReverse  = false;  // set the default sort order
                $scope.searchGeographicalEntity   = '';     // set the default search/filter term
            }


            $scope.removeGeographicEntity = function(_id, entityName){
                swal({
                    title: "Are you sure you want to delete " + entityName + " ?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "Yes",
                    closeOnConfirm: false
                    },
                function(){
                    var index = -1;
                    var comArr = eval( $scope.geographicalEntities );
                    for( var i = 0; i < comArr.length; i++ ) {
                        if( comArr[i]._id === _id ) {
                            index = i;
                            break;
                        }
                    }
                    if( index === -1 ) {
                        console.log("ERROR");
                    }
                    $scope.geographicalEntities.splice( index, 1 );
                    GeographyService.deleteGeographicEntity(_id);
                    swal({
                        title: "Deleted!",
                        text: "You have successfully deleted " + entityName + " !",
                        type: "success",
                        timer: 1000,
                        showConfirmButton: false
                    });
                });
            };

            $scope.removeAllGeographicEntities = function() {

                swal({
                        title: "Are you sure you want to delete all geography entities?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Yes",
                        closeOnConfirm: false
                    },
                    function(){
                        $scope.geographicalEntities = [];
                        GeographyService.deleteAllGeographicEntities();
                        swal({
                            title: "You have successfully deleted all geography entities",
                            type: "success",
                            timer: 1000,
                            showConfirmButton: false
                        });
                    });


            };

            $scope.edit = function(entityName, id) {
                swal({
                    title: entityName,
                    text: "You have selected document with id:" + id,
                    type: "info",
                    showCancelButton: true,
                    confirmButtonColor: "#00ACD6",
                    confirmButtonText: "Save document",
                    closeOnConfirm: false
                },
                    function(){
                        swal("Saved succesfully!", "Document with id " + id + " has been saved successfully to the database!", "success"); });
            }
        }


applicationContext
    .directive('fileUploadComponent', function() {
        return {

            templateUrl: '../partials/views/components/uploadFiles.component.html'
        };
    })




