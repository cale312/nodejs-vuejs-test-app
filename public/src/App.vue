<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {}
    },
    beforeCreate: function () {
      console.log('is the user logged in? ', this.$session.exists());
    }
  }
</script>

<style>
  body {
    background: #fafafa;
  }

  button {
    cursor: pointer;
  }

  textarea:hover,
  input:hover,
  textarea:active,
  input:active,
  textarea:focus,
  input:focus,
  button:focus,
  button:active,
  button:hover,
  label:focus,
  .btn:active,
  .btn.active {
    outline: 0px !important;
    -webkit-appearance: none;
  }
</style>