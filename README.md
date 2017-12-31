# familyTree
族谱app功能包含（成员的录入，族谱的介绍，家谱亲系图，族谱联系人，电子墓园）等五大部分构成，功能待完善中,项目基于ionic1.x版本进行开发。

###族谱APP
#####简介

  现在的年轻人对于家族的概念越来越淡薄,然而族谱app的诞生让人们能够很好的查看、咨询自己的家族史，让年轻人加深对自己家族的概念。趁项目空档期有部分时间可以前期实现一个小小的族谱app，项目的整个架构基于ionic框架的基础之上进行开发。
  
#####效果图

![pic_1.gif](http://upload-images.jianshu.io/upload_images/7086971-52f906de87ae381f.gif?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)


####实现过程
1.族谱app功能包含（成员的录入，族谱的介绍，家谱亲系图，族谱联系人，电子墓园）等五大部分构成，项目基于当前最流行的ionic框架进行开发，使用的技术点如下：

1.利用sass对css进行预编译，方便样式的管理及维护.

2.懒加载

懒加载问题，我看到ionic有组件支持，但是不是很完善，可以使用下面的库

[点击打开](https://github.com/tjoskar/ng-lazyload-image)

3.请求网络

```js
/**
 * @desc 公司信息化app接口调用的所有请求入口 
 *(封装了app端调用后端请求的入口，并对对请求权限进行拦截处理)
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
```
4.全局常量处理

```js
 /**
  * @desc 族谱app常量设置，及api接口
  * @by weijb
  * 2017/9/11
  */
 var domin = 'http://192.168.1.137:7001/xxx/api/',
 	/*请求的前缀 域名+项目名*/
 	isDebug = true,
 	/*是否调试模式*/
 	app = angular.module('starter', ['ionic', 'ngResource', 'oc.lazyLoad']);
 /*存放api数据集的全局变量*/
 app.constant('api', isDebug ? {

 } : {

 });
```

### 使用

##### [](https://github.com/dicallc/ionic3_angular4_JD#1cnpm-install%E6%88%96%E8%80%85%E4%BD%BF%E7%94%A8npm-install)1.cnpm install或者使用npm install

##### [](https://github.com/dicallc/ionic3_angular4_JD#2ionic-serve)2.ionic serve

##### [](https://github.com/dicallc/ionic3_angular4_JD#3%E6%9C%89%E9%9C%80%E8%A6%81%E4%BD%BF%E7%94%A8androidios%E5%B9%B3%E5%8F%B0)3有需要使用android/ios平台

```
   ionic platform add ios/android

```

##### [](https://github.com/dicallc/ionic3_angular4_JD#4%E8%BF%90%E8%A1%8Candroidios%E5%B9%B3%E5%8F%B0)4运行android/ios平台####

```
ionic run android/ios
```
#### 7.源码查看

[点击打开代码地址](https://github.com/771534408/familyTree)

结语：
1.由于时间有限，并没有对此项目投入很多的精力，如果后续又充足的时间在来完善此项目。
最后，如果这个项目能帮到你，动动你的鼠标去github上帮我点一下start呗
[github地址](https://github.com/771534408/familyTree)
