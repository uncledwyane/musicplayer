import VueRouter from 'vue-router'
import Login from '@/components/page/Login'
import Home from '@/components/page/Home'
import MyInfo from '@/components/page/MyInfo'
import Homepage from '@/components/page/Homepage'
import Favorate from '@/components/component/Favorate'
import PlayDetail from '@/components/page/PlayDetail'

export default new VueRouter({
    // mode: 'history',
    routes: [
        {path: '/', name: '/', redirect: '/login'},
        {path: '/login', name: 'login', component: Login},
        {path: '/home', name: 'home', component: Home, redirect: '/home/homepage', children: [
            {path: 'myinfo', component: MyInfo},
            {path: 'homepage', component: Homepage},
            {path: 'favorate', component: Favorate},
            {path: 'playdetail/:id', component: PlayDetail}
        ]},
    ]
})