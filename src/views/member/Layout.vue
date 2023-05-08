<script setup>
import { defineComponent } from 'vue'
import MemberAside from '../../components/MemberAside.vue'

defineComponent({
  name: 'MemberLayout'
})
</script>

<template>
  <div class="container">
    <MemberAside></MemberAside>
    <article class="article">
      <RouterView></RouterView>
    </article>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  padding-top: 20px;
  .article {
    width: 1000px;
  }
}
</style>
