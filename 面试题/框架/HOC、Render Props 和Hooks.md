**HOC高阶组件 可以给组件功能做扩充，可能会发生props的命名冲突，也可能会嵌套很多层**

比如React Router 的 `withRouter` ，无论是什么组件，它都会把 `match`, `location`和`history` 传给该组件的 prop。如果自己写的组件也有命名为 `match`, `location`和`history` 的 prop 时，便会引发命名冲突



**Render Props 可以动态的决定如何渲染，因为传入的数据是不同的。有时候也会造成嵌套很多层**



**Hooks 代码量减少很多，并且其他函数中的state，可以直接拿来用**



Hooks弱化了生命周期

之前React将UI耦合到组件中，而**自定义Hooks可以实现逻辑与UI解耦**





**高阶组件：**props命名冲突，嵌套多层

**render props：**嵌套多层

**hooks：**解决了上面问题，可以轻松实现逻辑与UI解耦，而像高阶组件之类的想要实现类似功能，就得嵌套好多层