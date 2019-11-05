var n=8;
var s="";
for(var i=2;i<=n;i++){
  while(n!=i){
    if(n%i==0){
      s+=i+"*";
      n=n/i;
    }
    else{
      break;
    }
  }
}
console.log(s+n);
