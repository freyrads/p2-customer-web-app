import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import Swal from "sweetalert2";
import VueAwesomePaginate from "vue-awesome-paginate";

// import the necessary css file
import "vue-awesome-paginate/dist/style.css";

// Register the package

const app = createApp(App)
app.use(VueAwesomePaginate)

// enable router access inside stores
const pinia = createPinia()
pinia.use(({ store }) => {
  store.router = markRaw(router);
});
app.use(pinia)

router.beforeEach((to, from, next) => {
  const access_token = localStorage.getItem("access_token");

  if (!["home", "login", "signup"].includes(to.name)) {
    if (!access_token) {
	Swal.fire({
	  position: 'top-end',
	  icon: 'error',
	  title:  "Please login first",
	  showConfirmButton: false,
	  timer: 5000,
	  timerProgressBar: true,
	});
      return next("/login");
    }
  }
  else if (["login",].includes(to.name)) {
    if (access_token) {
      return next(from.path);
    }
  }

  next();
});

app.use(router)

app.mount('#app')
