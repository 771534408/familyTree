/**
 * name: 及各自模块的入口
 * @author weijb
 * Version: 1.0.0 2016/9/12
 */
app.controller('searchCtrl', ['$scope','$state', 'appService','loading',
	function($scope,$state,appService,loading) {
		$scope.title = "黄家湾";
		$scope.name = '444';
		var code = null;
		$scope.hjSelect_x = {
			title: '请选择所在的乡或镇',
			/*modal标题*/
			hasSearch: true,
			/*是否有搜索工具栏*/
			multiselect: false,
			index: code ? code[0] : null,
			/*是否多选*/
			data: pz,
			/*modal数据集*/
			name: 'areaName',
			/*modal的项name值*/
			value: 'areaCode',
			/*modal的项value*/
			result: '',
			/*modal返回的结果*/
			getResult: function(res) { /*modal返回结果的函数*/
				this.result = res.map(function(item) {
					if($scope.hjSelect_c.index && $scope.hjSelect_c.index.split('-')[0] == item.value) {

					} else {
						var temp = pz.find(function(i) {
							return i.areaCode == item.value
						})
						$scope.hjSelect_c.index = item.value + '-' + temp.data[0].areaCode;
					}
					return item.name;
				}).join();
			}
		}
		/*事业部选择框*/
		$scope.hjSelect_c = {
			title: '',
			/*modal标题*/
			hasSearch: true,
			/*是否有搜索工具栏*/
			multiselect: false,
			index: code ? (code[0] + '-' + code[1]) : null,
			/*是否多选*/
			data: pz[0].data,
			/*modal数据集*/
			name: 'areaName',
			/*modal的项name值*/
			value: 'areaCode',
			/*modal的项value*/
			result: '',
			/*modal返回的结果*/
			getResult: function(res) { /*modal返回结果的函数*/
				var _this = this;
				_this.title = $scope.hjSelect_x.result;
				_this.result = res.map(function(item) {
					if($scope.hjSelect_d.index && $scope.hjSelect_d.index.split('-')[1] == item.value) {

					} else {
						var temp = pz.find(function(i) {
							return i.areaCode == $scope.hjSelect_c.index.split('-')[0];
						}).data.find(function(j) {
							return j.areaCode == item.value;
						});
						$scope.hjSelect_d.index = $scope.hjSelect_c.index.split('-')[0] + '-' + item.value + '-' + temp.data[0].areaCode;
					}

					return item.name;
				}).join();
			}
		}
		$scope.hjSelect_d = {
			title: '',
			/*modal标题*/
			hasSearch: true,
			/*是否有搜索工具栏*/
			multiselect: false,
			index: code ? (code[0] + '-' + code[1] + '-' + code[2]) : null,
			/*是否多选*/
			data: pz[0].data[0].data,
			/*modal数据集*/
			name: 'areaName',
			/*modal的项name值*/
			value: 'areaCode',
			/*modal的项value*/
			result: '',
			/*modal返回的结果*/
			getResult: function(res) { /*modal返回结果的函数*/
				this.title = $scope.hjSelect_c.result;
				this.result = res.map(function(item) {
					return item.name;
				}).join();
			}
		}
		$scope.submit = function(){
			if($scope.hjSelect_d.result=='' && $scope.name==''){
				loading.toggle('搜索项不能全为空',1600);
			}else{
				$state.go('search-result',{code:$scope.hjSelect_d.index,name:$scope.name})
			}
		}
	}
]);