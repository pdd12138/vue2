import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css'
import store from './store';
Vue.use(Vant)
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate(){
    Vue.prototype.$bus = this
  }
}).$mount('#app')

