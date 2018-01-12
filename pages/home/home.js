// @ts-nocheck

pages({
    data: {
        msg: '这里显示数据'
    },
    methods: {

        showNav: function () {
            origin.showNav();
        },
        getFire: function (res) {

            console.log('index发来的数据：');
            console.log(JSON.stringify(res));
            this.msg = res.msg;
            //返回数据
            push({
                msg: res.msg + '|被home页面处理'
            });

        },
        toIndex: function () {
            origin.showPage("pages/index/index");
        }
    },

})

