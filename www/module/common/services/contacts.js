/**
 * 价格申请业务处理流程
 * @by ysj
 */
app.factory('contactsService', ['$q', '$timeout', 'api', 'appService', 'loading', function($q, $timeout, api, appService, loading) {
	return {
		getModleTabs: function() {
			var this_ = this;
			var tabMenus = [{
				moredata: false,
				isContent: true,
				isSelect: true,
				name: '全部',
				reqParams: {
					pageNo: 0
				},
				loadMore: function(infiniteScroll) {
					this_.loadMore(this, infiniteScroll);
				},
				doRefresh: function(refresher) {
					this_.doRefresh(this, refresher);
				},
				data: []
			}, {
				moredata: false,
				isSelect: false,
				isContent: true,
				name: '90-00后',
				reqParams: {
					pageNo: 0,
				},
				loadMore: function(infiniteScroll) {
					this_.loadMore(this, infiniteScroll);
				},
				doRefresh: function(refresher) {
					this_.doRefresh(this, refresher);
				},
				data: []
			}, {
				moredata: false,
				isSelect: false,
				isContent: true,
				name: '80-90后',
				reqParams: {
					
				},
				loadMore: function(infiniteScroll) {
					this_.loadMore(this, infiniteScroll);
				},
				doRefresh: function(refresher) {
					this_.doRefresh(this, refresher);
				},
				data: []
			}, {
				moredata: false,
				isSelect: false,
				isContent: true,
				name: '70-80后',
				reqParams: {
					
				},
				loadMore: function(infiniteScroll) {
					this_.loadMore(this, infiniteScroll);
				},
				doRefresh: function(refresher) {
					this_.doRefresh(this, refresher);
				},
				data: []
			}, {
				moredata: false,
				isSelect: false,
				isContent: true,
				name: '60-70后',
				reqParams: {
					
				},
				loadMore: function(infiniteScroll) {
					this_.loadMore(this, infiniteScroll);
				},
				doRefresh: function(refresher) {
					this_.doRefresh(this, refresher);
				},
				data: []
			}].map(function(item) {
				item.reqParams.pageNo =0;
				item.reqParams.pageSize =10;
				item.callback = function() {};
				return item;
			});
			return tabMenus;
		},
		/**
		 *通讯录一数据刷新
		 * @param c:每个tab的数据元
		 */
		doRefresh(c, refresher) {
			c.reqParams.pageNo = 0;
			appService(c.name=='全部'?'data/contatcts.json':'data/contatcts_1.json').get({}, function(res) {
				c.data = res.contacts;
				if(refresher) {

				}
				c.callback(false);
			}, function(err) {

			})
		},
		/**
		 *通讯录一数据加载 
		 * @param c:每个tab的数据元
		 */
		loadMore(c, infiniteScroll) {
			appService('data/contatcts.json').get({}, function(res) {
				c.data =c.data.concat(res.contacts);
				if(infiniteScroll) {
                    
				}
				if(c.reqParams.pageSize>res.contacts.length){
					c.moredata = true;
				}
				c.callback(true);
			}, function(err) {

			})

		}
	}
}]);