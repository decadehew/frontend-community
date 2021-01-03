import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue'),
    beforeEnter: (to, from, next) => {
      if (from.name === 'Login') {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/forget',
    name: 'Forget',
    component: () => import('../views/Forget.vue')
  },
  {
    path: '/',
    name: '',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        name: 'Index',
        component: () => import('../views/channels/Index.vue')
      },
      {
        path: '/index/:catalog',
        name: 'Catalog',
        component: () => import('../views/channels/Template1.vue')
      }
    ]
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'layui-this',
  routes
})

export default router
