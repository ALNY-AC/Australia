// @ts-nocheck

pages({
    data: {
        pre: '代码',
        userInfo: {}
    },
    methods: {
        openNav: function () {
            console.warn('打开导航栏');
            origin.showNav();
        },
        onLoadPlus: function () {


        },
        getApp: function () {
            var _this = this;
            getApp(function (res) {
                _this.pre = formatJson(res);
            });
        },
        onShow: function () {
            console.log('index页面显示事件');

        },
        onHide: function () {

            console.log('index页面隐藏事件 ');

        },
        loadHome: function () {

            origin.loadPage('pages/home/home', function (res) {

                mui.toast('页面加载完成');

            });


        },
        testFire: function () {
            var _this = this;


            origin.fire('pages/home/home:getFire', {
                msg: 'index页面触发的数据'
            }, function (res) {
                _this.pre = res.msg;
                console.log(res.msg);
                mui.toast(res.msg);

            })



        }
    },

})

