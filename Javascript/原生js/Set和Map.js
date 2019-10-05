class MySet {
  constructor(initialValues) {  //initValues传入的是数组
    this._set=[];
    for(let val of initialValues){
      this.add(val); //调用的底下的add()
    }
  }

  add(val) {
    if(!this.has(val)){
      this._set.push(val);
    }
    return this;
  }

  delete(val) {
    if(this.has(val)){
      this._set.splice(this._set.indexOf(val),1);
      return true;
    }
    return false;
  }

  has(val) {
    return  this._set.indexOf(val)!=-1;
  }

  clear() {
    this._set=[];
  }

  get size() {
    return this._set.length;
  }
}





class MyMap {
  constructor(...initialValues) { //initValues传入的是对象
    this._map=[];
    for(let item of initialValues){
      this.set(item.key,item.val); 
    }
  }

  set(key, val) {
    for(let item of this._map){
      if(item.key==key){
        item.val=val;
        return this;
      }
    }
    let temp={};
    temp.key=key;
    temp.val=val;
    this._map.push(temp);
    return this;
  }

  get(key) {
    for(let item of this._map){
      if(item.key==key){
        return item.val;
      }
    }
    return undefined;
  }

  delete(key) {
    for(let item of this._map){
      if(item.key==key){
        let index=this._map.indexOf(item);
        this._map.splice(index,1);
        return true;
      }
    }
    return false;
  }

  has(key) {
    for(let item of this._map){
      if(item.key==key){
        return true;
      }
    }
    return false;
  }

  clear() {
    this._map=[];
  }

  get size() {
    return this._map.length;
  }
}


