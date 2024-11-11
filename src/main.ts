import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import './style.css'


const app = createApp(App)
app.use(router)

const pinia = createPinia()
app.use(pinia)

// a .config object allows us to configure a few app-level options
app.config.errorHandler = (err) => {
   /* handle error */

   const err_obj = err as Error
   console.log('App Error:',err_obj.message)
}


app.mount('#app')