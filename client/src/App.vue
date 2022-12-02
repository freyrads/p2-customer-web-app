<script>
import {mapWritableState} from "pinia";
import Navbar from "./components/Navbar.vue";
import {useGlobalStore} from "./stores/global";

export default {
  components: {
    Navbar,
  },
  computed: {
    ...mapWritableState(useGlobalStore, ["user"]),
  },
  created() {
    if (localStorage.getItem("access_token")) {
      this.user = true;
    }
  },
};
</script>

<template>
  <Navbar />
  <router-view />
</template>

<style>
body {
  background-color: aliceblue;
}
</style>
