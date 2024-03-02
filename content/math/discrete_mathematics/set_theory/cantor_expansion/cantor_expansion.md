---
title: Cantor expansion
tags:
- code-design
- basic
- math
- algorithm
- discrete-mathematics
- set-theory
date: 2023-07-07
---


康托展开（Cantor expansion），也称为康托编码（Cantor encoding），是由德国数学家乔治·康托（Georg Cantor）于19世纪末提出的一种数学技术。它用于将**一个无限序列的数字（或有限序列的数字）映射到一个唯一的实数，从而实现序列的编码和排序。**

# Objective

康托展开与逆展开是*将全排列和它的字典序互相转化*的两种算法

# Application

* 作为枚举问题的hash function

# Step by Step

## Deriving Cantor Expansion

### Lemma1 and Lemma2

以DFS生成的4阶全排列为例~~*(no this algorithm detail here)*~~，带编号：

```text
0   1 2 3 4
1   1 2 4 3
2   1 3 2 4
3   1 3 4 2
4   1 4 2 3
5   1 4 3 2
6   2 1 3 4
7   2 1 4 3
8   2 3 1 4
9   2 3 4 1
10  2 4 3 1
11  2 4 3 1
12  3 1 2 4
13  ...
```


可以发现，首位为 1 的全排列表示的数全部在区间 [0,5] ；首位为 2 的全排列全部在区间 [6,11]；首位为 3 的则在 [12,17] ；4 的在 [18,23] 。因为首位有 4 种取值的可能，所以把所有的 4 阶全排列划分成了 4 个长度为 $\frac{4!}{4}=3!=6$ 的区间，首位为 1 的处在第 1 个这样长为 6 的区间，首位为 2 的处在第 2 个，首位为 3 的处在第 3 个……

> [!Lemma1] 
> 衍生到一般情况，对于首位为$k$的$n$阶全排列，它所在的区间为：$[(k-1) \times (n-1)!,\quad k \times (n-1)!]$ 

在确定大致范围后，如何定位到具体的编号呢？

观察遮住第一位的情况：

```text
0   X 2 3 4  <==>  1 2 3
1   X 2 4 3  <==>  1 3 2
2   X 3 2 4  <==>  2 1 3
3   X 3 4 2  <==>  2 3 1
4   X 4 2 3  <==>  3 1 2
5   X 4 3 2  <==>  3 2 1
6   X 1 3 4  <==>  1 2 3
7   X 1 4 3  <==>  1 3 2
8   X 3 1 4  <==>  2 1 3
9   X 3 4 1  <==>  2 3 1
10  X 4 3 1  <==>  3 1 2
11  X 4 3 1  <==>  3 2 1
12  X 1 2 4  <==>  1 2 3
13  ...
```

观察上表我们发现，**只考虑元素间的相对大小关系**（或者说各个数字——表示相对大小的符号，之间的相对大小关系），*遮掉首位的 4 阶全排列可以认为就是 3 阶全排列*，只不过它们使用的数字（表示大小的符号）不同。

> [!Lemma2] 
> 所以我们推导$n$阶全排列对应的$(n-1)$阶全排列，如上面所示，去掉首位后，需要对每个能与**首位构成顺序的数字**(*即，比首位数字大的数*)自减少1 

### Calculate Series index by Lemmas

对于任意序列，迭代使用引理1和引理2就可以得到它的index。

#### Step
1. 利用**引理 1**确定与它同阶同首位的全排列表示的数字的范围，取左边界累加到结果上
2. 利用**引理 2**将$n$阶全排列转化为$(n-1)$阶全排列
3. 得到1阶全排列前，重复1，2；得到1阶全排列后输出结果；

#### Example

$$
35142 \rightarrow 3\dot{5}1\dot{4}2 \rightarrow 34132 \rightarrow 341\dot{3}\dot{2} \rightarrow 34121
$$

$$
index = (3-1) \times 4! + (4-1) \times 3! + (1-1) \times 2! + (2-1) \times 1! = 67
$$

## Definition

> [!hint] 
>  顺序对是由在两个在序列中的元素组成的有序对，它前项在序列中的位置比后项靠前，且前项小于后项。

$a_{1\cdots n}$表示一个n阶的全排列，$a_i$表示这个全排列的$i$的数字，定义$a_{1\cdots n}$的退位序列为$b_{1\cdots n}$, $b_j$等于$a_j$在全排列中作顺序对后项的顺序对个数，形式为:
$$
\forall \ 1 \leq j \leq n, b_j = |\{(a_i, a_j) \ | \ 1 \leq i \leq j \  \text{and} \ a_i \leq a_j\}|
$$

其康托展开公式为：
$$
F(a_{1\cdots n}) = \sum_{i=1}^n (a_i-b_i-1)\times(n-i)!
$$


# Code 

## Method 1

直接用定义写出，但是不生成$b$序列，只在用到时求当时的$b_i$

```python
class CantorExpansion():
    def cantor_encode(self, s:list) -> int:

        '''
        Encode a list of integers to a single integer using Cantor expansion.
        '''

        count  = 0

        for i in range(len(s)):
            count += self.factorial(len(s) - i - 1) * (s[i] - self.count_smaller(s, i) - 1)

        return count

    def factorial(self, x:int) -> int:
        if x == 1 or x == 0:
            return 1
        else:
            return self.factorial(x - 1) * x
        
    def count_smaller(self, s:list, i:int) -> int:
        count = 0
        for j in range(i):
            if s[j] < s[i]:
                count += 1
        return count
```

python file goto: [cantor_expansion.py](https://github.com/PinkR1ver/Jude.W-s-Knowledge-Brain/blob/master/Math/discrete_mathematics/set_theory/cantor_expansion/code/cantor_expansion.py)

复杂度会是$\varTheta(n^2)$

## Method 2

再次明确顺序对的概念：

> [!tip]
>  顺序对是指数组中的一对元素arr[i]和arr[j]，其中i < j且arr[i] > arr[j]

遍历每一个数的时候，需要计算`count_smaller(s,i)`，因此复杂度被提升到$\varTheta(n^2)$。

其实`count_smaller(s,i)`这个方法的目的就是计算数组的顺序对，提高计算数组顺序对的高速算法可以提高算法的复杂度。

树状数组（Fenwick Tree）是一种用于高效计算[前缀和（Prefix Sum）](tmp_script/prefix_sum.md)的数据结构，它可以在$O(\log{n})$的时间复杂度内完成前缀和的计算和更新操作。

### Trick - 使用树状数组求顺序对的详细步骤

Step 1: 离散化 为了方便处理，我们首先对值域数组进行离散化处理，将其转化为一个以0为起始索引的连续整数数组。离散化的目的是将原始的值域映射到一个连续的范围内，以便于在树状数组中使用。

Step 2: 初始化树状数组 创建一个长度为n+1的树状数组bit，并将所有元素初始化为0。这个额外的元素bit[0]不会被使用，我们只是为了方便计算。

Step 3: 统计顺序对 从右往左遍历离散化后的值域数组arr，对于每个元素arr[i]，我们需要统计在其左侧且比它大的元素的个数。

在树状数组中，我们可以通过查询前缀和的方式来计算某个位置的值。因此，对于当前的元素arr[i]，我们查询树状数组中索引为arr[i]的前缀和，得到的结果就是arr[i]左侧比它大的元素的个数。

Step 4: 更新树状数组 在统计完当前元素的顺序对后，我们需要更新树状数组，以便下一次查询能够正确计算前缀和。具体操作如下：

- 在树状数组中，将索引为arr[i]的位置的值加1，表示arr[i]的出现次数加1。
- 重复上述操作，直到遍历完所有元素。

Step 5: 计算总顺序对数 完成整个遍历后，树状数组中的每个位置的值表示该值在原始数组中的出现次数。通过查询树状数组的前缀和，我们可以计算出总的顺序对数。

--- 

利用上述使用树状数组求顺序对的算法就可以将Cantor Expansion复杂度降低到$\varTheta(n\log{n})$


# Inverse Cantor Expansion

逆康托展开的思想是用引理1去定位每一个位置

Example:

`inverse_cantor_expansion(n=5, x=96)`:

* Step 1. 如果是字典序从1开始，则(x - 1) = 95，说明在这个数已经有95个数
* Step 2. floor(95 / (n-1)!) = floor(95 / 4!) = 3，说明有3个数比第一位小，所以第一位被定位为4，余数为23
* Step 3. 剩下数字被23定位，floor(23 / 3!) = 3，余数为5，说明有3个数比第二位小，被定位为4，但是4已经出现过，因此是5 
* Step 4. 剩下的数字用5定位，floor(5 / 2!) = 2，余数为1，说明有2个数比第三位小，被定位为3。
* Step 5. 同理，剩下第四位被定位为2，最后一位被定位为1

# Generalized Cantor Expansion

TODO ... ...

Generalized Cantor Expansion可能并不能满足双射条件

# Reference

* ChatGPT
* [“【给初心者的】康托展开.” 知乎专栏, https://zhuanlan.zhihu.com/p/39377593. Accessed 6 July 2023.](https://zhuanlan.zhihu.com/p/39377593)

