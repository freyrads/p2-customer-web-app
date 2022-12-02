<script>
import { mapActions, mapWritableState } from 'pinia';
import {useGlobalStore} from '../stores/global';

export default {
  computed: {
    ...mapWritableState(useGlobalStore, ["signupForm"]),
  },
  methods: {
    ...mapActions(useGlobalStore, ["signup"]),
    triggerSignup() {
      this.signup()
      .then(route => {
	if (route)
	  this.$router.push(route);
      });
    },
  },
};
</script>

<template>
  <h1>Sign Up</h1>
  <form @submit.prevent="triggerSignup()">
    <div>
      <div>
	<label for="username">Username:</label>
      </div>
      <div>
	<input v-model="signupForm.username" type="text" name="username" placeholder="Username">
      </div>
    </div>
    <div>
      <div>
	<label for="email">Email:</label>
      </div>
      <div>
	<input v-model="signupForm.email" type="text" name="email" placeholder="Email" required>
      </div>
    </div>
    <div>
      <div>
	<label for="password">Password:</label>
      </div>
      <div>
	<input v-model="signupForm.password" type="text" name="password" placeholder="Password" required>
      </div>
    </div>
    <div>
      <div>
	<label for="phoneNumber">Phone Number:</label>
      </div>
      <div>
	<input v-model="signupForm.phoneNumber" type="text" name="phoneNumber" placeholder="Phone Number">
      </div>
    </div>
    <div>
      <div>
	<label for="address">Address:</label>
      </div>
      <div>
	<input v-model="signupForm.address" type="text" name="address" placeholder="Address">
      </div>
    </div>
    <div>
      <input type="submit" value="Signup">
    </div>
    <div>
      Already have an account? <router-link to="/login">Login!</router-link>
    </div>
  </form>
</template>

<style></style>
