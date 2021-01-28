import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import MuseUI from 'muse-ui'
import Toast from 'muse-ui-toast'
import App from './components/page/App.vue'
import router from './router/router'
import theme from 'muse-ui/lib/theme'
import 'muse-ui/dist/muse-ui.css'
import Axios from 'axios'
import store from '@/store/index.js'
import CustomTheme from '@/components/theme'


Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(MuseUI)
Vue.use(Toast)

Axios.defaults.withCredentials = true
Vue.prototype.$axios = Axios


// theme.use('dark')
theme.use('light')

new Vue({
    render: r=>r(App, 'mu-button', {}, 'Hello World'),
    router,
    store
}).$mount('#app')