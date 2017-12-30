 /**
  * @desc 族谱app常量设置，及api接口
  * @by weijb
  * 2017/9/11
  */
 var domin = 'http://192.168.1.137:7001/srm-app-web/',
 	/*请求的前缀 域名+项目名*/
 	isDebug = true,
 	/*是否调试模式*/
 	app = angular.module('starter', ['ionic', 'ngResource', 'oc.lazyLoad']);
 /*存放api数据集的全局变量*/
 app.constant('api', isDebug ? {

 } : {

 });