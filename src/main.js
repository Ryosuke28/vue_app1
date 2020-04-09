import Vue from 'vue';
import App from './App.vue';
import axios from "axios";
import router from "./router";
import store from "./store";
import "./assets/style/global.scss";

Vue.config.productionTip = false;

axios.defaults.baseURL = "https://firestore.googleapis.com/v1/projects/vuejs-http-1478f/databases/(default)/documents";

axios.interceptors.request.use(
  config => {
    // ここにしたい処理を書く
    return config;
  },
  error => {
    // ここにしたい処理を書く
    return Promise.reject(error); // catchへerrorを渡す
  }
);
axios.interceptors.response.use(
  response => {
    // ここにしたい処理を書く
    return response;
  },
  error => {
    // ここにしたい処理を書く
    return Promise.reject(error); // catchへerrorを渡す
  }
);

store.dispatch("autoLogin").then(() => {
  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
});

