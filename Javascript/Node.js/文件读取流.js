var fs = require('fs');
var myReadStream = fs.createReadStream('D:/Microsoft VS Code workspace/notes/javascript/继承.js','utf8');
var myWriteStream = fs.createWriteStream(__dirname+'/示例.js');
// myReadStream.setEncoding('utf8');
var data='';
myReadStream.on('data',function(chunk){
  // data+=chunk;
  myWriteStream.write(chunk);
})
myReadStream.on('end',function(){
  console.log(data);
})