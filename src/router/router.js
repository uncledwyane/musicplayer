import VueRouter from 'vue-router'
import Login from '../components/component/Login.vue'
import Home from '../components/component/Home.vue'
export default new VueRouter({
    // mode: 'history',
    routes: [
        {path: '/', name: '/', redirect: '/login'},
        {path: '/login', name: 'login', component: Login},
        {path: '/home', name: 'home', component: Home},
    ]
})