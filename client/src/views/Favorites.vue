<script>
import {mapActions, mapWritableState} from 'pinia';
import FoodCard from '../components/FoodCard.vue';
import {useGlobalStore} from '../stores/global';

export default {
    computed: {
        ...mapWritableState(useGlobalStore, ["favorites"]),
    },
    methods: {
        ...mapActions(useGlobalStore, ["fetchFavoriteFood"]),
    },
    async created() {
        const route = await this.fetchFavoriteFood();
	if (route)
	  this.$router.push(route);
    },
    components: { FoodCard }
};
</script>

<template>
  <section>
    <div class="page-title">
      <h1>Your Favorites</h1>
    </div>
    <div class="container flex">
      <div class="food-container flex wrap">
	<FoodCard v-if="favorites.length" v-for="(data, i) in favorites" :key="data.id" :data="data" favorite="true" />
	<div v-else>
	  <h1>It seems a little bit empty here...</h1>
	  <h1>
	    Browse and find your <router-link to="/">favorite food</router-link>!
	  </h1>
	</div>
      </div>
    </div>
  </section>
</template>

<style>
/*
.food-container a {
  font-size: large;
  font-weight: bold;
}
*/
</style>
