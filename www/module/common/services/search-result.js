/**
 * 价格申请业务处理流程
 * @by ysj
 */
app.factory('searchResultService', ['$q', '$timeout', 'api', 'appService', 'loading', function($q, $timeout, api, appService, loading) {
	return {
		/**
		 * @desc 获取列表的请求model
		 * @param $scope $scope服务用来绑定视图和模型的纽带 
		 * @param params 请求的参数
		 * @returns object 
		 */
		getListModel: function($scope, params) {
			/*定义分页默认值*/
			var pagination = {
				pageNo: 0,
				pageSize: 10
			}
			/*依次将第二个参数及后续的参数的第一层属性赋值给第一个参数,得到请求的参数*/
			params = angular.extend(params, pagination);
			return {
				moredata: false,
				/*是否有更多数据*/
				data: [],
				/*存放请求的结果*/
				params: params,
				/*下拉刷新触发的函数*/
				doRefresh: function() {
					var _this = this;
					params.pageNo = 0;
					_this.moredata = false;
					appService('data/contatcts.json').get(params, function(res) {
						_this.data = res.contacts;
						$timeout(function() {
							$scope.$broadcast('scroll.refreshComplete');
						}, 500);
					}, function(err) {
						loading.toggle('数据加载失败');
						$scope.$broadcast('scroll.refreshComplete');
					})
				},
				/*上拉加载触发的函数*/
				loadMore: function() {
					var _this = this;
					params.pageNo += 1;
					appService('data/contatcts.json').get(params, function(res) {
						var data = res.contacts;
						_this.data = _this.data.concat(data);
						/*返回的数据小于分页数，判断数据已全部加载完毕*/
						if(params.pageSize > data.length) {
							_this.moredata = true;
							//loading.toggle('数据已全部加载完毕');
						}
						$scope.$broadcast('scroll.infiniteScrollComplete');
					}, function(err) {
						_this.moredata = false;
						loading.toggle('数据加载失败');
					})
				}
			};
		},
		/**
		 * @desc 获取付款申请详情的model值 
		 * @param {Object} params 请求的参数
		 */
		getDetailModel: function(id) {
			var params = {};
			var q = $q.defer();
			appService('').get(params, function(res) {
				q.resolve(res)
			}, function(err) {
				loading.toggle('数据加载失败');
				q.reject(err);
			});
			return q.promise;
		}
	}
}]);