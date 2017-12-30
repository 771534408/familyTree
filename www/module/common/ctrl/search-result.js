/**
 * name: 及各自模块的入口
 * @author weijb
 * Version: 1.0.0 2016/9/12
 */
app.controller('searchResultCtrl', ['$scope', 'searchResultService','loading',
	function($scope,searchResultService,loading) {
		$scope.model = searchResultService.getListModel($scope, {});
	    $scope.model.doRefresh();
	}
]);