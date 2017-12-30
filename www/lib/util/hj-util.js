/**
 * 定义一些公共的对话框，toast提示框及过滤器
 * @by weijb 2017-9-12
 */
app.service('loading', ['$ionicLoading', function($ionicLoading) {
		/**
		 * 显示加载的中效果 
		 * @param {Object} data
		 */
		this.show = function(data) {
			data = angular.extend({
				content: 'loading',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			}, data);
			$ionicLoading.show(data);
		};
		this.hide = function() {
			$ionicLoading.hide();
		};
		/**
		 * @param {Object} msg 提示的内容
		 * @param {Object} time 提示显示的时间
		 */
		this.toggle = function(msg, time) {
			$ionicLoading.show({
				template: msg,
				noBackdrop: true, //控制弹出提示后背景色是否改变(默认false)
				duration: time ? time : 700
			})

		}
	}])
	/**
	 * 弹出层对话框
	 */
	.factory('util.alert', [
		'$rootScope', '$q',
		function($rootScope, $q) {
			/*@desc:对话框的使用
			 * @param {Object} msg  对话框内容
			 * @param {Object} title 标题
			 */
			return function(msg, title) {
				var q = $q.defer();

				$rootScope.$emit('sys.msg', {
					msg: msg,
					title: title,
					type: 'alert',
					callback: function(b) {
						q[b ? 'resolve' : 'reject']();
					}
				});

				return q.promise;
			};
		}
	]).factory('confirm', [
		'$rootScope', '$q',
		function($rootScope, $q) {
			/*@desc:对话框的使用
			 * @param {Object} msg  对话框内容
			 * @param {Object} title 标题
			 * @param {Object} btn1  确定按钮名称
			 * @param {Object} btn2 取消按钮名称
			 */
			return function(msg, title, btn1, btn2) {
				var q = $q.defer();
				$rootScope.$emit('sys.msg', {
					msg: msg,
					title: title,
					type: 'confirm',
					btn1: btn1 ? btn1 : '取消',
					btn2: btn2 ? btn2 : '确定',
					callback: function(b) {
						q[b ? 'resolve' : 'reject']();
					}
				});

				return q.promise;
			};
		}
	]).directive('ucMsg', [
		'$rootScope',
		function($rootScope) {
			/*@desc:app界面弹出层对话狂，指令
			 */
			return {
				replace: true,
				scope: true,
				template: [
					'<div class="sales_dialog_confirm" ng-show="display">',
					'	<div class="sales_mask">',
					'	</div>',
					'	<div class="sales_dialog">',
					'		<div class="sales_dialog_bd" ng-bind-html="msg">',
					'		</div>',
					'		<div class="sales_dialog_ft">',
					'			<a class="sales_btn_dialog default" ng-click="callback(0)" ng-if="type != \'alert\'">',
					'				{{btn1}}',
					'			</a>',
					'			<a class="sales_btn_dialog" ng-click="callback(1)">',
					'				{{btn2}}',
					'			</a>',
					'		</div>',
					'	</div>',
					'</div>'
				].join(''),
				link: function(scope) {
					scope.display = false;
					$rootScope.$on('sys.msg', function(_, arg) {
						scope.display = true;
						scope.title = arg.title;
						scope.msg = arg.msg;
						scope.type = arg.type;
						if(scope.type == 'confirm') {
							scope.btn1 = arg.btn1;
							scope.btn2 = arg.btn2;
						} else {
							scope.btn2 = '确定';
						}
						scope.callback = function(b) {
							arg.callback(b);
							scope.display = false;
						};
					});
				}
			};
		}
	])
	/**
	 * 审核进度公共部分指令的编写
	 * 拨打电话，发邮件，提醒，发短信
	 */
	.directive('billProgress', ['localUtil', function(localUtil) {
		return {
			restrict: 'AE',
			scope: {
				conf: '='
			},
			template: [
			'<span class="right" >',
					'<button class="button button-light icon-remind" ng-click="send(0)"></button>',
					'<button class="button button-light  icon-message" ng-click="send(1)" ></button>',
					'<button class="button button-light  icon-phone" ng-click="send(2)"></button>',
					'<button class="button button-light  icon-mail" ng-click="send(3)"></button>',
				'</span>'
			].join(''),
			replace: true,
			link: function(scope, element, attrs) {
				scope.send = function(type) {
					/*0:提醒，1，发短信 2，拨打电话，3：发邮件*/
					if(type == 0) {

					} else if(type == 1) {
						localUtil.sendMessage(13805736877, "亲：你好吗？")
					} else if(type == 2) {
						localUtil.callPhone(13805736877);
					} else {

					}
				}
			}
		}
	}])
	/**
	 * 单项选择与多项选择的使用
	 */
	.directive('modalSomeSelect', ['$templateCache', '$ionicModal', function($templateCache, $ionicModal) {
		return {
			restrict: 'AE',
			scope: {
				conf: '='
			},
			link: function(scope, element, attrs) {
				scope.conf.searchKey = ''; /*定义关键字*/
				/**
				 * 转换数据集
				 */
				scope.conf.name = scope.conf.name ? scope.conf.name : 'name';
				scope.conf.value = scope.conf.value ? scope.conf.value : 'value';
				scope.conf.data = scope.conf.data.map(function(item) {
					return {
						name: item[scope.conf.name],
						value: item[scope.conf.value],
						state: false
					}
				})
				/**
				 * model选项初始化
				 */
				$ionicModal.fromTemplateUrl('./module/common/templates/modal.html', { // modal窗口选项
					scope: scope,
					animation: 'slide-in-right'
				}).then(function(modal) {
					scope.modal = modal;
				})
				/**
				 * 点击选择项
				 * @param {Object} item
				 */
				scope.selectItem = function(item) {
					item.state = !item.state;
					if(!scope.conf.multiselect) {
						scope.conf.data.forEach(function(option) {
							/*如果当前项选中其他项要非选中状态*/
							if(item.state) {
								if(option.value != item.value) {
									option.state = false;
								}
							}
						})
					}
				}
				/*关闭modal层*/
				scope.closeModal = function() {
					//获取选中项并关闭页面
					scope.conf.getResult(scope.conf.data.filter(function(item) {
						if(item.state) {
							return item;
						}
					}))
					scope.modal.hide();
				}
				/*清空关键字*/
				scope.clearSearch = function() {
					scope.conf.searchKey = '';
				}
				/**
				 * 点击触发model显示
				 */
				element.bind('click', function() {
					scope.modal.show();
				})
			}
		}
	}])
	/**
	 * 单项选择与多项选择的使用
	 */
	.directive('modalSelect', ['$ionicModal', 'loading', function($ionicModal, loading) {
		return {
			restrict: 'AE',
			scope: {
				conf: '='
			},
			link: function(scope, element, attrs) {
				scope.conf.searchKey = ''; /*定义关键字*/
				/**
				 * 转换数据集
				 */
				scope.conf.init = function(index) {
					scope.conf.data = scope.conf.data.map(function(item) {
						/*判断数据*/
						var temp = null;
						if(item.name || item.value) {
							if(item.value = index) {
								item.state = true;
							}
							temp = item;
						} else {
							temp = {
								name: item[scope.conf.name],
								value: item[scope.conf.value],
								state: false
							}
						}
						if(index == item[scope.conf.value]) {
							temp.state = true;
							scope.conf.getResult([temp])
						}
						return temp;
					})
				}
				// 监听一个model 当一个model每次改变时 都会触发第2个函数
				scope.$watch('conf.index', function(newValue, oldValue) {
					if(newValue) {
						if(newValue.indexOf('-') != -1) {
							var A_pz = newValue.split('-');
							if(A_pz.length == 2) {
								scope.conf.data = pz.find(function(item) {
									return item.areaCode == A_pz[0];
								}).data;
								scope.conf.init(A_pz[1]);
							} else if(A_pz.length == 3) {
								var data = pz.find(function(item) {
									return item.areaCode == A_pz[0];
								}).data;
								scope.conf.data = data.find(function(item) {
									return item.areaCode == A_pz[1];
								}).data;
								scope.conf.init(A_pz[2]);
							}
						} else {
							scope.conf.init(newValue);
						}
					} else {
						scope.conf.init();
					}
				})
				/**
				 * model选项初始化
				 */
				$ionicModal.fromTemplateUrl('./module/common/templates/modal.html', { // modal窗口选项
					scope: scope,
					animation: 'slide-in-right'
				}).then(function(modal) {
					scope.modal = modal;
				})
				/**
				 * 点击选择项
				 * @param {Object} item
				 */
				scope.selectItem = function(item) {
					item.state = !item.state;
					if(!scope.conf.multiselect) {
						scope.conf.data.forEach(function(option) {
							/*如果当前项选中其他项要非选中状态*/
							if(item.state) {
								if(option.value != item.value) {
									option.state = false;
								}
							}
						})
					}
				}
				/*关闭modal层*/
				scope.closeModal = function() {
					//获取选中项并关闭页面
					scope.conf.getResult(scope.conf.data.filter(function(item) {
						if(item.state) {
							return item;
						}
					}))
					scope.modal.hide();
				}
				/*清空关键字*/
				scope.clearSearch = function() {
					scope.conf.searchKey = '';
				}
				/**
				 * 点击触发model显示
				 */
				element.bind('click', function() {
					if(scope.conf.index == null) {
						if(scope.conf.data[0].value == 17) {
							loading.toggle('请先选择所在的乡或者镇', 1500);
						} else if(scope.conf.data[0].value == 183) {
							loading.toggle('请先选择所在的乡或者镇', 1500);
						} else {
							scope.modal.show();
						}
					} else {
						scope.modal.show();
					}
				})
			}
		}
	}])

	/**
	 * 单项选择与多项选择的使用
	 */
	.directive('modalLetterSelect', ['$templateCache', '$ionicModal', 'loading', function($templateCache, $ionicModal, loading) {
		return {
			restrict: 'A',
			scope: {
				conf: '='
			},

			link: function(scope, element, attrs) {
				scope.conf.searchKey = ''; /*定义关键字*/
				/**
				 * model选项初始化
				 */
				$ionicModal.fromTemplateUrl('./module/common/templates/modal-letter.html', { // modal窗口选项
					scope: scope,
					animation: 'slide-in-right'
				}).then(function(modal) {
					scope.modal = modal;
				})
				/**
				 * 点击选择项
				 * @param {Object} item
				 */
				scope.selectItem = function(item) {
					scope.conf.result = item;
					loading.toggle(item, 1500);
					scope.closeModal();
				}
				/*关闭modal层*/
				scope.closeModal = function() {
					//获取选中项并关闭页面
					scope.modal.hide();
				}
				/*清空关键字*/
				scope.clearSearch = function() {
					scope.conf.searchKey = '';
				}
				/**
				 * 点击触发model显示
				 */
				element.bind('click', function() {
					scope.modal.show();
				})
			}
		}
	}])

	/*tab页面滚动指令*/
	.directive('tabScroll', ['$ionicScrollDelegate', '$window', function($ionicScrollDelegate, $window) {
		return {
			restrict: 'E',
			scope: {
				conf: '='
			},
			template: [
				'<ion-header-bar class="bar-subheader" style="background-size:100% 0px">',
				'<div class="navShadowLeft-sj"></div>',
				'<ion-scroll direction="x"  has-bouncing="false"  on-scroll="startScroll()" scrollbar-x="false" delegate-handle="tabScroll"   style="width:100%;overflow:auto;">',
				'<div class="row">',
				'<div  class="col col-25"  ng-repeat="item in conf" ng-style="item.isSelect?{\'color\': selectColor}:{\'color\':unSelectColor}"  style="text-align: center;"',
				'ng-click="gomsg(item,$index,$event);">{{::item.name}}',
				'</div>',
				'</div>',
				'</ion-scroll>',
				'<div class="navShadowRight-sj"></div>',
				'</ion-header-bar>'
			].join(' '),
			replace: true,
			link: function(scope, ele, attrs, ctrl) {
				scope.ScreeWidth = $window.screen.availWidth;
				scope.selectColor = attrs.selectColor ? attrs.selectColor : '#338ec2';
				scope.unSelectColor = attrs.unSelectColor ? attrs.unSelectColor : '#969696';
				/*查询到第一个选中的状态*/
				var sel_result = scope.conf.find(function(item) {
					return item.isSelect;
				})
				scope.gomsg = function(item, index, event) {
					if(item.isSelect) {
						return;
					} else {
						sel_result.isSelect = false;
						item.isSelect = true;
						sel_result = item;
						var scroll_x = event.clientX;
						if(index == 0) {
							scroll_x = 0;
						} else if(index == 1) {
							scroll_x = -scope.ScreeWidth / 4;
						}
						$ionicScrollDelegate.$getByHandle('tabScroll').scrollTo(scroll_x, 0, [true]);
						console.dir(item)
						if(item.data.length <= 0) {
							console.dir(item.data)
							item.doRefresh();
						}
					}
				}
			}
		}
	}])
	/*处理检索的关键字*/
	.filter('wordPlace', ['$sce', function($sce) {
		return function(input, word) {
			var result = input.replace(word, "<em style='color:#338ec3;'>" + word + "</em>");
			return $sce.trustAsHtml(result);
		};
	}])
	.filter('handleState', function() {
		/**过滤单据的状态
		 * @param {Object} input  需要处理的数据
		 */
		return function(input) {
			if(input == 'NEW') {
				return '新建';
			} else if(input == 'TOCONFIRM') {
				return '待审核';
			} else if(input == 'TONOPASS') {
				return '审核不过';
			} else if(input == 'TOPASS') {
				return '发布';
			} else if(input == 'CLOSE') {
				return '关闭';
			} else if(input == 'CANCEL') {
				return '取消';
			}
		}
	}).filter('timeStamp', function() {
		/**需要处理的时间,返回时间戳
		 * @param {Object} input  需要处理的数据
		 */
		return function(dateTime) {
			if(dateTime != null && typeof(dateTime) != 'undefined' && dateTime != '') {
				var arr = dateTime.split(/[- :]/);
				var date_1 = new Date(arr[0], arr[1] - 1, arr[2], arr[3], arr[4], arr[5]);
				return Date.parse(new Date(date_1));
			} else {
				return '';
			}
		}
	}).filter('handleTime', ['$filter', function($filter) {
		/**需要处理的时间
		 * @param {Object} input  需要处理的数据
		 */
		return function(input, format) {
			format = format ? format : 'yyyy-MM-dd';
			var timeStamp = $filter('timeStamp')(input); //服务器时间
			return $filter('date')(timeStamp, format);
		}
	}])
	/**
	 * 时间处理函数
	 * @by wjb  2017/9/21
	 */
	.factory('timePicker', ['$q', '$filter', function($q, $filter) {
		return {
			/**
			 * 
			 * @param {Object} 需要格式的值
			 */
			getTime: function(format) {
				format = format ? format : 'yyyy-MM-dd';
				var q = $q.defer();
				if(typeof(mapp) != 'undefined') {
					mapp.ui.call({
						'type': 'comm_dateAndTimePicker',
						'data': {
							'title': '选择时间'
						},
					}, function(data) {
						q.resolve($filter('date')(data.match(/\d+/) - 0, format));
					});
				} else {
					q.resolve($filter('date')(new Date().getTime(), format));
					//q.resolve("2017-08-12");
				}
				return q.promise;
			}

		}
	}])
	/**
	 * 本地数据存储
	 * @by wjb  2016/9/22
	 */
	.factory('localUtil', ['$window', '$q', function($window, $q) {
		return {
			//存储单个属性
			set: function(key, value) {
				$window.localStorage[key] = value;
			},
			//读取单个属性
			get: function(key, defaultValue) {
				return $window.localStorage[key] || defaultValue;
			},
			//存储对象，以JSON格式存储
			setObject: function(key, value) {
				$window.localStorage[key] = JSON.stringify(value);
			},
			//读取对象
			getObject: function(key) {
				return JSON.parse($window.localStorage[key] || '{}');
			},
			/*清空localStorage*/
			removeClear: function() {
				$window.localStorage.clear();
			},
			//移除单个属性
			remove: function(key) {
				$window.localStorage.removeItem(key);
			},
			/**
			 * 拨打电话
			 * @param {Object} phone
			 */
			callPhone: function(phone) {
				if(typeof(mapp) != 'undefined') {
					mapp.ui.call({
						'type': 'comm_call',
						'data': {
							'code': phone
						}
					});
				} else {
					$window.location.href = 'tel:' + phone;
				}

			},
			/**
			 * 
			 * @param {Object} phone  手机号码
			 * @param {Object} message 短信内容
			 */
			sendMessage: function(phone, message) {
				if(typeof(mapp) != 'undefined') {
					mapp.ui.call({
						'type': 'comm_sms',
						'data': {
							'code': phone,
							'message': message
						}
					});
				} else {
					$window.location.href = 'sms:' + phone;
				}
			},
			/**
			 * 获取token值
			 */
			getToken: function() {
				var _this = this;
				var q = $q.defer();
				if(typeof(mapp) != 'undefined') {
					mapp.ui.call({
						'type': 'comm_storage',
						'data': {
							'type': 'getUserdefault',
							'key': 'token'
						}
					}, function(data) {
						q.resolve(_this.strToJson(data).value);
					});
				} else {
					q.resolve('this-is-a-token');
				}
				return q.promise;
			},
			/**
			 * 对json字符串的处理
			 * @param {Object} result
			 */
			strToJson: function(result) {
				if(result.indexOf("{") == 0) { //ios返回json以 { 开头，以 } 结尾
					return result;
				}
				if(result.indexOf("\"") != -1) { //android返回json以 "{ 开头，以 }" 结尾
					result = result.substring(result.indexOf("\"") + 1, result.lastIndexOf("\""));
				}
				return JSON.parse(result);
			}
		}
	}]);