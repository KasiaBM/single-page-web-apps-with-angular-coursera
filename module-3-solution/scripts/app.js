(function() {
"use strict";
angular.module("NarrowItDownApp", [])
.controller("NarrowItDownController", NarrowItDownController)
.service("MenuSearchService", MenuSearchService)
.directive("foundItems", FoundItemsDirective)
.constant("MenuBasePath", "http://davids-restaurant.herokuapp.com");

NarrowItDownController.$inject = ["MenuSearchService"];
function NarrowItDownController(MenuSearchService) {
	var narrowIt = this;
	narrowIt.found = [];
	narrowIt.isEmpty = false;
	narrowIt.searchTerm = "";
	
	narrowIt.getMenuItems = function(searchTerm) {
		
		narrowIt.found = [];
		if (narrowIt.searchTerm) {
			var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
			promise.then(function(response) {
				narrowIt.found = response;
				narrowIt.isEmpty = false;
			})
			.catch(function(error) {
				console.log("Something went terribly wrong...");
			});
		}
		if (narrowIt.found.length === 0) {
			narrowIt.isEmpty = true;
		}
	};
	
	narrowIt.removeItem = function(index) {
		narrowIt.found.splice(index, 1);
		if (narrowIt.found.length == 0) {
			narrowIt.error = "Nothing to remove";
		}
	};
}

MenuSearchService.$inject = ["$http", "MenuBasePath"];
function MenuSearchService($http, MenuBasePath) {
	var service = this;
	
	service.getMatchedMenuItems = function(searchTerm) {
		return $http({
			method: "GET",
			url: (MenuBasePath + "/menu_items.json")
		}).then(function(result) {
			var items = result.data.menu_items;
			var foundItems = [];
			for (var i = 0; i < items.length; i++) {
				if (items[i].description.toLowerCase().indexOf(searchTerm) !== -1) {
					foundItems.push(items[i]);
				}
			}
			return foundItems;
		});
	};
}

function FoundItemsDirective() {
	var ddo = {
		templateUrl: "foundItems.html",
		scope: {
			items: '<',
			onRemove: '&'
		}
	};
	return ddo;
}
})();