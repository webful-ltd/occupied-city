import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css'
import 'leaflet.awesome-markers'
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css'
import '../css/main.css'

// Import components
import Home from './components/Home.vue'
import City from './components/City.vue'
import About from './components/About.vue'
import Contact from './components/Contact.vue'

// Setup router
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
      meta: { pageTitle: 'Contact Us' }
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      meta: { pageTitle: 'About' }
    },
    {
      path: '/:city/:year?',
      name: 'city',
      component: City
    }
  ]
})

// Update page title on route change
router.afterEach((to) => {
  document.title = to.meta.pageTitle
    ? `${to.meta.pageTitle} - Occupied City`
    : 'Occupied City'
})

// Create and mount app
const app = createApp(App)
app.use(router)
app.mount('#app')

// Google Analytics
window.ga = window.ga || function() { (ga.q = ga.q || []).push(arguments) }
ga.l = +new Date()
ga('create', 'UA-44087370-5', 'auto')
ga('send', 'pageview')

router.afterEach(() => {
  ga('send', 'pageview')
})
