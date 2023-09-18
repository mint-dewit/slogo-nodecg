import { createHead } from '@vueuse/head'
import { createApp } from 'vue'

import App from './main/main.vue'
import './assets/graphic.css'

const app = createApp(App)
const head = createHead()
app.use(head)
app.mount('#app')
