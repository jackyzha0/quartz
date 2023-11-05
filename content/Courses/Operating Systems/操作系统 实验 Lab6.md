## Environment
Linux in Virtual Machine on Mac M1
Running `make test BASE=1` and 
```
>> ch8b_threads
```

![](https://s2.loli.net/2022/11/26/KMkxcVwryI3bRhp.png)
## Abstract
The goal of this experiment is to fully understand the multi-threading mechanism of the framework and understand the operation of several locks, including mutext, semaphore, condvar.  After this implementation, we realize deadlock detection.


## Experiment
The implementation is order is described in the documentation.

1. 定义并初始化部分 PCB 的部分变量，包括控制死锁检测启动与死锁检测算法用到的变量， 你可以先定义一部分，后面发现有需要时再做添加；
2. 完成系统调用 `sys_enable_deadlock_detect`，只需要修改变量，不必考虑是否正确实现了死锁。 完成这一步后你可以顺利跑完 `ch8_sem2_deadlock`，这个测例开启了死锁检测但并没有死锁；
3. 尝试写一个函数实现下面提到的死锁检测算法，注释中给了供参考的函数签名。 这是一个和OS独立的函数，你可以自行设计数据单独运行它以测试；
4. 
	1. 维护 mutex 相关的死锁检测变量，并调用死锁检测算法，完成后你可以顺利跑完测例 `ch8_mut1_deadlock`；
	2. 维护 semaphore 相关的死锁检测变量，并调用死锁检测算法，完成后你可以顺利跑完测例 `ch8_sem1_deadlock`

## Conclusion