---
title: HTTP Brief Introduction
tags:
  - web
  - http
date: 2024-03-07
---
HTTP是在网络上传输HTML的协议，用于浏览器和服务器的通信。

## Learn HTTP by devTool

![](computer_sci/web/http/attachments/Pasted%20image%2020240307164822.png)

* `Elements`显示网页的结构
* `Network`显示浏览器和服务器的通信
* `Console` 用于debug的控制台，debug JS的运行

![](computer_sci/web/http/attachments/Pasted%20image%2020240308153643.png)


可以看出来，浏览器发送给谷歌服务器`GET`的请求。

`GET`表示一个读取请求，将从服务器获得网页数据，`/`表示URL的路径，URL总是以`/`开头，`/`就表示首页


HTTP响应分为Header和Body两部分（Body是可选项），我们在`Network`中看到的Header最重要的几行如下：

```
200 OK
```

`200`表示一个成功的响应，后面的`OK`是说明。失败的响应有`404 Not Found`：网页不存在，`500 Internal Server Error`：服务器内部出错，等等。

```
Content-Type: text/html
```

`Content-Type`指示响应的内容，这里是`text/html`表示HTML网页。请注意，浏览器就是依靠`Content-Type`来判断响应的内容是网页还是图片，是视频还是音乐。浏览器并不靠URL来判断响应的内容，所以，即使URL是`http://example.com/abc.jpg`，它也不一定就是图片。

HTTP响应的**Body就是HTML源码**

HTTP请求的流程：

> [!abstract] 
> 步骤1：浏览器首先向服务器发送HTTP请求，请求包括：
> 
> 方法：`GET`还是`POST`，`GET`仅请求资源，`POST`会附带用户数据；
> 
> 路径：`/full/url/path`；
> 
> 域名：由Host头指定：`Host: www.sina.com.cn`
> 
> 以及其他相关的Header；
> 
> 如果是POST，那么请求还包括一个Body，包含用户数据。 


> [!abstract] 
> 步骤2：服务器向浏览器返回HTTP响应，响应包括：
> 
> 响应代码：`200`表示成功，`3xx`表示重定向，`4xx`表示客户端发送的请求有错误，`5xx`表示服务器端处理时发生了错误；
> 
> 响应类型：由`Content-Type`指定，例如：`Content-Type: text/html;charset=utf-8`表示响应类型是HTML文本，并且编码是`UTF-8`，`Content-Type: image/jpeg`表示响应类型是JPEG格式的图片；
> 
> 以及其他相关的Header；
> 
> 通常服务器的HTTP响应会携带内容，也就是有一个Body，包含响应的内容，网页的HTML源码就在Body中。 

> [!abstract] 
> 步骤3：如果浏览器还需要继续向服务器请求其他资源，比如图片，就再次发出HTTP请求，重复步骤1、2。 


Web采用的HTTP协议采用了非常简单的请求-响应模式，从而大大简化了开发。当我们编写一个页面时，我们只需要在HTTP响应中把HTML发送出去，不需要考虑如何附带图片、视频等，浏览器如果需要请求图片和视频，它会发送另一个HTTP请求，因此，一个HTTP请求只处理一个资源。

# Reference


* https://www.liaoxuefeng.com/wiki/1016959663602400/1017804782304672