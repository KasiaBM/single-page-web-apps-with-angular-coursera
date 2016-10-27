(function() {
"use strict";
angular.module("LunchCheck", [])
.controller("LunchCheckController", LunchCheckController);
LunchCheckController.$inject = ["$scope"];
function LunchCheckController($scope) {
	$scope.message = "";
	$scope.much = false;
	$scope.checkMyLunch = function() {
		var total = 0;
		var lunchContent = [];
		if ($scope.lunch === undefined || $scope.lunch === "") {
			$scope.much = false;
			$scope.message = "Please enter data first.";
		}
		else {
			$scope.much = true;
			lunchContent = $scope.lunch.split(",");
			var rgx = /[a-zA-Z]/;
			for (var i = 0; i < lunchContent.length; i++) {
				if (lunchContent[i].match(rgx)) {
					total++;
				}
			}
			$scope.total = total;
			if (total <= 3) {
				$scope.message = "Enjoy!";
			}
			else {
				$scope.message = "Too much!";
			}
		}
	}
}
})();