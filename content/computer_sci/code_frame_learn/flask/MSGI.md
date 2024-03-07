---
title: Web Server Gateway Interface
tags:
  - flask
  - python
  - web
  - http
date: 2024-03-07
---
# Abstract and Pre-knowledge


> [!note] 
> WSGI 的全程是 **Web Server Gateway Interface**，中文翻译为 **Web 服务器网关接口**。它是一种规范，定义了 Web 服务器和 Python Web 应用程序或框架之间的一种简单而通用的接口。
> 
> WSGI 规范的目的是使 Python Web 开发人员能够编写可移植和可扩展的 Web 应用程序。WSGI 应用程序可以与任何兼容 WSGI 的 Web 服务器一起使用，而无需进行任何修改。 


[HTTP Brief Introduction](computer_sci/web/http/http_introduction.md)

# What's Web application

1. 浏览器发送一个HTTP请求；
    
2. 服务器收到请求，生成一个HTML文档；
    
3. 服务器把HTML文档作为HTTP响应的Body发送给浏览器；
    
4. 浏览器收到HTTP响应，从HTTP Body取出HTML文档并显示。

简单的Web应用就是先把HTML用文件保存好，用一个现成的HTTP服务器软件，接收用户请求，从文件中读取HTML，返回。

如果要动态生成HTML，就需要把上述步骤自己来实现。

但是接受HTTP请求、解析HTTP请求、发送HTTP响应这些涉及到HTTP规范的底层代码，正确对待他们的做法是用专门的服务器软件实现，我们使用python专注于生成HTML文档。

这些我们不希望接触到的TCPP连接、HTTP原始请求和响应格式，需要一个统一的接口，让我们专心用python编写web业务。

这个接口就是WSGI：Web Server Gateway Interface。

它是一种规范，定义了 Web 服务器和 Python Web 应用程序或框架之间的一种简单而通用的接口。

Example:

```python
def application(environ, start_response):
    start_response('200 OK', [('Content-Type', 'text/html')])
    return [b'<h1>Hello, web!</h1>']
```

**WSGI接口要求Web开发者实现一个函数**，就可以响应HTTP请求。

这个函数接收两个参数：

* environ：一个包含所有HTTP请求信息的`dict`对象；
* start_response：一个发送HTTP响应的函数。


# Reference

* https://www.liaoxuefeng.com/wiki/1016959663602400/1017805733037760

