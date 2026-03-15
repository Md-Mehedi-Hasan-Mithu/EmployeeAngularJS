app.controller('ListController', function($scope, $http, $location, API_URL) {

  $scope.employees = [];
  $scope.loading = false;
  $scope.viewModal = false;
  $scope.deleteModal = false;
  $scope.selectedEmployee = null;
  $scope.deleteTarget = null;
  $scope.toastMsg = null;
  $scope.toastType = null;

  $scope.filters = {
    name:'', designation:'', fromDate:'', toDate:'', minSalary:''
  };

  $scope.load = function() {
    $scope.loading = true;
    var f = $scope.filters;
    var params = {};
    if (f.name)        params.name        = f.name;
    if (f.designation) params.designation = f.designation;
    if (f.fromDate)    params.fromDate    = f.fromDate;
    if (f.toDate)      params.toDate      = f.toDate;
    if (f.minSalary)   params.minSalary   = f.minSalary;

    $http.get(API_URL, { params: params })
      .then(function(res) { $scope.employees = res.data; })
      .catch(function()   { $scope.toast('Failed to load employees.', 'error'); })
      .finally(function() { $scope.loading = false; });
  };

  $scope.clearFilters = function() {
    $scope.filters = { name:'', designation:'', fromDate:'', toDate:'', minSalary:'' };
    $scope.load();
  };

  $scope.openView   = function(e) { $scope.selectedEmployee = e; $scope.viewModal = true; };
  $scope.closeView  = function()  { $scope.viewModal = false; $scope.selectedEmployee = null; };

  $scope.goEdit     = function(code) { $location.path('/edit/' + code); };

  $scope.openDelete  = function(e) { $scope.deleteTarget = e; $scope.deleteModal = true; };
  $scope.closeDelete = function()  { $scope.deleteModal = false; $scope.deleteTarget = null; };

  $scope.confirmDelete = function() {
    $http.delete(API_URL + '/' + $scope.deleteTarget.employeeCode)
      .then(function() {
        $scope.toast('Employee deleted successfully.', 'success');
        $scope.closeDelete();
        $scope.load();
      })
      .catch(function() { $scope.toast('Delete failed. Try again.', 'error'); });
  };

  $scope.toast = function(msg, type) {
    $scope.toastMsg  = msg;
    $scope.toastType = type;
    setTimeout(function() {
      $scope.$apply(function() { $scope.toastMsg = null; });
    }, 3000);
  };

  $scope.load();
});