<script>
import { mapActions } from "pinia";
import { useGlobalStore } from "../stores/global";

export default {
  props: ["data", "favorite"],
  methods: {
    ...mapActions(useGlobalStore, ["removeFavoriteFood"]),
    formatPrice(price) {
      return price.toLocaleString("id-ID", { style: "currency", currency: "IDR" });
    },
    triggerRemoveFavoriteFood(id) {
      this.removeFavoriteFood(id)
      .then(route => {
	if (route)
	  this.$router.push(route);
      });
    },
  },
}
</script>

<template>
  <div class="card food r10">
    <div class="image">
      <img :src="data.imgUrl" alt="food image">
    </div>
    <div class="description">
      <div class="yellow-btn">{{ data.Category.name }}</div>
      <div class="desc">
	<h2>{{ data.name }}</h2>
	<p>{{ data.status }}</p>
	<p>{{ data.description }}</p>
	<span class="price">{{ formatPrice(data.price) }}</span>
      </div>
      <button v-if="favorite" @click.prevent="triggerRemoveFavoriteFood(data.id)">
	Remove from favorites
      </button>
    </div>
  </div>
</template>

<style>
div.card {
  box-shadow: 0px 0px 4px 0px black;
  width: 400px;
}

.r10 {
  border-radius: 10px;
}

div.card .description {
  background-color: white;
  border-radius: 0px 0px 10px 10px;
  position: relative;
  padding: 10px;
}

div.card .description .yellow-btn {
  padding: 6px 14px;
  background-color: orange;
  width: fit-content;
  font-weight: bold;
  color: white;
  border-radius: 20px;
}

div.card .description .desc {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

div.card .image {
  height: 300px;
  overflow: scroll;
}

div.card .image::-webkit-scrollbar {
  display: none;
}

div.card .image img {
  border-radius: 10px 10px 0px 0px;
  width: 400px;
}

span.price {
  color: darkblue;
  font-size: large;
  font-weight: bold;
}

div.card.food {
  margin: 20px;
}
</style>
