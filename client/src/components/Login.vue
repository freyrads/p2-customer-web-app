<script>
import { mapActions, mapState } from 'pinia';
import {useGlobalStore} from '../stores/global';

export default {
  computed: {
    ...mapState(useGlobalStore, ["loginForm"]),
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
  <form @submit.prevent="triggerLogin()"></form>
</template>

<style></style>
