<template>
  <div>
    <h1>这是App组件</h1>
    <router-link to="/account">Account</router-link>
    <router-link to="/goodslist">GoodsList</router-link>
    <router-view></router-view>
  </div>
</template>


<script>
export default {};
</script>


<style lang="scss" scoped>  
// lang属性可以指定特殊样式，比如scss、less等
// scoped属性会使样式只适用于当前组件
// 如若不写scoped属性，样式就会作用于全局的所有组件
h1{
  color: lightseagreen;
}
</style>

<style>
/* 作用于全局 */
/* 推荐都为style设置scoped属性 */
.router-link-active {
  color: red;
  font-weight: 800;
  font-style: italic;
}
</style>
