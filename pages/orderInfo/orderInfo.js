// @ts-nocheck
pages({
    data: {
        /**编辑按钮 */
        isShowFixedBtn: true,
        /**物流信息 */
        isShowLogistics: false,
        model: 1,
        orderList: [],
        logistics: {
            state: 4,
            info: [
                { text: '', time: '' },
                { text: '', time: '' },
                { text: '', time: '' },
                { text: '', time: '' },
                { text: '', time: '' },
                { text: '', time: '' },
                { text: '', time: '' },
                { text: '', time: '' },
                { text: '', time: '' },
                { text: '', time: '' },
                { text: '', time: '' },
            ]
        }
    },
    methods: {
        showNav: function (params) {
            origin.showNav();
        },

        /**
         * 初始化
         */
        onLoadPage: function () {
            this.buliderOrder();
            this.setModel(1);
        },
        /**
         * 构建表单列表
         */
        buliderOrder: function () {

            var orderList = [
                { title: '纯净水', type: '2L', money: '30' },
                { title: '纯净水', type: '2L', money: '30' },
                { title: '纯净水', type: '2L', money: '30' },
                { title: '纯净水', type: '2L', money: '30' },
                { title: '纯净水', type: '2L', money: '30' },

            ];

            for (var i = 0; i < orderList.length; i++) {
                var item = orderList[i];
                item.title = item.title;
                item.type = i + 'L';
            }
            this.orderList = orderList;

        },
        /**
         * 设置模式
         */
        setModel: function (model) {

            switch (model) {
                case 1:
                    //未付款
                    this.isShowFixedBtn = true;
                    this.isShowLogistics = false;
                    break;
                case 2:
                    //已付款
                    this.isShowFixedBtn = false;
                    this.isShowLogistics = true;
                    break;
                default:
                    break;
            }
            this.model = model;
        },
        editOrder: function () {

            origin.showPage('pages/order/order');

        }
    }
});
