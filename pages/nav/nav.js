// @ts-nocheck

pages({
    data: {
        items: []
    },
    methods: {
        closePage: function () {
        },

        onLoadPage: function () {
            var _this = this;
            $.getJSON('../../app.json', function (conf) {
                _this.items = conf.nav
            });

        },
        open: function (item) {

            if (window.plus) {
                mui.back();
            }
            setTimeout(function () {
                origin.showPage(item.url);
            }, 100);

        },
        onHide: function () {
            origin.fire(this.id, 'hideNav');
        },
        show: function (res) {
            this.id = res.pageId;
        },
    },

})

