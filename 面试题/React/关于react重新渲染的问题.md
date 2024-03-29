react里面无论class组件还是function组件，
只要父组件render了（只要修改了state或者修改了DOM），默认情况下就会触发子组件的render过程，无论子组件是有状态的，还是无状态的，也无论父组件是不是传值给了子组件
除非做了优化，shouldComponentUpdate，React.PureComponent，React.memo
之后子组件的render过程又会触发它的子组件的render过程，直到到达了叶子节点（不是组件，而是像div这样的标签）

上述过程会生成一棵新的虚拟DOM树，它会跟原来的虚拟DOM树进行对比，通过diff算法来对实际的DOM进行修改

之后diff过程开始，diff算法会决定是否切实更新DOM元素，即react文档“协调”一节讲的那样
1. 根节点为不同类型（标签不同，组件不同），则全部拆卸，并重新装载一个新的组件
2. 若为相同类型的元素（比如都为div标签），则仅会对比更新有改变的属性（比如className有更改），若style有更改，则仅会更改style上有变更的属性
4. 若为相同类型的组件，组件实例保持不变，react会更新该实例的props，并调用componentWillReceiveProps和componentWillUpdate方法，下一步调用render方法，diff 算法将在之前的结果以及新的结果中进行递归。
3. 递归遍历子节点，react会同时遍历两个子元素的列表，当产生差异时，生成一个 mutation。


你可能会觉得这样不是很傻吗，我又没有传递属性给子组件，那父组件更新会触发所有后代组件的重渲染过程不是很低效且没有意义吗？但是React不能检测到你是否给子组件传了属性，所以它必须进行这个重渲染过程（术语叫做reconciliation）。但是这不会使得react有多低效，因为reconciliation过程是执行的JavaScript，而重渲染的性能开销主要是更新DOM导致的，最后diff算法会介入，决定是否要真正更新DOM，JavaScript的执行速度很快的，所以即使父组件render会触发所有后代组件的render过程(reconciliation过程)，这个效率也不会有太大影响。

当然，从道理上讲，既然我没有给子组件传递属性，或者我的程序能够判断出传递的属性并没有发生变化，那么自然无需进行子组件的reconciliation过程。但是react无法自动检测这一点，于是它提供了shouldComponentUpdate回调函数，让程序员根据情况决定是否决定是否要重新render本组件。如果某个组件的shouldComponentUpdate总是返回false, 那么当它的父组件render了，会触发该组件的render过程，但是进行到shouldComponentUpdate判断时会被阻止掉，从而就不调用它的render方法了，它自己下面的组件的render过程压根也不会触发了。

https://segmentfault.com/q/1010000011289209
