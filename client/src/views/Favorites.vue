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
    created() {
        this.fetchFavoriteFood();
    },
    components: { FoodCard }
};
</script>

<template>
  <section>
    <h1>Homepage</h1>
    <div class="container flex">
      <div class="food-container flex wrap">
	<FoodCard v-for="(data, i) in favorites" :key="data.id" :data="data" favorite />
      </div>
    </div>
  </section>
</template>

<style></style>
