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
  <div id="preloader" class=""></div>
  <Navbar />
  <router-view />
</template>

<style>
body {
  background-color: aliceblue;
  margin: 0px;
}

#preloader.active {
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: #00000040;
  transition: .5s;
}
</style>
