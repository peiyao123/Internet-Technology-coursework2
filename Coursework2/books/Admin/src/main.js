import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(PiniaVuePlugin)

const pinia = createPinia()

new Vue({
  router,
  pinia,
  render: function (h) { return h(App) }
}).$mount('#app')
