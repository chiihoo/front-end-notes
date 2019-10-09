<template>
  <div class="vuex">
    vuex {{ $store.state.count }}
    <button @click="increment">增加</button>
    <button @click="decrement">删减</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  // 将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）
  methods: mapActions(["increment", "decrement"])
};
</script>

<style lang="css">
</style>