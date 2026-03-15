app.controller('EmployeeController', function($scope, $http, $routeParams, $location, API_URL) {

  $scope.isEdit = !!$routeParams.code;
  $scope.message = null;
  $scope.error = null;
  $scope.saving = false;

  $scope.employee = {
    employeeCode:'', employeeName:'', dateOfBirth:'',
    joiningDate:'', mobileNumber:'', address:'',
    division:'', district:'', religion:'',
    designation:'', salary:null
  };

  $scope.divisions = ['Dhaka','Chittagong','Rajshahi','Khulna','Sylhet','Barisal','Rangpur','Mymensingh'];
  $scope.religions = ['Islam','Hinduism','Christianity','Buddhism','Other'];

  var districtMap = {
    Dhaka:      ['Dhaka','Gazipur','Narayanganj','Manikganj','Tangail','Faridpur','Kishoreganj','Narsingdi'],
    Chittagong: ['Chittagong',"Cox's Bazar",'Comilla','Noakhali','Feni','Chandpur','Brahmanbaria'],
    Rajshahi:   ['Rajshahi','Bogra','Pabna','Sirajganj','Natore','Naogaon','Joypurhat'],
    Khulna:     ['Khulna','Jessore','Satkhira','Narail','Bagerhat','Kushtia','Jhenaidah'],
    Sylhet:     ['Sylhet','Moulvibazar','Habiganj','Sunamganj'],
    Barisal:    ['Barisal','Bhola','Patuakhali','Pirojpur','Jhalokati','Barguna'],
    Rangpur:    ['Rangpur','Dinajpur','Kurigram','Gaibandha','Nilphamari','Thakurgaon'],
    Mymensingh: ['Mymensingh','Jamalpur','Netrokona','Sherpur']
  };

  $scope.districts = [];

  $scope.onDivisionChange = function() {
    $scope.districts = districtMap[$scope.employee.division] || [];
    $scope.employee.district = '';
  };

  // Load employee for editing
  if ($scope.isEdit) {
    $http.get(API_URL + '/' + $routeParams.code)
      .then(function(res) {
        $scope.employee = res.data;
        if ($scope.employee.dateOfBirth)
          $scope.employee.dateOfBirth = $scope.employee.dateOfBirth.substring(0,10);
        if ($scope.employee.joiningDate)
          $scope.employee.joiningDate = $scope.employee.joiningDate.substring(0,10);
        $scope.districts = districtMap[$scope.employee.division] || [];
      })
      .catch(function() { $scope.error = 'Failed to load employee data.'; });
  }

  $scope.save = function() {
    $scope.message = null;
    $scope.error = null;

    if (!$scope.employee.employeeCode || !$scope.employee.employeeName) {
      $scope.error = 'Employee Code and Name are required.';
      return;
    }

    $scope.saving = true;

    var request = $scope.isEdit
      ? $http.put(API_URL + '/' + $scope.employee.employeeCode, $scope.employee)
      : $http.post(API_URL, $scope.employee);

    request
      .then(function() {
        $scope.message = $scope.isEdit
          ? 'Employee updated successfully!'
          : 'Employee added successfully!';
        if (!$scope.isEdit) $scope.reset();
        setTimeout(function() {
          $scope.$apply(function() { $scope.message = null; });
        }, 3000);
      })
      .catch(function(err) {
        $scope.error = (err.data && err.data.message)
          ? err.data.message
          : 'Something went wrong. Please try again.';
      })
      .finally(function() { $scope.saving = false; });
  };

  $scope.reset = function() {
    $scope.employee = {
      employeeCode:'', employeeName:'', dateOfBirth:'',
      joiningDate:'', mobileNumber:'', address:'',
      division:'', district:'', religion:'',
      designation:'', salary:null
    };
    $scope.districts = [];
    $scope.error = null;
  };
});