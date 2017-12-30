/**
 * name: 及各自模块的入口
 * @author weijb
 * Version: 1.0.0 2016/9/12
 */
app.controller('homeCtrl', ['$scope', '$ionicHistory', '$state', 'appService',
	function($scope, $ionicHistory, $state, appService) {
		var code = null;
		var code = '11_140_1187'.split('_');
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

		/*请选择姓氏*/
		$scope.hjSelect_xs = {
			title: '',
			/*modal标题*/
			hasSearch: true,
			/*是否有搜索工具栏*/
			multiselect: false,
			/*是否多选*/
			data: xsLetter,
			/*modal的项value*/
			result: '',
		}

		/*请选择学历*/
		$scope.hjSelect_xl = {
			title: '请选择学历',
			/*modal标题*/
			hasSearch: false,
			/*是否有搜索工具栏*/
			multiselect: false,
			/*是否多选*/
			data: ['未知', '小学', '中学', '高中', '专科', '本科', '硕士', '博士'].map(function(item) {
				return {
					name: item,
					value: item
				}
			}),
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
		var sh_data = [{
			"name": "时辰不清楚",
			"value": ""
		}, {
			"name": "子时 0点",
			"value": "0"
		}, {
			"name": "丑时 1点",
			"value": "1"
		}, {
			"name": "丑时 2点",
			"value": "2"
		}, {
			"name": "寅时 3点",
			"value": "3"
		}, {
			"name": "寅时 4点",
			"value": "4"
		}, {
			"name": "卯时 5点",
			"value": "5"
		}, {
			"name": "卯时 6点",
			"value": "6"
		}, {
			"name": "辰时 7点",
			"value": "7"
		}, {
			"name": "辰时 8点",
			"value": "8"
		}, {
			"name": "巳时 9点",
			"value": "9"
		}, {
			"name": "巳时 10点",
			"value": "10"
		}, {
			"name": "午时 11点",
			"value": "11"
		}, {
			"name": "午时 12点",
			"value": "12"
		}, {
			"name": "未时 13点",
			"value": "13"
		}, {
			"name": "未时 14点",
			"value": "14"
		}, {
			"name": "申时 15点",
			"value": "15"
		}, {
			"name": "申时 16点",
			"value": "16"
		}, {
			"name": "酉时 17点",
			"value": "17"
		}, {
			"name": "酉时 18点",
			"value": "18"
		}, {
			"name": "戌时 19点",
			"value": "19"
		}, {
			"name": "戌时 20点",
			"value": "20"
		}, {
			"name": "亥时 21点",
			"value": "21"
		}, {
			"name": "亥时 22点",
			"value": "22"
		}, {
			"name": "子时 23点",
			"value": "23"
		}];

		/*请选择生辰*/
		$scope.hjSelect_sh = {
			title: '请选择生辰',
			/*modal标题*/
			hasSearch: false,
			/*是否有搜索工具栏*/
			multiselect: false,
			/*是否多选*/
			data: sh_data,
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

		/*选择性别*/
		$scope.sex = {
			text: '男',
			checked: true
		};
		$scope.changeSex = function() {
			$scope.sex.checked = !$scope.sex.checked;
			$scope.sex.text = $scope.sex.checked ? '男' : '女';
		}
		/*婚否*/
		/*选择性别*/
		$scope.marriages = {
			text: '未婚',
			checked: true
		};
		$scope.changeMarriages = function() {
			$scope.marriages.checked = !$scope.marriages.checked;
			$scope.marriages.text = $scope.marriages.checked ? '未婚' : '已婚';
		}
		/*是否在世*/
		$scope.alives = {
			text: '是',
			checked: true
		}
		$scope.changeAlives = function() {
			$scope.alives.checked = !$scope.alives.checked;
			$scope.alives.text = $scope.alives.checked ? '是' : '否';
		}

		/*头像上传*/
		$scope.avatar = "";
		var options = {
			quality: 50,
			allowEdit: true,
			targetWidth: 100,
			targetHeight: 100,
			saveToPhotoAlbum: false,
			correctOrientation: true
		};

		$scope.upload = function() {
			if(angular.isUndefined(navigator.camera)) {
				$scope.avatar = "img/header.jpg";
			} else {
				alert(3)
 				navigator.camera.getPicture(options).then(function(imageData) {
					$scope.avatar = "data:image/jpeg;base64," + imageData;
				}, function(err) {

				});
			}
		}

	}
]);