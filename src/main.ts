import { createApp } from 'vue'
import 'element-plus/es/components/notification/style/css'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/permission"

const app = createApp(App);
app.use(store).use(router).mount('#app')