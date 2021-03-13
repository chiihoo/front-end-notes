**interface和type的区别**

1. interface可以继承，可以声明合并
2. type可以声明基本类型别名，交叉类型，联合类型，元组类型[]

```
继承
interface foo extends bar{}


声明合并
interface foo{
	name: string
    age: number
}
interface foo {
	sex: string
}
```

```
type foo = string      基本类型别名
type foo = bar & baz   交叉类型
type foo = bar | baz   联合类型
type foo = [bar, baz]  元组类型
```



https://zhuanlan.zhihu.com/p/350033675 TypeScript 高级用法

