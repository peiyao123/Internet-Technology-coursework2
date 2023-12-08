import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { createPinia, PiniaVuePlugin } from 'pinia'
import '@/assets/css/reset.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(PiniaVuePlugin)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

new Vue({
  router,
  pinia,
  render: function (h) { return h(App) }
}).$mount('#app')
