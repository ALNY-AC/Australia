// @ts-nocheck
//app.js
App({
    /**
     * 启动函数
     * 全局加载一次
     */
    onLaunch: function (config) {

        this.app.msg = '消息';

        origin.setLocal('test', {
            id: 1
        });
        setTimeout(function () {
            origin.showPage('pages/orderQuery/orderQuery');
        }, 1000);

    },
    app: {}
})