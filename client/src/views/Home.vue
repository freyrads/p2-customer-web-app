<script>
import {mapActions, mapWritableState} from 'pinia';
import FoodCard from '../components/FoodCard.vue';
import {useGlobalStore} from '../stores/global';

export default {
  data() {
    return {
      dummyFood: {
	imgUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOVP.ex2x03jfLlXf0Q6CtjTPXwHgFo%26pid%3DApi%26h%3D120&f=1&ipt=78d206987dd13d73e3b18b5eab452b0f4525df29a1b604fe8fe7da5750ba08ee&ipo=videos",
	Category: {
	  name: "appetizer",
	},
	name: "Food",
	id: 534786,
	description: "kyfsguywrgiuygrfkuyegrilf",
	price: 534635,
	status: "Active",
      }
    };
  },
  computed: {
      ...mapWritableState(useGlobalStore, ["filter", "food", "categories"]),
  },
  components: { FoodCard },
  methods: {
    ...mapActions(useGlobalStore, ["fetchFood", "fetchCategories"]),
  },
  async created() {
    await this.fetchFood();
    await this.fetchCategories();
  }
};
</script>

<template>
  <!-- <FoodCard :favorite="true" :data="{}"/>
  <router-link to="/world">
    World
  </router-link> -->
  <section>
    <h1>Homepage</h1>
    <div class="container flex">
      <div class="filters">
	<form class="filter-category">
	  <div class="filter-title">
	    <h3>Food Category</h3>
	  </div>
	  <div v-for="(data, i) in categories" :key="data.id" class="flex">
	    <div class="grow">
	      <label :for="data.name">{{ data.name }}</label>
	    </div>
	    <div>
	      <input v-model="filter.category" type="checkbox" name="category" :value="data.id" :id="data.name">
	    </div>
	  </div>
	</form>
	<form @submit.prevent="filter">
	  
	</form>
	<form @submit.prevent="filter">
	  
	</form>
      </div>
      <div class="food-container flex wrap">
	<FoodCard v-for="(data, i) in food" :key="data.id" :data="data" :favorite="false" />
      </div>
    </div>
  </section>
</template>

<style>
.flex {
  display: flex;
}

div.food-container {
}

.wrap {
  flex-wrap: wrap;
}

.grow {
  flex-grow: 1;
}

.filter-title {
  padding: 0px 10px;
  font-size: large;
}

.filters {
  width: 500px;
  margin-right: 20px;
}

.filters form {
}

.filters form div:not(.filter-title) {
  background-color: aliceblue;
  margin: 4px;
  padding: 4px 8px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
