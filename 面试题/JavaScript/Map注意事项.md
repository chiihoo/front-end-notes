var map = new Map(); 

**map.set(key, value)**    
(不要用这个=>  map[key]=value )
map用set写的，就得用get读
用map[key]=value写的就得用map[key]读
不能叉开，否则undifined

注意：不要使用map[key]=value的写法！！！很坑
不会被map.has(key)判断到，也是醉了

* 以下是在浏览器中的运行结果:

Map(0) {a: 5} 和 Map(1) {"set" => 6}

var map=new Map(); 

map["a"]=5; 
=>  5

console.log(map); 
=>  Map(0) {a: 5}

map.set("set", 6); 
=>  Map(1) {"set" => 6}

console.log(map)
=>  Map(1) {"set" => 6}

let set1=new Set('q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'); //这样写是错的
let set1=new Set('qwertyuiop'); //应该是这样

