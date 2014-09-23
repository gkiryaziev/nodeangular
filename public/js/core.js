
var app = angular.module('testapp', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/main.html'
		})
		.when('/add', {
			templateUrl: 'views/add.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});

function userController($scope, $http) {
	$scope.formData = {};

	$http.get('/api/users')
		.success(function(data) {
			$scope.users = data;			
		})
		.error(function(data) {
			console.log(data);
		});

	$scope.addUser = function() {
		$http.post('/api/users', $scope.formData)
			.success(function(data) {
				$scope.formData = {};
				$scope.users = data;
			})
			.error(function(data) {
				console.log(data);
			});
	};

	$scope.deleteUser = function(id) {
		$http.delete('/api/users/' + id)
			.success(function(data) {
				$scope.users = data;
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};
}