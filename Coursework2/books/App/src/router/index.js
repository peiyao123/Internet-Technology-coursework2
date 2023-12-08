import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/layout/home'
import Login from '@/layout/login'
import Write from '@/layout/write'
import ArticleDetial from '@/layout/articleDetial'
import Books from '@/layout/books'
import Search from '@/layout/searchPage'
import About from '@/layout/about'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta:{
      isShowHeader:true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta:{
      isShowHeader:false
    }
  },
  {
    path: '/write',
    name: 'Write',
    component: Write,
    meta:{
      isShowHeader:true
    }
  },
  {
    path: '/articleDetial',
    name: 'ArticleDetialite',
    component: ArticleDetial,
    meta:{
      isShowHeader:true
    }
  },
  {
    path: '/books',
    name: 'Books',
    component: Books,
    meta:{
      isShowHeader:true
    }
  },
  {
    path: '/search',
    name: 'Search',
    component: Search,
    meta:{
      isShowHeader:true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta:{
      isShowHeader:true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由前置守卫
router.beforeEach((to, from, next) => {
  if(to.name === 'Write' && !localStorage.getItem('token')){
    next('/login')
  }else{
    next()
  }
})

export default router
