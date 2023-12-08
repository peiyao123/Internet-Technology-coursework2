import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/layout/login'
import Main from '@/layout/main'
import Blogs from '@/layout/main/content/blogs'
import Users from '@/layout/main/content/users'
import Comments from '@/layout/main/content/comments'
import Check from '@/layout/main/content/check'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/main',
    name: 'Main',                            
    component: Main,
    children:[
      {
        path: 'blogs',
        name: 'Blogs',                            
        component: Blogs,
      },
      {
        path: 'users',
        name: 'Users',                            
        component: Users,
      },
      {
        path: 'comments',
        name: 'Comments',                            
        component: Comments,
      },
      {
        path: '',
        name: 'Check',                            
        component: Check,
      }
    ]
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由前置守卫
router.beforeEach((to, from, next) => {
    if(to.name != 'Login' && !sessionStorage.getItem('token')){
      next('/')
    }else{
      next()
    }
})


export default router
