import Vue from 'vue'
import Router from 'vue-router'
const Layout = resolve => require(['@/components/layouts/Layout'], resolve);
const publicSale = resolve => require(['@/components/pages/publicSale'], resolve)


Vue.use(Router)
const router = new Router({
    mode: 'history',
    routes: [{
        path: '/',
        component: Layout,
        children: [{
            path: '',
            name: 'publicSale',
            component: publicSale,
            meta: []
        },

        ]
    }]
})

export default router
