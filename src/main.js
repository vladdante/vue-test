import Vue from 'vue'
import App from './App'
import store from './stores/index'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
