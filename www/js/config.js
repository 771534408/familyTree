/**
 * @desc 族谱app，按需加载配置信息
 * @by weijb
 * 2017/9/11
 */
app.config(['$controllerProvider', '$ionicConfigProvider', '$compileProvider', '$filterProvider', '$provide', '$httpProvider',
	function($controllerProvider, $ionicConfigProvider, $compileProvider, $filterProvider, $provide, $httpProvider) {
		$httpProvider.interceptors.push('userInterceptor');
		app.controller = $controllerProvider.register;
		app.directive = $compileProvider.directive;
		app.filter = $filterProvider.register;
		app.factory = $provide.factory;
		app.service = $provide.service;
		app.constant = $provide.constant;
		/**设置http请求的配置**/
		$httpProvider.defaults.transformRequest = function(obj) {
			var str = [];
			for(var p in obj) {
				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
			}
			return str.join("&");
		};
		$httpProvider.defaults.headers.post = {
			'Content-Type': 'application/x-www-form-urlencoded'
		};
		$ionicConfigProvider.navBar.alignTitle('center');
		$ionicConfigProvider.backButton.text('返回').icon('icon-back');
		$ionicConfigProvider.backButton.previousTitleText('')
	}
])