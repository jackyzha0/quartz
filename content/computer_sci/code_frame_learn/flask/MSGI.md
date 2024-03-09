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

在`application()`函数中，调用：

```python
start_response('200 OK', [('Content-Type', 'text/html')])
```

就发送了HTTP响应的Header，注意Header只能发送一次，也就是只能调用一次`start_response()`函数。`start_response()`函数接收两个参数，一个是HTTP响应码，一个是一组`list`表示的HTTP Header，每个Header用一个包含两个`str`的`tuple`表示。

通常情况下，都应该把`Content-Type`头发送给浏览器。其他很多常用的HTTP Header也应该发送。

然后，函数的返回值`b'<h1>Hello, web!</h1>'`将作为HTTP响应的Body发送给浏览器。

有了WSGI，我们关心的就是如何从`environ`这个`dict`对象拿到HTTP请求信息，然后构造HTML，通过`start_response()`发送Header，最后返回Body。

整个`application()`函数本身没有涉及到任何解析HTTP的部分，也就是说，底层代码不需要我们自己编写，我们只负责在更高层次上考虑如何响应请求就可以了。

这个`application()`函数怎么调用？如果我们自己调用，两个参数`environ`和`start_response`我们没法提供，返回的`bytes`也没法发给浏览器。

**所以`application()`函数必须由WSGI服务器来调用**。有很多符合WSGI规范的服务器，我们可以挑选一个来用。但是现在，我们只想尽快测试一下我们编写的`application()`函数真的可以把HTML输出到浏览器，所以，要赶紧找一个最简单的WSGI服务器，把我们的Web应用程序跑起来。


因此我们需要编写以下两个py程序：

```python
# hello.py

def application(environ, start_response):
    start_response('200 OK', [('Content-Type', 'text/html')])
    return [b'<h1>Hello, web!</h1>']
```


```python
# server.py
# 从wsgiref模块导入:
from wsgiref.simple_server import make_server
# 导入我们自己编写的application函数:
from hello import application

# 创建一个服务器，IP地址为空，端口是8000，处理函数是application:
httpd = make_server('', 8000, application)
print('Serving HTTP on port 8000...')
# 开始监听HTTP请求:
httpd.serve_forever()
```

其中，`hello.py`，是实现web应用程序的WSGI处理函数，`server.py`是负责启动WSGI服务器，加载`application()`函数

# Conclusion

无论多么复杂的Web应用程序，入口都是一个WSGI处理函数。HTTP请求的所有输入信息都可以通过`environ`获得，HTTP响应的输出都可以通过`start_response()`加上函数返回值作为Body。

复杂的Web应用程序，光靠一个WSGI函数来处理还是太底层了，我们需要在WSGI之上再抽象出Web框架，进一步简化Web开发。

# Reference

* https://www.liaoxuefeng.com/wiki/1016959663602400/1017805733037760
* https://www.liaoxuefeng.com/wiki/1016959663602400/1017806472608512

