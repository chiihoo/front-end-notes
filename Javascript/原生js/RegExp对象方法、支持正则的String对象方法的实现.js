// 作业：使用exec函数实现所有其它与正则相关的函数：test,match,split,search,replace。

RegExp.prototype.test = function (string) {
  // let RegExpObject=new RegExp(this);
  // let res=RegExpObject.exec(string);
  let res = this.exec(string);
  if (res == null) {
    return false;
  }
  return true;
}
let re = new RegExp("foo"); // 正则
re.test("foooab"); // true
re.test("foab");  // false



String.prototype.match = function (re) {
  if (Object.prototype.toString.call(re) == '[object String]' || Object.prototype.toString.call(re) == '[object Number]') {  //如果参数是字符串或数字，就转成正则
    re = new RegExp(re);  //全局就是new RegExp(re,'g')，这里不要全局
    return re.exec(this);
  }
  if (Object.prototype.toString.call(re) != '[object RegExp]') {
    throw new Error('参数类型错误');
  }
  if (re.global == false) {
    return re.exec(this);
  }
  else {
    let res = [];
    let match;
    while (match = re.exec(this)) {
      res = res.concat(match);
    }
    return res;
  }
}
let s1 = 'a1 b22 cc3';
s1.match(/[a-c]\d/g);



String.prototype.split = function (re, maxNum) {
  if (Object.prototype.toString.call(re) == '[object String]' || Object.prototype.toString.call(re) == '[object Number]') {
    if (re == '') {
      let res = [];
      for (let item of this) {
        res.push(item);
        if (res.length == maxNum) {
          return res;
        }
      }
      return res;
    }
    else {
      re = new RegExp(re, 'gm');
    }
  }
  if (Object.prototype.toString.call(re) != '[object RegExp]') {
    throw new Error('参数类型错误');
  }
  if (re.global == false) {
    re = new RegExp(re.source, re.flags + 'g');  //添加全局修饰符
  }
  let res = [];
  let match;
  startIndex = re.lastIndex;
  while (match = re.exec(this)) { //当match不为null时，match.index比re.lastIndex小1，match.index为匹配到的位置，re.lastIndex为下一次开始的位置
    let str = this.slice(startIndex, match.index);
    startIndex = re.lastIndex;
    res.push(str);
    if (res.length == maxNum) {
      return res;
    }
  }
  res.push(this.slice(startIndex))
  return res;
}
let s2 = 'abccab ssd sadncabjs sdabs   shd';
s2.split('');
s2.split(' ');
s2.split('ab');
s2.split(/[a-c]+/);



String.prototype.search = function (re) {
  if (Object.prototype.toString.call(re) == '[object String]' || Object.prototype.toString.call(re) == '[object Number]') {
    return this.indexOf(re);
  }
  if (Object.prototype.toString.call(re) != '[object RegExp]') {
    throw new Error('参数类型错误');
  }
  re.lastIndex=0;
  let match = re.exec(this);
  return match == null ? -1 : match.index;
}
let s3 = 'abccab s8sd sad75ncabjs sdab6s  7shd';
s3.search('sd');
s3.search(/\d/g);
s3.search(/\d\d/);


//其实可以不用存进数组，直接拼接也行
String.prototype.replace = function (re, replacement) {
  //re字符串
  if (Object.prototype.toString.call(re) == '[object String]' || Object.prototype.toString.call(re) == '[object Number]') {
    re = String(re);
    let index = this.indexOf(re);
    let res=this; //因为是string类型，所以这样复制更改res就不会更改this

    //replacement字符串
    if (Object.prototype.toString.call(replacement) == '[object String]' || Object.prototype.toString.call(replacement) == '[object Number]') {
      while (index != -1) {
        let len = re.length;
        res = res.slice(0, index) + replacement + res.slice(index + len);
        index = res.indexOf(re);
      }
      return res;
    }
    //replacement函数
    else if (Object.prototype.toString.call(replacement) == '[object Function]') {
      while (index != -1) {
        let len = re.length;
        res = res.slice(0, index) + replacement(res.slice(index,index+len)) + res.slice(index + len);
        index = res.indexOf(re);
      }
      return res;

    }
    else{
      throw new Error('第二个参数的类型错误');
    }
  }
 //re正则表达式
  else if (Object.prototype.toString.call(re) == '[object RegExp]') {
    let match;
    let res=this; //因为是string类型，所以这样复制更改res就不会更改this

    //replacement字符串
    if (Object.prototype.toString.call(replacement) == '[object String]' || Object.prototype.toString.call(replacement) == '[object Number]') {
      if (re.global == false) {
        re = new RegExp(re.source, re.flags + 'g');  //添加全局修饰符
      }
      let temp=[];  
      let preIndex=0;
      let curIndex=0
      let len=0;
      let res='';
      while (match=re.exec(this)) {
        curIndex=match.index;
        if(preIndex==0&&curIndex==0){
          temp.push(this.slice(preIndex,curIndex));   //temp存的是除了要替换的字符的其他字符串
        }
        else{
          temp.push(this.slice(preIndex+len,curIndex));   //temp存的是除了要替换的字符的其他字符串
        }
        len=match[0].length;
        preIndex=curIndex;
      }
      temp.push(this.slice(curIndex+len));

      for(let i=0;i<temp.length-1;i++){
        res+=temp[i]+replacement;
      }
      res+=temp[temp.length-1];
      return res;
    }

    //replacement函数
    if (Object.prototype.toString.call(replacement) == '[object Function]') {
      if (re.global == false) {
        re = new RegExp(re.source, re.flags + 'g');  //添加全局修饰符
      }
      let temp=[];  //temp存的是除了要替换的字符串以外的其他字符串
      let matchTemp=[];  //temp存的是除了要替换的字符串
      let preIndex=0;
      let curIndex=0
      let len=0;
      let res='';
      while (match=re.exec(this)) {
        curIndex=match.index;
        if(preIndex==0&&curIndex==0){
          temp.push(this.slice(preIndex,curIndex));   //temp存的是除了要替换的字符的其他字符串
        }
        else{
          temp.push(this.slice(preIndex+len,curIndex));   //temp存的是除了要替换的字符的其他字符串
        }
        len=match[0].length;
        preIndex=curIndex;
        matchTemp.push(match);
      }
      temp.push(this.slice(curIndex+len));  //跟上面一种情况几乎一模一样，多了个matchTemp

      for(let i=0;i<temp.length-1;i++){
        res+=temp[i]+replacement(matchTemp[i][0]); //就这里不同
      }
      res+=temp[temp.length-1];
      return res;
    }
  }
  else{
    throw new Error('第一个参数的类型错误');
  }
}
// let a='abcsdd546ads'.replace(/\d/,'4')
// let a='dd5sd46ads'.replace(/[a-d]+/g,755)
let a='abcsdd546adl'.replace(/[a-d][s|l]/,word=>word.toUpperCase())
console.log(a);


