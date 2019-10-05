function A(){
  // 两种方法都行
  if(!this instanceof A){
    return new A();
  }

  // 1.如果函数使用了new，那么new.target就是构造函数
  // 2.如果函数没有用new，那么new.target就是undefined
  // 3.es6的类方法中，在调用时候，使用new，new.target指向类本身，没有使用new就是undefined
  if(new.target !== A){
    return new A();
  }
}
let b=A();
// 这个this instanceof A 中的this为windows

// 这两个if的作用是上面这样调用时会自动变成:
let b=new A()
// 这个this instanceof A 中的this为A{}

