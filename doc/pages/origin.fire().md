
# 触发另外一个窗口事件：origin.fire()

## 模式一：id中不带函数名

> 调用方式：
> `origin.fire( 窗口id , 想要触发的函数名 , 想要传递的参数 , 回调函数 )`

示例：

````javaScript
origin.fire( 'pages/index/index' , 'getInfo' , {id:1} , function(res){});

````

### origin.fire() 模式一 参数列表

> *参数一* `string` `窗口id`：目标页面的id。 
> *参数二* `string` `函数名`：目标页面的函数名，即在`pages()`函数中声明的函数 。
> *参数三* `json` `想要传递的数据`：想要发送到另一个页面的数据。 
> *参数四* `function` `回调函数`：回调函数。另一个页面处理完毕后会从这里返回数据。 


## 模式二：id中带有函数名
> 调用方式：
> `origin.fire( 窗口id:函数名 , 想要传递的参数 , 回调函数 )`

示例：

````javaScript
origin.fire( 'pages/index/index:getInfo' ,  {id:1} , function(res){});
````
### origin.fire() 模式二 参数列表

> *参数一* `string` `窗口id`：目标页面的id和函数名，id和函数名之间使用英文符的':'冒号分割。 
> *参数二* `json` `想要传递的数据`：想要发送到另一个页面的数据。 
> *参数三* `function` `回调函数`：回调函数。另一个页面处理完毕后会从这里返回数据。 
