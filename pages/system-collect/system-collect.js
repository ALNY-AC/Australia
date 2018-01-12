pages({
	/**
	 * 数据容器
	 */
	data: {
		collectList: [{
			id: '0',
			title: '1a',
			info: '9993333333333322222222222222222222222222222222222222222222222333333333333333',
			headImg: '',
		}, {
			id: '1',
			title: '2b',
			info: '99933333333333333333333333333',
			headImg: '',
		}, {
			id: '2',
			title: '3c',
			info: '99933333333333333333333333333',
			headImg: '',
		}, {
			id: '3',
			title: '4d',
			info: '99933333333333333333333333333',
			headImg: '',
		}, ]
	},

	/*** 函数容器，
	*
	在这里声明的函数可以直接使用 origin.fire() 触发
    */
	methods: {

		showNav: function() {
			origin.showNav();
		},

		//		点击每个	
		goInfo: function(item, index) {
			console.log(item, index);
		},
		//		删除
		del: function(item, index) {
			var _this = this;
			mui.confirm('是否删除', '提示', ['否', '是'], function(e) {
				if(e.index == 1) {
					var list = _this.collectList;
					list.splice(index, 1);
					mui.toast("删除成功");
				}

			});
		},
		add: function(res) {
			if(res == null) {
				res = {
					title: '2b',
					info: '99933333333333333333333333333',
					headImg: '',
				}
			}
			//			ajax请求
			this.collectList.push(res);
		}
	}
})