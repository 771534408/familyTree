/**
 * @desc 公司信息化app接口调用的所有请求入口
 * @by wjb
 * 2016/8/12
 */
app.factory('appService', ['$resource', '$cacheFactory', function($resource, $cacheFactory) {
		return function(url, defaultParam) {
			var defaultFunction = {
				query: {
					method: 'GET',
					isArray: true,
					timeout: 10000
				},
				get: {
					method: 'GET',
					isArray: false,
					timeout: 10000
				},
				post: {
					method: 'POST',
					isArray: false,
					timeout: 10000
				},
				update: {
					timeout: 5000,
					method: 'PUT',
					isArray: false
				},
				delete: {
					method: 'DELETE',
					isArray: false,
					timeout: 5000
				}
			};
			/*对请求的相对地址设置添加域名前缀*/
			if(url.indexOf('http://') == -1 && url.indexOf('https://') == -1 && url.indexOf('.json') == -1) {
				url = domin + url;
			}
			var returnRes = $resource(url, defaultParam, defaultFunction);
			return returnRes;
		}
	}])
	/**
	 * @desc 公司信息化app接口用户拦截器的使用
	 * @by wjb 2017/9/18
	 * 
	 */
	.factory('userInterceptor', ['$rootScope', '$q',function($rootScope, $q) {
		return {
			/**
			 * 对请求进行设置
			 * @param {Object} config
			 */
			request: function(config) {
				//config.headers['X-CSRF-TOKEN'] = cfg.token;
				//config.url = config.url +cfg.token;
				return config;
			},
			/**
			 * 响应的处理方案
			 * @param {Object} response
			 */
			response: function(response) {
				// 进行预处理
				if(response.data) {
					if(response.data.success === false) {
						response.status = 500;
						console.log('错误信息: ' + response.data.errormsg);
						response.data = null;
						return $q.reject(response);
						//this.responseError(response);
					} else {
						return response || $q.when(reponse);
					}
				} else {
					return response || $q.when(reponse);
				}
			},
			/**
			 * 响应失败的处理方案
			 * @param {Object} response
			 */
			responseError: function(response) {
				return $q.reject(response);
			}
		};
	}]);