(function() {
"use strict";
angular.module("myFirstApp", [])
.controller("MyFirstController", function($scope) {
	$scope.name = "Kasia";
	$scope.sayHello = function() {
		return "Hello everyone!"
	};
});
})();