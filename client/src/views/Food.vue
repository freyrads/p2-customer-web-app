<script>
import {mapActions, mapState} from 'pinia';
import {useGlobalStore} from '../stores/global';

export default {
  computed: {
    ...mapState(useGlobalStore, ['detailFood']),
  },
  methods: {
    ...mapActions(useGlobalStore, ["fetchDetailFood", "removeFavoriteFood", "addFavoriteFood"]),
    formatPrice(price) {
      return price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
    },
    triggerAddFavoriteFood(id) {
      this.addFavoriteFood(id)
      .then(route => {
	if (route)
	  this.$router.push(route);
      });
    },
    triggerRemoveFavoriteFood(id) {
      this.removeFavoriteFood(id)
      .then(route => {
	  this.$router.push(route || "/favorites");
      });
    },
  },
  async created() {
    const route = await this.fetchDetailFood(this.$route.params.id)
    if (route)
      this.$router.push(route);
  },
};
</script>

<template>
  <section v-if="detailFood" id="food-detail-container" class="flex">
    <div class="image">
      <img :src="detailFood.imgUrl" alt="food image">
    </div>
    <div>
      <div class="page-title">
	<h1>{{ detailFood.name }} ({{ detailFood.Category.name }})</h1>
      </div>
      <div class="description action-btn">
	<p>{{ detailFood.description }}</p>
	<div class="price">{{ formatPrice(detailFood.price) }}</div>
	<button v-if="!detailFood.FavoriteFoods[0]" @click.prevent="triggerAddFavoriteFood(detailFood.id)">
	  Add to favorites
	</button>
	<button v-else @click.prevent="triggerRemoveFavoriteFood(detailFood.FavoriteFoods[0].id)">
	  Remove from favorites
	</button>
      </div>
    </div>
  </section>
</template>

<style>
#food-detail-container .description {
  padding: 20px;
}

#food-detail-container .image {
  box-shadow: 0px 0px 4px 0px;
}

#food-detail-container .image img {
  width: 50vw;
}

.image {
  text-align: center;
}
</style>
