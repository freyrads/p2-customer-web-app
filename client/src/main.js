import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

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
      return next("/login");
    }
  }

  next();
});

app.use(router)

app.mount('#app')
