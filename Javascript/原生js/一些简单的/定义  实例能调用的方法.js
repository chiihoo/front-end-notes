// 方法一
// 对象中直接定义方法，用对象来调用方法
var a={
  table:function(item) {
    console.log(item);
  }
}
a.table(3)

// =>  3

// 方法二
// 函数里面定义一个方法，这里用的是在构造函数的原型属性上创建方法，比较节省空间
function func(head){
  this.head=head;
}
func.prototype.table=function(item){
  console.log(item)
}
var a=new func(6);
a.table(5);
a.table(a.head);

// =>  5
//     6