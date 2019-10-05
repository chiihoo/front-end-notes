function add(c, d) {
  console.log(this.a + this.b + c + d);
}

console.log("wu---")

console.log("---")
var o = { a: 5, b: 6 };
add(1, 2);
add.call(o, 1, 5);

console.log("---")

//var a8 = true && "Cat";
var a8 = true || "Cat";
console.log(a8);

console.log("---")

let cd = 5;
{
  let cd = 3;
  console.log(cd);
}
console.log(cd);

console.log("---")

console.log(3 / 2);

var result = 1, counter = 0;
while (counter < 10) {
  result = result * 2;
  counter = counter + 1;
}
console.log(result);

console.log("---")

var result1 = 1;
var counter1 = 0;
while (counter1 < 10) {
  console.log(result1);
  result1 = result1 * 2;
  counter1 = counter1 + 1;
} 

console.log("---")

console.log(5/0);
console.log(5/(-0));

function isRun(){
  // 貌似promot只能在浏览器中使用
  // var year=prompt("输入要判断闰年的年份","")
  var year = 1996;
  console.log((year%4===0 && year%100!==0) || year%400===0);
}

function toSum(n){
  var sum=0;
  for(var i=1;i<=n;i++){
    sum+=i;
  }
  return sum;
}

function suNum(n){
  for(var i=2;i<50;i++){
    if(n%i==0){
      return false;
    }
  }
  return true;
}

var s=":\")hello:-\\\\world";
// var s=':")hello:-\\\\world';
console.log(s);

console.log(0||""||null||1||5);
console.log(3||"A"||6);
console.log(15&&"A"&&0&&5);
console.log(15&&"A"&&5);