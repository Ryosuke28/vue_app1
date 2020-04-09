<template>
  <div style="text-align: center;">
    <h2 class="mb-3">登録</h2>
    <div class="form-item">
      <label for="email">Email：</label>
      <input name="email" type="email" v-model="email">
    </div>
    <div class="form-item">
      <label for="password">パスワード：</label>
      <input name="password" type="password" v-model="password">
    </div>
    <button @click="register">送信</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    register() {
      this.$store.dispatch("register", {
        email: this.email,
        password: this.password
      });
      this.email = "";
      this.password = "";
    }
  }
}
</script>
