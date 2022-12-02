<script>
import { mapActions, mapWritableState } from 'pinia';
import {useGlobalStore} from '../stores/global';

export default {
  computed: {
    ...mapWritableState(useGlobalStore, ["loginForm"]),
  },
  methods: {
    ...mapActions(useGlobalStore, ["login"]),
    triggerLogin() {
      this.login()
      .then(route => {
	if (route)
	  this.$router.push(route);
      });
    },
  },
};
</script>

<template>
  <h1>Login</h1>
  <form @submit.prevent="triggerLogin()">
    <div>
      <input v-model="loginForm.email" type="text" name="email" placeholder="Email" required>
    </div>
    <div>
      <input v-model="loginForm.password" type="password" name="password" placeholder="Password" required>
    </div>
    <div>
      <input type="submit" value="Login">
    </div>
    <div>
      Don't have an account? <router-link to="/signup">Sign Up!</router-link>
    </div>
  </form>
</template>

<style></style>
