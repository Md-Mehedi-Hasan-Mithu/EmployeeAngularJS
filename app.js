var app = angular.module('employeeApp', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/employee-form', {
      templateUrl: 'pages/employee-form.html',
      controller: 'EmployeeFormController'
    })
    .when('/salary-form', {
      templateUrl: 'pages/salary-form.html',
      controller: 'SalaryFormController'
    })
    .when('/employee-list', {
      templateUrl: 'pages/employee-list.html',
      controller: 'EmployeeListController'
    })
    .otherwise({
      redirectTo: '/employee-form'
    });
});

// Employee Form Controller
app.controller('EmployeeFormController', function($scope, $http) {
  $scope.employee = {};

  $scope.divisions = ['Dhaka','Chittagong','Rajshahi',
                      'Khulna','Sylhet','Barisal',
                      'Rangpur','Mymensingh'];

  $scope.districts = ['Dhaka','Gazipur','Narayanganj',
                      'Chittagong','Cox\'s Bazar','Sylhet'];

  $scope.religions = ['Islam','Hinduism','Christianity',
                      'Buddhism','Others'];

  $scope.save = function() {
    $http.post('http://localhost:5000/api/employee', $scope.employee)
      .then(function() {
        alert('Employee saved successfully!');
        $scope.employee = {};
      }, function() {
        alert('Error saving employee!');
      });
  };

  $scope.clear = function() {
    $scope.employee = {};
  };
});

// Salary Form Controller
app.controller('SalaryFormController', function($scope, $http) {
  $scope.salary = {};
  $scope.employees = [];

  $http.get('http://localhost:5000/api/employee')
    .then(function(response) {
      $scope.employees = response.data;
    });

  $scope.save = function() {
    $http.post('http://localhost:5000/api/salary', $scope.salary)
      .then(function() {
        alert('Salary saved successfully!');
        $scope.salary = {};
      });
  };
});

// Employee List Controller
app.controller('EmployeeListController', function($scope, $http) {
  $scope.employees = [];
  $scope.filter = {};

  $scope.loadEmployees = function() {
    $http.get('http://localhost:5000/api/employee/list')
      .then(function(response) {
        $scope.employees = response.data;
      });
  };

  $scope.loadEmployees();

  $scope.edit = function(emp) {
    $scope.selectedEmployee = angular.copy(emp);
  };
});