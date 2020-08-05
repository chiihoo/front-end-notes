// 数组里面不通过索引而直接查找一个值的时间复杂度为O(n)，而哈希表的key直接映射着一个索引，查找key就相当于查找数组里面有没有这个索引，在没有hash冲突的情况下时间复杂度为O(1)。

// Object和Map的区别：

// Object的键是字符串类型
// Map的键可以是任意类型

// Object获取键集合 使用Object.keys，返回数组
// Map获取键集合 用 map变量.keys()，返回迭代器

let o = { a: 1, b: 2, c: 3 }
Object.keys(o) // ['a', 'b', 'c']

// --------------------

// Map      set、get、has、delete

let m = new Map([
  ['Michael', 95],
  ['Bob', 75],
  ['Tracy', 85]
])
let clone = new Map(m) // 也可以克隆一个Map

// 键可以为任意类型，但是如果直接传个匿名的进去 m.set(function a(){},2)，或者m.set({},3)是没有意义的，因为根本读不到
const a1 = () => {}
const a2 = {}
m.set(a1, 2)
m.set(a2, 3)

m.set('a', 1)
m.get('a')
m.has('a')
m.delete('a')
m.clear() //清空所有键值对
m.size // 键值对的数量
m.forEach((value, key) => {}) // 注意forEach的参数顺序，先value，后key
m.keys() // 获取键，迭代器，MapIterator {'Michael', 'Bob', 'Tracy'}
m.values() // 获取值，迭代器，MapIterator {95, 75, 85}
m.entries() //  跟直接遍历m是一样的，获取键值，迭代器，每一项为数组[key, value]，MapIterator {'Michael' => 95, 'Bob' => 75, 'Tracy' => 85}

Array.from(m) // 可以转换成[['key1', 'value1'], ['key2', 'value2']]这样的数组
;[...m] // 效果与Array.from(m)一样
;[...m.keys()] // 也可以迭代器转换成数组

// 可以用for of读取Map
for (let [key, value] of m) {
  console.log(key, value)
}
for (let item of m) {
  console.log(item[0], item[1])
}

// m.entries()跟直接遍历m是一样的
for (let [key, value] of m.entries()) {
  console.log(key, value)
  // ['Michael', 95]
}

// 请注意！为Map设置对象属性也是可以的，但是可能引起大量的混乱。
// 错误！
let wrongMap = new Map()
wrongMap['bla'] = 'blaa'
wrongMap['bla2'] = 'blaaa2'
console.log(wrongMap) // Map { bla: 'blaa', bla2: 'blaaa2' }

// 但是这样会使has、delete这些方法失去效用！
wrongMap.has('bla') // false
wrongMap.delete('bla') // false
console.log(wrongMap) // Map { bla: 'blaa', bla2: 'blaaa2' }

// --------------------

// Set      add、has、delete
// 只能通过迭代拿到值
let s = new Set([1, 2, 3, 3, '3'])

s.add({ c: 7 })
s.has(2)
s.delete(3)
s.clear()
s.size
s.forEach(value => {}) // 注意forEach的参数顺序，先value，后key
s.keys() // 跟s.values()差不多，都是值 SetIterator {1, 2, 3, "3"}
s.values() // SetIterator {1, 2, 3, "3"}
s.entries() // 每一项为数组[value, value]，SetIterator {1 => 1, 2 => 2, 3 => 3, "3" => "3"}

for (let item of m.entries()) {
  console.log(item)
  // [1, 1]
  // [2, 2]
  // [3, 3]
  // ['3', '3']
}

// 数组去重
const numbers = [2, 3, 4, 4, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 5, 32, 3, 4, 5]
console.log([...new Set(numbers)])

// 字符串
new Set('India') // Set(5) {"I", "n", "d", "i", "a"}

// --------------------

// WeakMap

// WeapMap的键key只能是对象引用，而值value可以是任意类型的
// WeapMap会检查变量的引用，键名的引用为弱引用，如果没有其他对键名的引用，则该键值对会被回收。

// WeakMap 的 key 是不可枚举的

// https://blog.csdn.net/weixin_38382659/article/details/93386960?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-3.edu_weight&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-3.edu_weight
// 以 DOM节点作为键名的场景，比如说：
// 注册监听事件的handler很适合用WeakMap来实现

// ele1.addEventListener('click', handler1, false)
// ele2.addEventListener('click', handler2, false)

// 当删去dom元素的时候，对应handler函数也会自动被回收
const listener = new WeakMap()

listener.set(ele1, handler1)
listener.set(ele2, handler2)

ele1.addEventListener('click', listener.get(ele1))
ele2.addEventListener('click', listener.get(ele2))

// ---

let o1 = {}
let o2 = {}
let wm = new WeakMap([
  [o1, 3],
  [o2, 5]
])

let o = {}
wm.set(o, 1)
wm.get(o)
wm.has(o)
wm.delete(o)

// --------------------

// WeakSet

// WeakSet只能接收对象的集合，而不能像Set一样是任意类型的值
// WeakSet中对象的引用为弱引用，如果没有其他对该对象的引用，则该对象会被当成垃圾回收掉

// WeakSet 是不可枚举的

let ws = new WeakSet()

// WeakSet比Set更适合（和执行）跟踪对象引用，尤其是在涉及大量对象时。
