var app = angular.module('employeeApp', ['ngRoute']);

// *** Your API port is 5071 ***
app.constant('API_URL', 'http://localhost:5071/api/employees');

app.config(function($routeProvider) {
  $routeProvider
    .when('/add', {
      templateUrl: 'views/add.html',
      controller: 'EmployeeController'
    })
    .when('/edit/:code', {
      templateUrl: 'views/add.html',
      controller: 'EmployeeController'
    })
    .when('/list', {
      templateUrl: 'views/list.html',
      controller: 'ListController'
    })
    .otherwise({ redirectTo: '/list' });
});