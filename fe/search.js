var myApp = angular.module('myApp');


/*$sce to display the html body*/
/*search controller */

myApp.controller('SearchController', ['$scope', '$sce', '$http', '$location', '$routeParams',
    function ($scope, $sce, $http, $location, $routeParams) {
        $scope.toSearch = ''
        $scope.flag = false;
        $scope.pageName = ['Google', 'Wikipedia'];
        console.log("pages", $scope.pageName);

        $scope.getData = function (toSearch) {
            console.log('toSearch', toSearch);
            $http.get('/api/search/' + toSearch).then(function (response) {
                $scope.results = response.data.results
                $scope.myContents = [];
                console.log('response', $scope.results);

                for (key in $scope.results) {
                    console.log('key', key)
                    $scope.myContents.push({
                        'body': $sce.trustAsHtml($scope.results[key].body),
                        'title': $scope.results[key].title
                    });

                }

            });

        }
    }]);
