
// @ts-nocheck

function getNavList() {
    var navList = [
        {
            title: '配置函数 ',
            isHead: true
        },
        {
            title: '全局配置函数：App()',
            url: 'App().md',
        }, {
            title: '页面配置函数：pages()',
            url: 'pages().md',
        },
        {
            title: '窗口事件处理',
            isHead: true
        },
        {
            title: '触发另外一个窗口事件：origin.fire()',
            url: 'origin.fire().md'
        },
        {
            title: '监听其他页面触发本页面事件并处理',
            url: 'origin.push().md',
        },
    ];

    for (let i = 0; i < 30; i++) {

        navList.push({
            title: i % 5 == 0 ? `栏目标题` : `栏目${i}`,
            url: 'App().md',
            isHead: i % 5 == 0,
        });

    }

    return navList;

}
var docApp = new Vue({
    el: '#docApp',
    data: {
        content: '',
        search: '',
        navList: []

    },
    methods: {
        init: function () {
            var _this = this;
            var list = getNavList();

            for (let i = 0; i < list.length; i++) {
                const item = list[i];
                item.isShow = true;
                item.isActive = false;
                item._title = item.title;
            }

            this.navList = list;

        },
        show: function (item, index) {

            if (item.isHead) {
                return;
            }

            var _this = this;
            localStorage.showId = index;

            for (let i = 0; i < this.navList.length; i++) {
                this.navList[i].isActive = false;
            }

            item.isActive = true;

            $('<div/>').load(`pages/${item.url}`, function (content) {

                content = marked(content);
                _this.content = content;

            });

        },

    },
    watch: {
        search: function (str) {

            //判断搜索结果显示类型

            var _str = str.split('@ ');

            var showAll = true;

            if (_str.length > 1) {
                //只显示结果
                str = _str[1];
                showAll = false;

            } else {
                //全部显示
                str = _str[0];
                showAll = true;
            }

            str = $.trim(str);

            //搜索
            for (let i = 0; i < this.navList.length; i++) {

                this.navList[i].isShow = false;
                this.navList[i].isHide = !showAll;

                this.navList[i].title = this.navList[i]._title;
            }


            for (let i = 0; i < this.navList.length; i++) {

                var item = this.navList[i];
                var title = item.title;

                var index = title.indexOf(str);

                if (index >= 0) {


                    if (str.length > 0) {

                        var arr = title.split(str);
                        var newStr = title.substring(index, index + (str.length));
                        newTitle = arr[0] + `<span class='high'>${newStr}</span>` + arr[1];
                        item.title = newTitle;

                    }

                    item.isShow = true;
                    item.isHide = false;

                }

            }


        }
    }
});

hljs.initHighlightingOnLoad();
var rendererMD = new marked.Renderer();
marked.setOptions({
    renderer: rendererMD,
    gfm: true,
    tables: true,
    breaks: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code, lang) {
        return hljs.highlightAuto(code).value;
    }
});



docApp.init();
var index = localStorage.showId ? localStorage.showId : 1;
var item = docApp.navList[index];
docApp.show(item, index);


console.log();
