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
		items:items: [
			{
				img:"images/chromecast.png",
				price: 30,
				description: "Mirrors your computer or device screen to your TV. Convenient thumb-sizeSupports 100s of apps like Netflix, YouTube, HBO Now, PandoraPlugs into any HDTV and connects to your home WiFi network",
				id: 0
			},
			{
				img:"images/dellxps13.png",
				price: 849,
				description: "Erasing borders, starting with the display. The Dell XPS 13\" Laptop features the world’s first virtually borderless InfinityEdge display. You'll enjoy watching your favorite media and surfing the web on this unique screen. ",
				id: 1
			},
			{
				img:"images/iPhone.jpg",
				price: 719,
				description: "iPhone 7 dramatically improves the most important aspects of the iPhone experience. It introduces advanced new camera systems. The best performance and battery life ever in an iPhone. Immersive stereo speakers. The brightest, most colorful iPhone display. Splash and water resistance.1 And it looks every bit as powerful as it is. This is iPhone 7.",
				id: 2
			},
			{
				img:"images/newTV.jpg",
				price: 1699,
				description: "Discover a thrilling world of extraordinary clarity. Every single pixel is enhanced beautifully by a powerful 4K picture processing technology. Individual parts of each scene are analyzed and matched with a special image database that independently addresses texture, contrast, color, and edges. The difference is clear with supremely lifelike detail, whatever you're watching.",
				id: 3
			},
			{
				img:"images/skullcandyheadphones.jpg",
				price: 29,
				description: "Powerful, dual-channel haptic bass provides an immersive experience with bass you can feel. Refined memory foam ear pads enable a noise isolating fit. Bluetooth® wireless with up to 40 hours of battery life.",
				id: 4
			},
			{
				img:"images/xboxscorpio.jpg",
				price: 399,
				description: "The most powerful console ever, with 6 teraflops of graphical processing power.The first and only console to enable true 4K gaming and hi-fidelity VR.Compatible with all your Xbox One games and accessories.",
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
