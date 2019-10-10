<template>
  <div class="a">
    page a {{ $store.state.money.money1 }}
    <!-- 可以传参，在a.js中用payload配合 -->
    <button @click="add(2)">增加</button>
    <button @click="reduce(2)">减少</button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: mapActions("money", ["add", "reduce"])
};
</script>

<style lang="s">
</style>