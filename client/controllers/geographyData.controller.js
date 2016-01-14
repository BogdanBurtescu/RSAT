angular.module('myApp').controller('geographyDataController',
    ['$scope', '$timeout', '$location', 'FileUploader', '$http',
        function ($scope, $timeout, $location, FileUploader, $http) {
            var uploader = $scope.uploader = new FileUploader({
                url: '/fileUploadService'
            });
            //
            //$scope.getShpData = function() {
            //    //var promise = $http.get('/cacamaca').then(function(response){
            //    //    console.log(response.data);
            //    //    return response.data;
            //    //});
            //    //return promise;
            //}

            // FILTERS

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

            console.info('uploader', uploader);



            $scope.sortType     = 'name'; // set the default sort type
            $scope.sortReverse  = false;  // set the default sort order
            $scope.searchGeographicalEntity   = '';     // set the default search/filter term

            // create the list of sushi rolls
            $scope.geographicalEntities = [
                { item1: 'Cali Roll', item2: 'Crgrab', item3: 2, item4: 2 },
                { item1: 'adasdadf', item2: 'gfdg', item3: 5, item4: 2  },
                { item1: 'Cali dfsfgs', item2: 't45y4', item3: 99, item4: 2  },
                { item1: 'Cafgdgl', item2: 'fgdg4', item3: 45, item4: 2  },
                { item1: 'Catyjhl', item2: 'rg34g', item3: 546 , item4: 2 },
                { item1: 'Cali Roll', item2: 'Crgrab', item3: 2, item4: 2 },
                { item1: 'adasdadf', item2: 'gfdg', item3: 5, item4: 2  },
                { item1: 'Cali dfsfgs', item2: 't45y4', item3: 99, item4: 2  },
                { item1: 'Cafgdgl', item2: 'fgdg4', item3: 45, item4: 2  },
                { item1: 'Catyjhl', item2: 'rg34g', item3: 546 , item4: 2 },
                { item1: 'Cali Roll', item2: 'Crgrab', item3: 2, item4: 2 },
                { item1: 'adasdadf', item2: 'gfdg', item3: 5, item4: 2  },
                { item1: 'Cali dfsfgs', item2: 't45y4', item3: 99, item4: 2  },
                { item1: 'Cafgdgl', item2: 'fgdg4', item3: 45, item4: 2  },
                { item1: 'Catyjhl', item2: 'rg34g', item3: 546 , item4: 2 },
                { item1: 'Cali Roll', item2: 'Crgrab', item3: 2, item4: 2 },
                { item1: 'adasdadf', item2: 'gfdg', item3: 5, item4: 2  },
                { item1: 'Cali dfsfgs', item2: 't45y4', item3: 99, item4: 2  },
                { item1: 'Cafgdgl', item2: 'fgdg4', item3: 45, item4: 2  },
                { item1: 'Catyjhl', item2: 'rg34g', item3: 546 , item4: 2 },
                { item1: 'Cali Roll', item2: 'Crgrab', item3: 2, item4: 2 },
                { item1: 'adasdadf', item2: 'gfdg', item3: 5, item4: 2  },
                { item1: 'Cali dfsfgs', item2: 't45y4', item3: 99, item4: 2  },
                { item1: 'Cafgdgl', item2: 'fgdg4', item3: 45, item4: 2  },
                { item1: 'Catyjhl', item2: 'rg34g', item3: 546 , item4: 2 }

            ];



        }])

    .directive('fileUploadComponent', function() {
        return {

            templateUrl: '../partials/views/components/uploadFiles.component.html'
        };
    })





