var bar = {
  foo1: function () {
    return 1;
  },
  foo2() {
    return 2;
  },
  //["fo"+"0"+3](){}
  ["fo" + "0" + 3]() {
    return 3;
  }
}
console.log(bar.foo1());
console.log(bar.foo2());
console.log(bar.foo3());