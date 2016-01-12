angular.module('myApp').controller('geographyDataController',
    ['$scope', '$location',
        function ($scope, $location) {

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


        }]);


