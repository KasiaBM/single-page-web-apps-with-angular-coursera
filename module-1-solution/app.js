(function() {
"use strict";
angular.module("LunchCheck", [])
.controller("LunchCheckController", LunchCheckController);
LunchCheckController.$inject = ["$scope"];
function LunchCheckController($scope) {
	$scope.message = "";	
	$scope.empty = true;
	$scope.checkMyLunch = function() {
		$scope.empty = false;
		$scope.isLunch = false;
		var total = 0;		
		if ($scope.lunch !== undefined) {			
			$scope.isLunch = true;
			var lunchContent = $scope.lunch.split(",");
			console.log(lunchContent);
			for (var i = 0; i < lunchContent.length; i++) {
				if (lunchContent[i] !== "") {
					total++;
				}
			}
			console.log(total);		
			if (total > 0 && total <= 3) {
				$scope.message = "Enjoy!";
			}
			else if (total > 3) {
				$scope.message = "Too much!";
			}
		} 
		if (total === 0) {
			$scope.isLunch = false;
			$scope.message = "Please enter data first.";			
		}
	}
}
})();