import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import vuetify from './plugins/vuetify'

import App from './components/page/App.vue'

Vue.use(VueRouter)
Vue.use(Vuex)

new Vue({
    render: r=>r(App),
    vuetify
}).$mount('#app')