import Vue from 'vue';
import App from './components/App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';

new Vue({
  el: 'app',
  created: function () {
    console.log('created')
  },
  components: {App},
  methods: {}
})
