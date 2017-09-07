var myApp = angular.module('myApp', ['ngRoute', 'ngSanitize']);
/*ngSabitize to display the html body*/
myApp.config(function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'SearchController',
        templateUrl: 'search.html'
    }).when('/data', {
        controller: 'SearchController',
        templateUrl: 'data.html'
    })
        .otherwise({
            redirectTo: '/'
        });
});