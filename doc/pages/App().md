
# 全局配置函数：App()  

使用格式：

`App(JSON)`

````javaScript

App({
    onLaunch:function(){}
})

````

## App() 参数列表

````javaScript

{   
    /**
     * 启动函数
     * 全局只调用一次
    */
    onLaunch:function(){},
    
    /**
     * app参数，全局变量，可以存放登录状态等数据。
    */
    app:{}


}

````