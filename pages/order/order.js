// @ts-nocheck
pages({
    debug: [
        { title: '模拟普通订单', event: 'setOrderType(1)' },
        { title: '模拟预订单', event: 'setOrderType(2)' },
        { title: '模拟周期订单', event: 'setOrderType(3)' },
        { title: '模拟编辑模式', event: 'setEditModel()' },
        { title: '模拟订单追踪', event: 'toOrderInfo()' },
        { title: '模拟订单查询', event: 'toOrderQuery()' },
        { title: '打开导航栏', event: 'showNav()' },
    ]
    ,
    data: {
        orderList: [

        ],
        checkList: [],
        isShowDepot: false,//显示仓库
        isShowAddressee: true,//显示联系人选择
        addressee: '',
        addresseeList: [
            { name: '张三1' },
            { name: '李四1' },
            { name: '王五2' },
            { name: '孙六2' },
        ],
        isShowPeopleList: false,//显示联系人列表
        isShowOrderList: true,//显示订单列表（商品列表）
        isSHowCycle: false,//显示周期选择
        startTime: { text: '', y: '', m: '', d: '' },
        endTime: { text: '', y: '', m: '', d: '' },
        cycleTime: { text: '', value: '' },
        isEditModel: false,
        orderType: 1,
    },
    methods: {
        showNav: function (params) {
            origin.showNav();
        },
        onLoadPlus: function () { },
        onLoadPage: function () {
            // "titleText": "添加订单",
            //初始化插件


            var _this = this;
            this.$nextTick(function () {

                this.picker = new mui.PopPicker();//选择器插件
                this.dtPicker = new mui.DtPicker({ type: 'date' });//日期选择器插件
                this.cyclePicker = new mui.PopPicker();//周期选择器插件
                this.cyclePicker.setData([
                    { text: '一周一次', value: '1' },
                    { text: '一周两次', value: '2' },
                    { text: '一周三次', value: '3' }
                ])


            });


            this.setGoodsList(null, false);

            //设置开始日期
            this.startTime = { text: '2018/01/01', y: '', m: '', d: '' };
            //设置结束日期
            this.endTime = { text: '2018/01/01', y: '', m: '', d: '' };
            //设置周期日期
            this.cycleTime = { text: '一周一次', value: '' };

            /**     
             * 普通订单：1
             * 预订单：2
             * 周期订单：3
             * 编辑订单模式：4
             * 
             */
            this.setOrderType(1);
            // this.setEditModel(); 

        },
        setGoodsList: function (goodsList, isCheck) {

            this.orderList = [];//订单列表数据

            if (goodsList == null) {
                goodsList = [
                    { title: 'a', id: '123', num: 1, type: {} },
                    { title: 'b', id: '456', num: 2, type: {} },
                    { title: 'c', id: '789', num: 19, type: { text: '型号a', value: 1 } },
                    { title: 'c', id: '789', num: 19, type: { text: '型号a', value: 1 } },
                    { title: 'c', id: '789', num: 19, type: { text: '型号a', value: 1 } },
                    { title: 'c', id: '789', num: 19, type: { text: '型号a', value: 1 } },
                    { title: 'c', id: '789', num: 19, type: { text: '型号a', value: 1 } },
                    { title: 'c', id: '789', num: 19, type: { text: '型号a', value: 1 } },
                    { title: 'c', id: '789', num: 19, type: { text: '型号a', value: 1 } },
                    { title: 'c', id: '789', num: 19, type: { text: '型号a', value: 1 } },
                ]
            }
            //初始化数据

            //初始化选择
            for (var i = 0; i < goodsList.length; i++) {
                goodsList[i].isCheck = isCheck;
            }
            //设置订单数据
            this.orderList = goodsList;

        },
        showOrderModel: function (item, index) {

            var list = [{ text: item.title, value: index }];

            for (var i = 0; i < 20; i++) {
                list.push({ text: '型号' + i, value: i });
            }
            this.picker.setData(list);

            this.picker.show(function (selectItems) {
                mui.toast('选择了：' + selectItems[0].text + '：' + selectItems[0].value);
                item.type = {};
                item.type = selectItems[0];

            });

        },
        orderAdd: function (item, index) {
            item.num++;
        },
        orderRemove: function (item, index) {
            item.num--;
            if (item.num <= 0) {
                mui.confirm('确定要删除吗？', '提示', ['确定', '取消'], function (btn) {
                    if (btn.index == 0) {
                        mui.toast('确定删除');
                        // 删除逻辑
                    } else {
                        mui.toast('取消删除');
                    }
                });
                item.num = 1;
            }
        },
        getList: function () {
            var list = this.orderList;
            var arr = [];

            for (var i = 0; i < list.length; i++) {
                if (list[i].isCheck) {
                    arr.push(list[i]);
                }
            }
            this.checkList = arr;

            return this.checkList;
        },
        //保存订单
        saveOrder: function (payment) {


            var list = this.getList();

            if (list.length <= 0) {
                // mui.alert('未选择任何商品', '提示', '确定');
                mui.toast('未选择任何商品');
            } else {

                /** 
                 * 普通订单：1
                 * 预订单：2
                 * 周期订单：3
                 * 
                */
                var orderType;

                //判断是预订单还是普通订单  
                if (this.isShowDepot) {
                    //普通订单
                    mui.toast('创建普通订单');
                    orderType = 1;
                }
                if (!this.isShowDepot && !this.isSHowCycle) {
                    //预订单
                    mui.toast('创建预订单');
                    orderType = 2;
                }

                if (this.isSHowCycle) {
                    //周期订单
                    mui.toast('创建周期订单');
                    orderType = 3;
                }

                //无论咋样，都得保存并添加新订单，只不过点击了订单支付按钮，会继续执行订单支付
                //保存并创建新订单
                this.addOrder(list, orderType, function () {
                    //创建完订单的回调

                    if (payment) {
                        //如果支付参数等于true，就触发支付事件
                        mui.toast('保存成功~');
                    } else {

                        mui.alert('保存成功！', ' ', 'ok');
                    }

                });
            }

        },
        addOrder: function (orderList, orderType, f) {

            // if (orderType == 1) {
            //     //普通订单
            //     mui.toast('创建普通订单');
            // }
            // if (orderType == 2) {
            //     //预订单
            //     mui.toast('创建预订单');

            // }
            // if (orderType == 3) {
            //     //周期订单  
            //     mui.toast('创建周期订单');

            // }
            //判断是不是保存订单而不是新建订单
            if (this.isEditModel) {
                //是仅仅保存订单

                //在此触发保存功能
                mui.toast('保存成功~');

            } else {
                //不是仅仅保存订单，还需要继续操作
                f();
            }

            /**
             * 此处两种方式
             * 直接ajax发送到服务器
             * 或
             * 触发另一个页面的事件，让另一个页面ajax。
             */

            return;
            //添加新订单
            origin.fire('pages/home/home:addOrder', {
                orderList: orderList,
                orderType: orderType
            }, function (res) {
                if (f) f(res);
            });


        },
        //设置仓库
        setDepot: function (params) {

        },
        check: function (item, index, event) {
            item.isCheck = !item.isCheck;
        },
        /**
         * 搜索联系人
         */
        searchAddressee: function () {

            this.isShowOrderList = false;
            this.isShowPeopleList = true;

            var key = this.addressee;
            if (key == null || key.length <= 0) {
                //没有key，不用搜索
                this.isShowOrderList = true;
                this.isShowPeopleList = false;
                return;
            }

            //直接从联系人页面和自己的收货地址页面取出信息，不从服务器走

            //通过fire事件向两个页面请求联系人列表
            var addresseeList = [
                {
                    name: '张三1',
                    phone: '110-120-12138',
                    address: ''
                },
                {
                    name: '李四1',
                    phone: '110-120-12138'
                },
                {
                    name: '王五2',
                    phone: '110-120-12138'
                },
                {
                    name: '孙六2',
                    phone: '110-120-12138'
                },
            ]

            var _addresseeList = [];

            for (var i = 0; i < addresseeList.length; i++) {
                var item = addresseeList[i];
                var index = item.name.indexOf(key);

                if (index >= 0) {
                    //名字存在
                    _addresseeList.push(item);
                }

            }

            this.addresseeList = _addresseeList;

            for (let i = 0; i < this.addresseeList.length; i++) {
                const element = this.addresseeList[i];
            }



        },
        //选择收货人
        setAddressee: function (item, index) {

            this.isShowOrderList = true;
            this.isShowPeopleList = true;
            this.addresseeList = [];
            this.addresseeList.push(item);

        },
        /**
         * 新建联系人
         */
        addAddressee: function (type) {

            if (type == 0) {
                // 让用户选择想要新建的类型
                mui('#addAddressee').popover('show');
                return;
            }

            if (type == 1) {
                //跳转新增收货地址
                mui.toast('跳转新增收货地址');

            }
            if (type == 2) {
                //跳转新增代理商
                mui.toast('跳转新增代理商');
            }
            mui('#addAddressee').popover('hide');

        },
        /**
         * 设置周期开始时间 
         */

        setStartTime: function () {
            var _this = this;
            this.setTime(function (time) {
                _this.startTime = time;
            });
        },
        /**
         * 设置周期结束时间
         */
        setEndTime: function () {
            var _this = this;
            this.setTime(function (time) {
                _this.endTime = time;
            });
        },
        /**
         * 设置配送时间（配送周期）
         */
        setCycleTime: function () {
            var _this = this;
            this.cyclePicker.show(function (data) {
                _this.cycleTime = data[0];
            });
        },
        setTime: function (fun) {
            // setTime
            this.dtPicker.show(function (items) {
                var time;
                time = {
                    text: '',
                    y: '',
                    m: '',
                    d: ''
                }
                time.y = items.y.value;//年
                time.m = items.m.value;//月
                time.d = items.d.value;//日S

                time.text = time.y + '/' + time.m + '/' + time.d;

                fun(time);
            });
        },
        /**
         * 设置订单模式
         */
        setOrderType: function (orderType) {

            this.orderType = orderType;
            /**     
             * 普通订单：1
             * 预订单：2
             * 周期订单：3
             * 编辑订单模式：4
             * 
            */
            this.isShowDepot = false;
            this.isSHowCycle = false;
            this.isShowAddressee = false;
            this.isEditModel = false;
            this.isShowPeopleList = false;
            this.addresseeList = [];

            switch (orderType) {
                case 1:
                    // 普通订单：1
                    this.isShowDepot = true;
                    this.isShowAddressee = true;
                    mui.toast('普通订单：1');
                    origin.setTitle('创建订单');
                    break;
                case 2:
                    // 预订单：2
                    this.isShowDepot = false;
                    this.isSHowCycle = false;
                    this.isShowAddressee = false;
                    this.isShowPeopleList = false;
                    mui.toast('预订单：2');
                    origin.setTitle('创建预订单');
                    break;
                case 3:
                    // 周期订单：3
                    this.isShowDepot = false;
                    this.isSHowCycle = true;
                    this.isShowAddressee = true;
                    mui.toast('周期订单：3');
                    origin.setTitle('创建周期订单');
                    break;
                default:
                    break;
            }
            this.setGoodsList(null, false);
        },
        setEditModel: function (res) {
            //设置订单编辑模式

            if (res == null) {
                res = {
                    type: 1,
                    people: {
                        name: '编辑模式 张三'
                    },
                    order: {
                        goodsList: [
                            { title: '商品1', id: '123', num: 1, type: { text: '型号1', value: '1' } },
                            { title: '商品2', id: '123', num: 2, type: {} },
                            { title: '商品3', id: '123', num: 1, type: '型号1' },
                        ]
                    }

                };
            }

            //设置默认模式
            this.setOrderType(res.type);
            //设置标题
            origin.setTitle('编辑订单');
            //初始化收货地址
            this.addresseeList = []
            //显示收货地址
            this.isShowPeopleList = true;
            this.addresseeList.push(res.people);
            //设置编辑模式
            this.isEditModel = true;

            //设置商品
            var list = res.order.goodsList;
            for (var i = 0; i < list.length; i++) {
                list[i].isCheck = true;
            }
            this.setGoodsList(list, true);

        },
        toOrderInfo: function () {
            origin.showPage('pages/orderInfo/orderInfo');
        },
        toOrderQuery: function (params) {
            origin.showPage('pages/orderQuery/orderQuery');
        }
    },
    watch: {
        addressee: function (v) {
            this.searchAddressee();
        }
    }
})
// linear-gradient(to right, #4684a8, #5cb4c4)  