
// @ts-nocheck


pages({

    debug: [
        { title: '添加一个待支付订单(本地视图)', event: 'addOrder(1)' },
        { title: '添加一个已出库订单(本地视图)', event: 'addOrder(2)' },
        { title: '添加一个随机订单(本地视图)', event: 'addOrder()' },
        { title: '添加订单(跳转页面)', event: 'toAddOrder()' },
        { title: '设置当前列表编辑状态', event: 'editList[activeIndex].isShow=!editList[activeIndex].isShow' },
        { title: '打开导航栏', event: 'showNav()' },
    ],

    data: {
        navList: [
            { title: '全部' },
            { title: '待支付' },
            { title: '已出库' },
            { title: '已完成' },
            { title: '异常订单' },
            { title: '预订单' },
        ],
        orderList: [],
        stateList: {
            1: '<span class="state label label-red">待支付<span/>',
            2: '<span class="state label label-blue">已出库<span/>',
            3: '<span class="state label label-gray">申请理赔<span/>',
            4: '<span class="state label label-blue">异常订单<span/>',
            5: '<span class="state label label-blue">预订单<span/>',
        },
        bottomModel: 0,
        groupBottom: '0',
        editList: [],
        activeIndex: 1
    },
    methods: {
        showNav: function () {
            origin.showNav();
        },
        onLoadPage: function () {

            this.initStateList();
            this.initOrderList();
            this.setBottomModel(this.activeIndex);


        },
        initStateList: function () {

        },
        isEdit: function () {

        },
        /**
         * 更新订单数组
         */
        initOrderList: function () {
            var _this = this;

            var allItem = [];

            var list = [];
            var editList = [];
            for (var i = 1; i < this.navList.length; i++) {

                var item = [];

                for (var j = 0; j < 3; j++) {

                    var c = {
                        title: '张三' + (i) + ' - ' + (j + 1),
                        state: i,
                        isActive: false,
                    }

                    item[j] = c;
                    allItem.push(c);

                }
                list[i] = item;
                editList[i] = {
                    isEdit: false,
                    isShow: i == 1
                }
            }

            list[0] = allItem;

            this.orderList = [];
            this.orderList = list;
            this.editList = [];
            this.editList = editList;


            this.$nextTick(function () {
                //mui初始化
                //阻尼系数  
                var deceleration = mui.os.ios ? 0.003 : 0.0009;
                mui('.mui-scroll-wrapper').scroll({
                    bounce: true,
                    indicators: true, //是否显示滚动条
                    deceleration: deceleration
                });


                var slider = mui("#slider").slider();

                document.getElementById('slider').addEventListener('slide', function (e) {
                    _this.setBottomModel(e.detail.slideNumber);
                    _this.activeIndex = e.detail.slideNumber;
                })


            })

        },
        addOrder: function (order) {
            var state;
            var _state = 0;
            while (_state == 0 || (this.orderList[_state] == null)) {
                _state = Math.ceil(Math.random() * 10);
            }

            if (order == null) {
                order = {
                    title: '随机添加的测试订单',
                    state: _state,
                    isActive: false,
                }
            }

            if (typeof (order) == 'number') {
                order = {
                    title: '添加的测试订单-' + order,
                    state: order,
                    isActive: false,
                }
            }

            state = order.state;
            this.orderList[state].push(order);
            mui.toast('添加成功：' + state);

        },
        toAddOrder: function () {
            origin.showPage('pages/order/order');
        },
        getStateLabel: function (item, index) {

            if (item.state == null) {
                console.log(
                    item
                );
            }

            var state = item.state;

            if (this.stateList[state] != null) {
                state = this.stateList[state];
            } else {
                console.error('没有相关state!请检查！state值为：' + item.state);
            }

            return state;
        },
        open: function (item, index) {
            //触发事件，需要判断类型，根据类型选择相应的操作
            console.log(item);
            origin.showPage('pages/orderInfo/orderInfo');

        },
        setBottomModel: function (type) {


            switch (type) {
                case 1:
                    this.groupBottom = '52px'
                case 1:
                    this.groupBottom = '52px'
                    break;
                default:
                    this.groupBottom = '0'
                    break;
            }


            this.bottomModel = type;

        },
        selectAll: function (list, is) {
            for (var i = 0; i < list.length; i++) {
                list[i].isActive = is;
            }
        },
        check: function (item, index) {
            if (item != null) {
                item.isActive = !item.isActive;
            }
        },
        /**
         * 去支付
         */
        goToPay: function () {
            var list = this.orderList[this.bottomModel];


            var arr = [];

            for (var i = 0; i < list.length; i++) {
                var item = list[i];
                if (item.isActive) {
                    arr.push(item);
                }
            }

            if (arr.length > 0) {
                mui.toast(`选择了：${arr.length}件商品`);
            } else {
                mui.toast('未选择商品');
            }


        }
    }
})





