<script>
import { mapActions, mapWritableState } from 'pinia';
import {useGlobalStore} from '../stores/global';

export default {
  computed: {
    ...mapWritableState(useGlobalStore, ["loginForm"]),
  },
  methods: {
    ...mapActions(useGlobalStore, ["login", "googleLogin"]),
    triggerLogin() {
      this.login()
      .then(route => {
	if (route)
	  this.$router.push(route);
      });
    },
    triggerGoogleLogin(data) {
      this.googleLogin(data)
      .then(route => {
	if (route)
	  this.$router.push(route);
      });
    },
  },
};
</script>

<template>
  <section class="center-form">
    <div class="container-form">
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
	<div class="center">
	  <GoogleLogin :callback="triggerGoogleLogin" prompt />
	</div>
	<div>
	  Don't have an account? <router-link to="/signup">Sign Up!</router-link>
	</div>
      </form>
    </div>
  </section>
</template>

<style>
section.center-form {
  display: flex;
  justify-content: center;
}

div.container-form {
  margin: 20px;
  width: 50%;
  text-align: center;
  padding: 40px;
  border: 1px solid black;
  box-shadow: 0px 0px 1000px 0px;
  border-radius: 20px;
}

div.container-form input {
  width: 94%;
  padding: 10px;
  border: 2px solid lightgray;
  margin: 6px;
  border-radius: 40px;
}

div.container-form input[type="submit"] {
  width: 30%;
  margin-top: 20px;
  cursor: pointer;  
}

div.container-form input[type="submit"]:hover {
  background-color: white;
  transition: .2s;
}

div.container-form h1 {
  margin-top: 0px;
}

section.center-form form .left {
  text-align: left;
  margin: 0px 10px;
}
</style>
