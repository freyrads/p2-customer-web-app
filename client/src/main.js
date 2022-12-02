import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {useGlobalStore} from './stores/global'

const app = createApp(App)

// enable router access inside stores
const pinia = createPinia()
pinia.use(({ store }) => { store.router = markRaw(router) });
app.use(pinia)

app.use(createPinia())

router.beforeEach((to, from, next) => {
  const { user } = useGlobalStore();

  if (!["home", "login", "signup"].includes(to.name)) {
    if (!user) {
      return next("/login");
    }
  }

  next();
});

app.use(router)

app.mount('#app')
