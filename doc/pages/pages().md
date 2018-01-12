
# 全局配置函数：pages()  

使用格式：

`pages(JSON)`

````javaScript
pages({
    data:{},
    methods:{}
})

````

## App() 参数列表

````javaScript
var conf={   
    /**
     * 数据容器
    */
    data:{
        msg:'msg'
    },

    /**
     * 函数容器，
     * 在这里声明的函数可以直接使用 origin.fire() 触发
    */
    methods:{
        /**
         * Plus加载完成函数。
         * Plus加载完成后调用，当前页面只调用一次。
         * 
        */
      onLoadPlus:function(){},

      /**
         * vue加载完成函数。
         * vue加载完成后调用，当前页面只调用一次。
         * 
        */
      onLoadPage:function(){},
        /**
         * 页面显示函数。
         * 每次页面显示的时候调用。
        */
      onShow:function(){},

        /**         
         * 页面隐藏函数。
         * 每次页面隐藏的时候调用。
        */
      onHide:function(){},
    }

};
pages(conf);

````