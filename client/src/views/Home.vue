<script>
import FoodCard from "../components/FoodCard.vue"

export default {
  components: {
    FoodCard,
  }, // components
};
</script>

<template>
  <FoodCard />
  <router-link to="/world">
    World
  </router-link>
</template>

<style></style>
