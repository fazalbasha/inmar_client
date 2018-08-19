// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import Contacts from './components/contacts/Contacts'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import DrawerLayout from 'vue-drawer-layout'
import '@/styles/index.scss' // global css

Vue.use(DrawerLayout)

Vue.use(ElementUI, {
  size: 'medium' // set element-ui default size
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Contacts },
  template: '<Contacts/>'
})
