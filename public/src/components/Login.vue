<template>
  <div class="login-wrapper border border-light">
    <form class="form-signin" @submit.prevent="login">
      <h2 class="form-signin-heading">Please sign in</h2>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required
        autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Login',
    data() {
      return {
        port: 'http://' + location.hostname + ':2000',
        email: '',
        password: ''
      }
    },
    beforeCreate: function () {
      // before hook check if any sessions are running
      if (this.$session.exists() === true) {
        // if user logged in, redirect to the dashboard else show the login page
        this.$router.push({
          name: 'dashboard'
        });
      }
    },
    methods: {
      login() {
        axios.post(this.port + '/login', {
            email: this.email,
            password: this.password
          })
          .then((result) => {
            console.log('server response', result);
            if (result.data < 1) {
              alert('wrong email or password');
            } else {
              this.$session.start();
              this.$session.set('username', this.email)
              this.$router.push({
                name: 'dashboard'
              });
            }
          })
          .catch((err) => {
            console.log('returned error', err);
          });
      }
    }
  }
</script>

<style scoped>
  .login-wrapper {
    background: #fff;
    width: 70%;
    margin: 12% auto;
  }

  .form-signin {
    max-width: 330px;
    padding: 10% 15px;
    margin: 0 auto;
  }

  .form-signin .form-signin-heading,
  .form-signin .checkbox {
    margin-bottom: 10px;
  }

  .form-signin .checkbox {
    font-weight: normal;
  }

  .form-signin .form-control {
    position: relative;
    height: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
  }

  .form-signin .form-control:focus {
    z-index: 2;
  }

  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
</style>