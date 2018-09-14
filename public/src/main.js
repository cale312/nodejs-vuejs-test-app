import Vue from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import Routes from './routes';
import VueSession from 'vue-session'

Vue.use(VueSession);
Vue.use(VueRouter);
Vue.use(VueResource);

const router = new VueRouter({
  routes: Routes,
  // mode: 'history'
});

new Vue({
  el: '#app',
  render: h => h(App),
  methods: {},
  router: router
})
