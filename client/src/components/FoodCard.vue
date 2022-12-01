<script>
import { mapActions } from "pinia";
import { useGlobalStore } from "../stores/global";

export default {
  props: ["data", "favorite"],
  methods: {
    ...mapActions(useGlobalStore, ["removeFavoriteFood", "addFavoriteFood"]),
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
	if (route)
	  this.$router.push(route);
      });
    },
    detail(id) {
      this.$router.push(`/food/${id}`);
    },
  },
}
</script>

<template>
  <div class="card food r10 flex column">
    <div class="upper-card">
      <div class="image">
	<img :src="data.imgUrl" alt="food image">
      </div>
      <div class="description">
	<div class="yellow-btn">{{ data.Category.name }}</div>
	<div class="desc flex column">
	  <h2>{{ data.name }}</h2>
	  <p>{{ data.description }}</p>
	</div>
      </div>
    </div>
    <div class="lower-card">
      <div class="price">{{ formatPrice(data.price) }}</div>
      <div class="action-btn flex column">
	<button v-if="favorite" @click.prevent="triggerRemoveFavoriteFood(data.id)">
	  Remove from favorites
	</button>
	<button v-else @click.prevent="triggerAddFavoriteFood(data.id)">
	  Add to favorites
	</button>
	<button @click.prevent="detail(data.id)">
	  Detail
	</button>
      </div>
    </div>
  </div>
</template>

<style>
div.card {
  box-shadow: 0px 0px 4px 0px black;
  width: 400px;
  background-color: white;
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

.column {
  flex-direction: column;
}

div.upper-card {
  flex-grow: 1;
}

div.action-btn button {
  margin: 0px 12px 12px 12px;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
}

div.action-btn button:hover {
  background-color: aliceblue;
  transition: .2s;
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

div.price {
  color: darkblue;
  font-size: large;
  font-weight: bold;
  margin: 14px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

div.card.food {
  margin: 20px;
}
</style>
