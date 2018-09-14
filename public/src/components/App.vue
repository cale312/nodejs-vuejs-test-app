<template>
  <div>
    <login></login>
  </div>
</template>

<script>

  import HelloWorld from './HelloWorld.vue';
  import Login from './Login.vue';

  export default {
    components: { 'hello-world': HelloWorld, 'login': Login  },
    data() { return {} }
  }

</script>

<style>

</style>
