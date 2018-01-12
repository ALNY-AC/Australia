
# 监听其他页面触发本页面事件，并处理请求

## 创建可供其他页面调用的事件函数 
在`pages()`函数中声明：
````javascript

pages({

    /**
     * 在 methods 中声明的函数都可以被触发
    */
    methods:{

        getInfo:function(data,pagesId){

            var info={
                name:'name'
            }
            push(info);//返回数据到触发本页面事件的页面

        }
    }

})

````

## 创建事件函数 接收 的参数列表

> *参数一* `JSON` `data`：从另一个页面发送来的JSON数据。
> *参数二* `string` `pagesId`：触发本页面的另一个页面的id。


## 返回数据给调用页面

调用格式：
`push()`
示例：
````javascript
var info={
name:'  name'
}
push(info);//返回数据到调用页面
````

### 参数列表

> *参数一* `JSON` `data`：想要返回的json数据。

