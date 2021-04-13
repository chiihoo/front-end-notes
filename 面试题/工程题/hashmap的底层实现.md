map的每个键值都会经过计算，映射到某个地址上，查找的时候，就直接往这个地址找就行了，但它可能会产生哈希冲突，可以用拉链法，在每个地址后面用一个单向链表接起来



这个hash映射是怎么映射的？

我也不知道，但是可以模拟实现一下



```
如果key是字符串
let sum = 0
for(let i = 0; i < key.length; i++) {
	sum += key[0].charCodeAt()
}
let keyCode = sum % 37
```



`String.fromCharCode()`



除了拉链法，解决hash冲突的方法还有

开放定址法：用一个散列函数来计算，比如`fi(key) = (f(key)+di) MOD m (di=1,2,3,……,m-1)` 

再哈希：多个hash函数计算

公共溢出区：把冲突的都放在单独的公共溢出区里面