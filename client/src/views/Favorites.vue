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
        await this.fetchFavoriteFood();
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
	<FoodCard v-for="(data, i) in favorites" :key="data.id" :data="data" favorite="true" />
      </div>
    </div>
  </section>
</template>

<style></style>
