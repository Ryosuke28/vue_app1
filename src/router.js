import Vue from "vue";
import Router from "vue-router";
import Comments from "./views/Comments.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import News from "./views/News.vue";
import Pickup from "./views/Pickup.vue";
import Sidebar from "./views/Sidebar.vue";
import store from "./store";
import BootstrapVue from "bootstrap-vue";


Vue.use(Router);
Vue.use(BootstrapVue);

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

export default new Router({
  mode: "history",
  routes: [
    { 
      path: "/",
      components: {
        default: Comments,
        sidebar: Sidebar
      },
      beforeEnter(to, from, next) {
        if (store.getters.idToken) {
          next();
        } else {
          next('/login');
        }
      }
    }, {
      path: "/login",
      component: Login,
      beforeEnter(to, from, next) {
        if (store.getters.idToken) {
          next('/');
        } else {
          next();
        }
      }
    }, {
      path: "/register",
      component: Register,
      beforeEnter(to, from, next) {
        if (store.getters.idToken) {
          next('/');
        } else {
          next();
        }
      }
    }, {
      path: "/news",
      components: {
        default: News,
        sidebar: Sidebar
      },
      beforeEnter(to, from, next) {
        if (store.getters.idToken) {
          next();
        } else {
          next('/login');
        }
      }
    }, {
      path: "/pickup",
      components: {
        default: Pickup,
        sidebar: Sidebar
      },
      beforeEnter(to, from, next) {
        if (store.getters.idToken) {
          next();
        } else {
          next('/login');
        }
      }
    }
  ]
});
