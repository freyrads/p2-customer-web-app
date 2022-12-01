<script>
import Login from "../Login.vue";
import FoodCard from "../components/FoodCard.vue";

export default {
  components: {
    FoodCard,
    Login,
  }, // components
};
</script>

<template>
  <!-- <FoodCard :favorite="true" :data="{}"/>
  <router-link to="/world">
    World
  </router-link> -->
  <Login />
</template>

<style></style>
