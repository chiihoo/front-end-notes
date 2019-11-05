function Employee(){
  this.name="";
  this.dept="general";
}

function Manager(){
  //call()允许为不同的对象分配和调用属于一个对象的函数/方法。
  //call()提供新的 this 值给当前调用的函数/方法。
  Employee.call(this);//这句话继承了父类的属性
  this.reports=[];
}
Manager.prototype=Object.create(Employee.prototype);//这句话继承了父类的原型


////
function WorkerBee(){
  Element.call(this);
  this.projects=[];
}
WorkerBee.prototype=Object.create(Employee.prototype);
//
function SalesPerson(){
  WorkerBee.call(this);
  this.dept = 'sales';
  this.quota = 100;
}
SalesPerson.prototype=Object.create(Employee.prototype);

function Engineer() {
  WorkerBee.call(this);
  this.dept = 'engineering';
  this.machine = '';
}
Engineer.prototype = Object.create(WorkerBee.prototype);
////

var jim = new Employee; // 如构造函数无须接受任何参数，圆括号可以省略。
// jim.name is ''
// jim.dept is 'general'

var sally = new Manager;
// sally.name is ''
// sally.dept is 'general'
// sally.reports is []

var mark = new WorkerBee;
// mark.name is ''
// mark.dept is 'general'
// mark.projects is []

var fred = new SalesPerson;
// fred.name is ''
// fred.dept is 'sales'
// fred.projects is []
// fred.quota is 100

var jane = new Engineer;
// jane.name is ''
// jane.dept is 'engineering'
// jane.projects is []
// jane.machine is ''



function A(){}
function B(){
  A.call(this,a,b,c)
  this.xxxx = xxxx
}

B.prototype = Object.create(A.prototype)
B.prototype.__proto__ = A.prototype
Object.setPrototypeOf(B.prototype, A.prototype)
// 这三句话一个意思，原型也要继承

// 如果不支持，也可以这样写
B.prototype = new A()
