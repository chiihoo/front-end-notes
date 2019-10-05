var fs = require('fs'); //引入nodejs 文件模块 下面是nodejs中原生的require方法,主要是为了读取文件内容
function readFileContent(path) {
  return fs.readFileSync(path).toString();
}

_require.moduleCache = {}  //缓存,这个_require.moduleCache就是函数_require的一个属性
function _require(path) {
  if (_require.moduleCache.hasOwnProperty(path)) {
    return _require.moduleCache[path];
  }

  var code = readFileContent(path)+'\n return module.exports;' //要调的包里面的内容
  var modFun = new Function('module, exports', code)  //以module, exports为参数，code的内容为函数里面的代码，构造一个函数

  var module = { exports: {} }

  _require.moduleCache[path] = module.exports  //先赋值{}，可以解决不同包相互调用造成的死循环问题

  var returnValue = modFun(module, module.exports)  //应该是一个对象module.exports{add:function(){},...}
  //也可以把module.export直接赋值成一个函数add(){}
  _require.moduleCache[path] = returnValue  //把这个对象存起来

  return _require.moduleCache[path]
}

//自定义的_require必须写这么长的路径，因为如果写成./xx.js会直接变成根目录，我也不知道原因
var add = _require('./notes/Javascript/require测试数据.js');
console.log(add(1, 2));

var obj = _require('./notes/Javascript/require测试数据.js');
console.log(obj.add(2, 3));

//如果要导入的文件在同一目录下，官方require必须使用./xx.js路径，否则报错
// var obj = require('./notes/Javascript/require测试数据.js');  //报错，无法找到模块
var obj = require('./require测试数据.js');
console.log(obj.add(5, 5));

// 单独的exports无法修改自身的值，exports是通过形参传入的，直接赋值形参会改变形参的引用，但不能改变作用于外面的值。
// 在被引入的文件中写成exports=function add(a,b){return a+b};这是错的，根本改变不了函数外面的值。
// 只能这样写：exports.add=function add(a,b){return a+b};而module对象的exports属性可以在函数中更改赋值。

// exports只能使用对象的属性向外暴露内部变量，例如 exports.xxx=xxx
// module.exports既可以通过对象的属性，也可以直接赋值一个对象，例如 module.exports.xxx=xxx或者module.exports=xxx


// 1.在要引用的文件中,单个函数的话:
// module.exports=function add(a,b){return a+b};

// var add=_require('a.js');
// var c=add(1,2);


// 2.在要引用的文件中,多个函数的话:
// module.exports.add=function add(a,b){return a+b};
// module.exports.mul=function mul(a,b){return a*b};

// var obj=_require('a.js');
// var c=obj.add(1,2);
// var d=obj.mul(1,2);


