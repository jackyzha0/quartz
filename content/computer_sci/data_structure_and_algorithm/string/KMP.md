---
title: Knuth–Morris–Pratt algorithm
tags:
  - algorithm
  - string
  - string-search
---

# Abstract

* Class —— String Search
* Data Structure —— String
* Worst-case performance —— $\Theta(m)$ preprocessing + $\Theta(n)$ matching
* Worst-case space complexity —— $\Theta(m)$


# Details

## What's KMP do

KMP是做**字符串匹配**最常用的算法之一。

> [!abstract] 
> 什么是字符串匹配？ 
> 
> 举例来说，有一个字符串"BBC ABCDAB ABCDABCDABDE"，我想知道，里面是否包含另一个字符串"ABCDABD"？


Knuth-Morris-Pratt算法是以三个发明者命名，起头的那个K就是著名科学家Donald Knuth。

## Core

> [!abstract] 
> KMP的算法的核心是利用已知匹配的结果构建**部分匹配表** （Partial Match Table）来进行算法加速

"部分匹配"的实质是，有时候，字符串prefix和suffix会有重复。比如，"ABCDAB"之中有两个"AB"，那么它的"部分匹配值"就是2（"AB"的长度）。**搜索词移动的时候，第一个"AB"向后移动4位（字符串长度-部分匹配值），就可以来到第二个"AB"的位置。**

> [!tip] 
> 以“ABCDABD”为例，
> 
> "A"的前缀和后缀都为空集，共有元素的长度为0；
> 
> "AB"的前缀为[A]，后缀为[B]，共有元素的长度为0；
> 
> "ABC"的前缀为[A, AB]，后缀为[BC, C]，共有元素的长度0；
> 
> "ABCD"的前缀为[A, AB, ABC]，后缀为[BCD, CD, D]，共有元素的长度为0；
> 
> "ABCDA"的前缀为[A, AB, ABC, ABCD]，后缀为[BCDA, CDA, DA, A]，共有元素为"A"，长度为1；
> 
> "ABCDAB"的前缀为[A, AB, ABC, ABCD, ABCDA]，后缀为[BCDAB, CDAB, DAB, AB, B]，共有元素为"AB"，长度为2；
> 
> "ABCDABD"的前缀为[A, AB, ABC, ABCD, ABCDA, ABCDAB]，后缀为[BCDABD, CDABD, DABD, ABD, BD, D]，共有元素的长度为0。
> 


KMP算法在发现不匹配后，移动的位数由**已匹配的字符数**和**对应的部分匹配值**决定

$$
　移动位数 = 已匹配的字符数 - 对应的部分匹配值
$$


# Code

## Partial Match Table

```python
    def partialMatchTable(self, pattern: str) -> list[int]:
        
        table = [0] * len(pattern)
        
        i = 1
        j = 0
        
        while i < len(pattern):
            
            if pattern[i] == pattern[j]:
                table[i] = j + 1
                i += 1
                j += 1
            
            elif j > 0:
                j = table[j - 1]
            
            else:
                i += 1
        
        return table
```

# Reference

* [阮一峰. “字符串匹配的KMP算法.” _字符串匹配的KMP算法_, 23 Jan. 2024, https://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html.  👈 ⭐⭐⭐！](https://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html)
* [_The Knuth-Morris-Pratt Algorithm in My Own Words - jBoxer_. http://jakeboxer.com/blog/2009/12/13/the-knuth-morris-pratt-algorithm-in-my-own-words/. Accessed 23 Jan. 2024.](http://jakeboxer.com/blog/2009/12/13/the-knuth-morris-pratt-algorithm-in-my-own-words/)
