/**
 * name: 及各自模块的入口
 * @author weijb
 * Version: 1.0.0 2016/9/12
 */
app.controller('contactsCtrl', ['$scope', 'contactsService', 'appService',
	function($scope, contactsService, appService) {
		$scope.title = "黄家湾";
		$scope.models = contactsService.getModleTabs();
		$scope.getData = function(c) {
			// 安卓平台不会自动触发加载
			if(c.isSelect) {
				console.dir('333')
				c.doRefresh();
			}
			// 初始化数据，和回调函数
			c.callback = function(flag) {
				if(flag) {
					$scope.$broadcast('scroll.infiniteScrollComplete');
				} else {
					$scope.$broadcast('scroll.refreshComplete');
				}
			}
		}
		angular.forEach($scope.models, function(data) {
			$scope.getData(data);
		})
		$scope.changeAge = function(params){
			console.dir(params)
		}
		
	}
]);