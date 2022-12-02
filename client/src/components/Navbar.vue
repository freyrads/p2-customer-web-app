<script>
import {mapActions, mapState} from 'pinia';
import {useGlobalStore} from '../stores/global';

export default {
  computed: {
    ...mapState(useGlobalStore, ['user']),
  },
  methods: {
    ...mapActions(useGlobalStore, ["logout"]),
    triggerLogout() {
      this.$router.push(this.logout());
    }
  },
};
</script>

<template>
  <nav class="navbar">
    <div class="flex grow">
      <router-link to="/">
	<h1 class="logo">Food Corner</h1>
      </router-link>
    <ul v-if="user !== null">
      <li>
	<router-link to="/">Home</router-link>
      </li>
      <li>
	<router-link to="/favorites">Favorites</router-link>
      </li>
    </ul>
    </div>
    <ul v-if="user === null">
      <li>
	<router-link to="/login">Login</router-link>
      </li>
      <li>
	<router-link to="/signup">Sign Up</router-link>
      </li>
    </ul>
    <ul v-else>
      <li>
	<a @click.prevent="triggerLogout" href="" >Logout</a>
      </li>
    </ul>
  </nav>
</template>

<style>
nav {
  display: flex;
}

nav a {
  color: black;
  text-decoration: none;
  font-size: large;
  font-weight: bold;
}

nav ul {
  display: flex;
  margin: 0px;
  padding: 10px;
}

nav ul li {
  list-style: none;
  margin: 10px;
  padding: 20px;
  border: 1px solid lightgray;
  border-radius: 10px;
}

nav ul li:hover {
  background-color: lightgray;
}
.logo {
  font-size: xx-large;
}
</style>
