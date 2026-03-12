var app = angular.module('employeeApp',['ngRoute']);

app.config(function($routeProvider){
    $routeProvider
     .when('/employee-form',{
        templateUrl:'pages/employee-form.html',
        controller:'EmployeeFormController'
     })
     .when('/salary-form',{
        templateUrl:'pages/salary-form.html',
        controller:'salaryFormController'
     })
     .when('/employee-list',{
        templateUrl:'pages/employee-list',
        controller:'employeeListController'
     })
     .otherwise({
        redirectTo:'/employee-form'
     });
});

//Employee Form Controller
app.controller('EmployeeFormController', function($scope,$http){
    $scope.employee = {};

    $scope.divisions = ['Dhaka','Chittagong','Rajshahi','Khulna','Sylhet','Barishal','Rangpur','Mymensingh'];

    $scope.districts = ['Dhaka','Gazipur','Narayanganj',
                      'Chittagong','Cox\'s Bazar','Sylhet'];

    $scope.religions = ['Islam','Hinduism','Christianity',
                      'Buddhism','Others'];

    $scope.save = function(){
        $http.post('http://localhost:5000/api/employee', $scope.employee).then(function(){
            alert('Employee saved Successfully!');
            $scope.employee = {};
        }, function(){
            alert('Error saving employee!');
        });
    };
    $scope.clear = function(){
        $scope.employee = {};
    };
});

app.controller('SalaryFormController',function($scope,$http){
    $scope.salary = {};
    $scope.employees = {};

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
})