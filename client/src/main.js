import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import {useGlobalStore} from './stores/global'

const app = createApp(App)

app.use(createPinia())

// router.beforeEach((to, from, next) => {
//   const { user } = useGlobalStore();
// 
//   if (!["login", "signup"].includes(to.name)) {
//     if (!user) {
//       return next("/login");
//     }
//   }
// 
//   next();
// });

app.use(router)

app.mount('#app')
