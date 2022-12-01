<script>
import {mapState} from 'pinia';
import {useGlobalStore} from '../stores/global';

export default {
  computed: {
    ...mapState(useGlobalStore, ['user']),
  },
};
</script>

<template>
  <nav class="navbar">
    <router-link to="/">
      <h1>Hello World!</h1>
    </router-link>
    <ul v-if="user === null">
      <li>
	<router-link to="/login">Login</router-link>
      </li>
      <li>
	<router-link to="/signup">Sign Up</router-link>
      </li>
    </ul>
    <ul v-else >
      <li>
	<router-link to="/">Home</router-link>
      </li>
      <li>
	<router-link to="/favorites">Favorites</router-link>
      </li>
    </ul>
  </nav>
</template>

<style></style>
