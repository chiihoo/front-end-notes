Function.prototype.bind = function (thisArg, ...args) {
	// bind方法只有第一次能绑定this，再往后不能绑定this，但参数可以
	let self = this;
	// console.log('self.length:' + self.length)//只能在浏览器中运行	5 0 0
	return function (...args2) {
		return self.apply(thisArg, [...args, ...args2]);
		// return self.call(thisArg, ...args, ...args2);
	}

	// 真正的bind()方法可以顺带用作构造函数，此时将忽略传入bind()的this，原始函数就会以构造函数的形式调用，其实参也已经绑定。
	// 而模拟的bind()方法返回的函数用作构造函数时，生成的对象为Object() 。
	// 这里加了一句bound.prototype = self.prototype; 解决了这个问题
	// let self = this;
	// bound = function (...args2) {
	// 	return self.apply((this instanceof self ? this : thisArg), [...args, ...args2])
	// }
	// bound.prototype = self.prototype;
	// return bound;

}


//可以绑定参数，并柯里化
function add(a, b, c, d, e) {
	return a + b + c + d + e;
}
let d = add.bind(null, 1);
let e = d.bind(null, 2, 3);
// let f = e.bind(null, 5, 6);
// console.log(f());
let f = e(5, 6)
console.log(f);


//this只有第一次绑定的有效果
A = { a: 5 }
B = { a: 10 }
function print_a(a) {
	return this.a;
}
let m = print_a.bind(A);
console.log(m());
let n = m.bind(B);
console.log(n());

// m 为 function (...args2) {
// 	return print_a.apply(A, [...args, ...args2]);
// }
// n 为 function (...args2) {
// 	return m.apply(B, [...args, ...args2]);
// }
// 这里绑定A为this只对print_a函数有影响
// 这里绑定b为this只对m函数有影响,而真正输出的实在print_a函数里里面的this.a
// 因此this只有第一次绑定的有效果


