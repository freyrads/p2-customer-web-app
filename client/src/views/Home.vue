<script>
import FoodCard from "../components/FoodCard.vue"

export default {
  components: {
    FoodCard,
  }, // components
};
</script>

<template>
  <!-- <FoodCard :favorite="true" :data="{}"/> -->
  <router-link to="/world">
    World
  </router-link>
</template>

<style></style>
