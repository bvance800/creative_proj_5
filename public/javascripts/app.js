var app = angular.module('store', ['ui.router']);

app.controller('HomeCtrl', [
'$scope',
'items',
'cart',
function($scope, items, cart){
	$scope.test = "Welcome Customers!";

	$scope.items = items.items;
	$scope.cart = cart.cart;


}
]);

app.factory('cart', [function(){
	var c = {
		cart: [
		
		]
	};

	return c;
}])

app.factory('items', [function(){

	var inv = {
		items: [
			{
				img:"images/orange-flowers.jpg",
				price: 18,
				description: "Lovely arrangement of orange and blue flowers." + 
				" Perfect for any occasion!",
				id: 0
			},
			{
				img:"images/pink-flowers.jpg",
				price: 18,
				description: "Lovely arrangement of red and pink flowers." + 
				" Perfect for any occasion!",
				id: 1
			},
			{
				img:"images/roses.jpg",
				price: 25,
				description: "Lovely arrangement of roses." + 
				" Perfect for any occasion!",
				id: 2
			},
			{
				img:"images/tulips.jpg",
				price: 20,
				description: "Lovely arrangement of colorful tulips." + 
				" Perfect for any occasion!",
				id: 3
			},
			{
				img:"images/white-flowers.jpg",
				price: 22,
				description: "Lovely arrangement of white flowers. Not sure what kind." + 
				" Perfect for any occasion!",
				id: 4
			},
			{
				img:"images/yellow-flowers.jpg",
				price: 20,
				description: "Lovely arrangement of many different colored flowers." + 
				" Perfect for any occasion!",
				id: 5
			}

		]
	};

	return inv;

}]);

app.directive('storeitems', itemDirective);

function itemDirective(){
	return{
		scope:{
			item: '='
		},
		restrict: 'E',
		replace: 'true',
		template:(
			'<div class="store-item">' +
				'<a href="#item/{{item.id}}"><img ng-src="{{item.img}}"/></a>' +
				'<p>${{item.price}}.00</p>' +
			'</div>'
		),
		link: link

	};

	function link(scope){
		if(!scope.item.img){
			scope.item.img = "images/silhouette.jpg";
		}
	}
}

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'HomeCtrl'
    })
    .state('item', {
  	url: '/item/{id}',
  	templateUrl: '/item.html',
  	controller: 'ItemCtrl'
	})
	.state('cart', {
  	url: '/cart',
  	templateUrl: '/cart.html',
  	controller: 'CartCtrl'
	});

  $urlRouterProvider.otherwise('home');
}]);

app.controller('ItemCtrl', [
	'$scope',
	'$stateParams',
	'items',
	'cart',
	function($scope,$stateParams, items, cart)
	{

		$scope.currentItem = items.items[$stateParams.id];

		$scope.addToCart = function(currentItem){
			cart.cart.push(currentItem);
		}

	}])

app.controller('CartCtrl', [
	'$scope',
	'items',
	'cart',
	function($scope, items, cart)
	{
		$scope.items = cart.cart;
	}])
