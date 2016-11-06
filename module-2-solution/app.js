(function(){
"use strict";
angular.module("ShoppingListCheckOff", [])	
.controller("ToBuyController", ToBuyController)
.controller("AlreadyBoughtController", AlreadyBoughtController)
.service("ShoppingListCheckOffService", ShoppingListCheckOffService)

ToBuyController.$inject = ["ShoppingListCheckOffService"];
function ToBuyController(ShoppingListCheckOffService) {
	var toBuy = this;
	toBuy.name = "";
	toBuy.quantity = "";
	toBuy.itemsToBuy = ShoppingListCheckOffService.getItemsToBuy();
	toBuy.removeBoughtItem = function(itemIndex) {
		ShoppingListCheckOffService.removeBoughtItem(itemIndex);
	};
	toBuy.isEmpty = function() {
		return toBuy.itemsToBuy.length === 0;
	};
};

AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
function AlreadyBoughtController(ShoppingListCheckOffService) {
	var bought = this;
	bought.name = "";
	bought.quantity = "";
	bought.itemsBought = [];
	bought.itemsBought = ShoppingListCheckOffService.getItemsBought();
	bought.isEmpty = function() {
		return bought.itemsBought.length === 0;
	};
};

function ShoppingListCheckOffService() {
	var service = this;
	
	// arrays to store items to buy and bought already
	var itemsToBuy = [
		{
			name: "Cookies",
			quantity: "5 packs"
		}, {
			name: "Ice cream",
			quantity: "2 tubs"
		}, {
			name: "Doughnuts",
			quantity: "1 dozen"
		}, {
			name: "Waffles",
			quantity: "4 packs"
		}, {
			name: "Lemonade",
			quantity: "3 bottles"
		}
	];
	var itemsBought = [];
	
	// remove item from itemsToBuy array and push into itemsBought array
	service.removeBoughtItem = function(itemIndex) {
		var itemRemoved = itemsToBuy.splice(itemIndex, 1);
		var itemBought = {
			name: itemRemoved[0].name,
			quantity: itemRemoved[0].quantity
		};
		itemsBought.push(itemBought);
	};
	
	// return itemsToBuy array
	service.getItemsToBuy = function () {
		return itemsToBuy;
	};
	
	// return itemsBought array
	service.getItemsBought = function() {
		return itemsBought;
	}
};
})();