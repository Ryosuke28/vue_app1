<template>
  <div id="app" class="container">
    <nav class="navbar navbar-expand-lg navbar-light bg-white">
      <router-link to="/" class="navbar-brand">Board</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <template v-if="isAuthenticated">
            <li class="nav-item">
              <router-link to="/" class="nav-link" active-class="link--active" exact>掲示板</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/pickup" class="nav-link" active-class="link--active" exact>おすすめ</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/news" class="nav-link" active-class="link--active" exact>新着情報</router-link>
            </li>
          </template>
          
        </ul>
        <ul class="navbar-nav ml-auto">
          <template v-if="isAuthenticated">
            <li class="nav-item">
              <span class="nav-link" @click="logout">ログアウト</span>
            </li>
          </template>
          <template v-if="!isAuthenticated">
            <li class="nav-item">
              <router-link to="/login" class="nav-link">ログイン</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/register" class="nav-link">登録</router-link>
            </li>
          </template>
        </ul>
      </div>
    </nav>
    <template v-if="isAuthenticated">
      <div class="row">
        <div class="col-9">
          <keep-alive>
            <router-view class="my-3"></router-view>
          </keep-alive>
        </div>
        <div class="col-3">
          <router-view name="sidebar" class="my-3"></router-view>
        </div>
      </div>
    </template>
    <template v-if="!isAuthenticated">
      <router-view class="my-5"></router-view>
    </template>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.idToken !== null;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped>
  .link--active {
    font-weight: bold;
  }
</style>