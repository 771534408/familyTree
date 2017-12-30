/**
 * name: demo模块的使用包含，时间选择器，数据项选择器，及各自模块的入口
 * @by weijb 2017/9/12
 */
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('home', {
			url: '/home',
			templateUrl: 'module/common/templates/home.html',
			controller: 'homeCtrl',
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load([
						'data/pz.js',
						'data/letter.js',
						'module/common/ctrl/home.js'
					]);
				}]
			}
		}).state('website', {
			url: '/website',
			templateUrl: 'module/common/templates/website.html',
			controller: 'indexCtrl',
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load([
						'module/common/ctrl/index.js'
					]);
				}]
			}
		}).state('introduce', {
			url: '/introduce',
			templateUrl: 'module/common/templates/introduce.html',
			controller: 'introduceCtrl',
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load([
						'module/common/ctrl/index.js'
					]);
				}]
			}
		}).state('contacts', {
			url: '/contacts',
			templateUrl: 'module/common/templates/contacts.html',
			controller: 'contactsCtrl',
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load([
						'module/common/services/contacts.js',
						'module/common/ctrl/contacts.js'
					]);
				}]
			}
		}).state('contact-detail', {
			url: '/contact-detail',
			templateUrl: 'module/common/templates/contact-detail.html',
			controller: 'contactDetailCtrl',
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load([
						'module/common/services/contacts.js',
						'module/common/ctrl/contact-detail.js'
					]);
				}]
			}
		}).state('search', {
			url: '/search',
			templateUrl: 'module/common/templates/search.html',
			controller: 'searchCtrl',
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load([
						'data/pz.js',
//						'module/common/services/search.js',
						'module/common/ctrl/search.js'
					]);
				}]
			}
		}).state('search-result', {
			url: '/search-result/:code/:name',
			templateUrl: 'module/common/templates/search-result.html',
			controller: 'searchResultCtrl',
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load([
						'data/pz.js',
						'module/common/services/search-result.js',
						'module/common/ctrl/search-result.js'
					]);
				}]
			}
		})
		.state('stemma', {
			url: '/stemma',
			templateUrl: 'module/common/templates/stemma.html',
			controller: 'stemmaCtrl',
			resolve: {
				deps: ["$ocLazyLoad", function($ocLazyLoad) {
					return $ocLazyLoad.load([
						'module/common/ctrl/stemma.js'
					]);
				}]
			}
		})
	$urlRouterProvider.otherwise('/home');
}]);