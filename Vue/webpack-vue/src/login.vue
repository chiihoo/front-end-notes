<template id='login'>
  <div>
    <h1>这是登录组件，使用.vue文件定义出来的--这是login.vue定义的msg1:{{ msg1 }}</h1>
  </div>
</template>


<script>
// 在ES6中，使用export dafault和export向外暴露成员
// 使用import 模块名称 from '模块标识符'  和  import '表示路径' 来导入模块

// 在Node中，使用module.exports={}向外暴露成员
// 使用var 名称 = require('模块标识符') 来导入模块
export default {
  data() {
    return {
      msg1: '123'
    };
  },
  methods:{
    show(){
      console.log('调用了login.vue中的show方法')
    }
  }
}
</script>


<style>
</style>