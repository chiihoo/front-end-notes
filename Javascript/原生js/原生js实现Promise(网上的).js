//有些困难哟
function _Promise(resolver){
  // resolve 函数执行的时候 会把它的值 从 'pending' (待定)变成'fullfilled'，这也就是说 _Promise 执行成功
  // 反之，reject函数会把它的值 从 'pending' 变成 'rejected'
  // 一旦 this._status 的值发生发生了改变之后，它的值就会保持不变，也就是说，它的值 会一直保持在 'fullfilled' 或 'rejected'状态 。
  // this._result 是在 resolve 或者 reject 的时候 需要传递给 then 函数的值。
  this._status='pending';
  this._result='';
  resolver(this.resolve.bind(this),this.reject.bind(this)); //不明白这里为什么要绑定this
}

_Promise.prototype.resolve=function(result){  //执行成功后的回调函数
  if(this._status=='pending'){
    this._status='fullfilled';
    this._result=result;
  }
}
_Promise.prototype.reject=function(result){ //执行失败后的回调函数,失败是的result应该是错误信息
  if(this._status=='pending'){
    this._status='rejected';
    this._result=result;
  }
}

_Promise.prototype.then=function(isResolve,isReject){ //then函数又可以传入执行成功或失败后的回调函数
  if(this._status=='fullfilled'){
    var _isPromise=isResolve(this._result);
    if(_isPromise instanceof _Promise){ //如果回调函数返回的是个新的_Promise，则要返回这个
      return _isPromise;
    }
    return this;
  }else if(this._status=='rejected'){
    var _isPromise=isReject(this._result);
    if(_isPromise instanceof _Promise){
      return _isPromise;
    }
    return this;
  }
}

_Promise.prototype.catch=function(isReject){
  if(this._status=='rejected'){
    var error=new TypeError(this._result);
    var _isPromise=isReject(error);
    if(_isPromise instanceof _Promise){
      return _isPromise;
    }
    return this;
  }
}



// 调用
// 返回新的_Promise
var promise1=new _Promise(function(resolve,reject){
  var s=5;
  resolve(s);
}).then(function(c){
  return new _Promise(function(resolve,reject){
    var c=5;
    resolve(c);
  })
})

// catch
var promise2=new _Promise(function(resolve,reject){
  var s=5;
  resolve(s);
}).catch(function(error){
  console.log(error);
})


