<script>
import {mapActions, mapWritableState} from 'pinia';
import FoodCard from '../components/FoodCard.vue';
import {useFilterStore} from '../stores/filter';
import {useGlobalStore} from '../stores/global';
// import { vue3Debounce } from "vue-debounce";

export default {
  // directives: {
  //   debounce: vue3Debounce({
  //     lock: true,
  //     listenTo: ['input', 'keyup']
  //   }),
  // },
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
      ...mapWritableState(useGlobalStore, ["food", "categories", "pageInfo"]),
      ...mapWritableState(useFilterStore, ["filter", ]),
  },
  components: { FoodCard },
  methods: {
    ...mapActions(useGlobalStore, ["fetchFood", "fetchCategories"]),
    changePage(page) {
      this.fetchFood(this.filter);
    }
  },
  async created() {
    await this.fetchFood();
    await this.fetchCategories();

    const store = useFilterStore();

    store.$subscribe((mutation, state) => {
      if (state.filter) {
	this.fetchFood(
	  store.filter
	);
      }
    })
  }
};
</script>

<template>
  <section>
    <div class="page-title">
      <h1>Homepage</h1>
    </div>
    <div class="container flex">
      <div class="filters">
	<form @submit.prevent="" class="filter-category">
	  <div class="filter-title">
	    <h3>Food Category</h3>
	  </div>
	  <div v-for="(data, i) in categories" :key="data.id" class="flex gb">
	    <div class="grow">
	      <label :for="data.name">{{ data.name }}</label>
	    </div>
	    <div>
	      <input v-model="filter.category" type="checkbox" name="category" :value="data.id" :id="data.name">
	    </div>
	  </div>
	</form>
	<form @submit.prevent="" class="filter-name">
	  <div class="filter-title">
	    <h3>Search</h3>
	    <div>
	      <!-- v-debounce:300ms="fetchFood(filter)"  -->
	      <input v-model="filter.name" type="text" name="name" placeholder="Search" class="w100">
	    </div>
	  </div>
	</form>
      </div>
      <div class="div-food-container">
	<div class="food-container flex wrap">
	  <FoodCard v-for="(data, i) in food" :key="data.id" :data="data" favorite/>
	</div>
	<div class="btn-paginate-container flex center">
	  <vue-awesome-paginate v-if="pageInfo.totalItems && filter.page"
	    :total-items="pageInfo.totalItems"
	    v-model="filter.page"
	    :items-per-page="pageInfo.itemsPerPage"
	    :max-pages-shown="1"
	    :on-click="changePage"
	    :hide-prev-next-when-ends="true"
	    :show-ending-buttons="true"
	  />
	  <div v-else>
	    <h1>Nothing found...</h1>
	  </div>
	</div>
      </div>
    </div>
  </section>
</template>

<style>
.flex {
  display: flex;
}

.w100 {
  width: 96%;
}

.pagination-container {
  gap: 12px;
}

.paginate-buttons {
  border: 2px solid black;
  padding: 20px;
  background-color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
}

.active-page {
  background-color: black;
  border: 2px solid aliceblue;
  color: white;
}

.paginate-buttons:hover {
  background-color: aliceblue;
  box-shadow: 0px 0px 4px 0px;
}

.active-page:hover {
  border: 2px solid black;
  color: black;
}

.wrap {
  flex-wrap: wrap;
}

.grow {
  flex-grow: 1;
}

.center {
  justify-content: center;
}

.filter-title {
  padding: 0px 20px;
  font-size: large;
}

.filters {
  min-width: fit-content;
  height: fit-content;
  margin: 10px;
  background-color: silver;
  box-shadow: 0px 0px 10000px grey;
}

.filters {
  padding-bottom: 21px;
}

.filters form div.gb {
  background-color: #dde4e9;
  margin: 4px;
  padding: 4px 8px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
