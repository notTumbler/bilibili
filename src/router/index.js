import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import register from '@/views/register'

Vue.use(VueRouter)

  const routes = [
  {
    path:'/register',
    name:'register',
    component:() => import ('@/views/register')
  },
  {
    path:'/Login',
    name:'Login',
    component:() => import ('@/views/Login')
  },
  {
    path:'/userinfo',
    name:'userinfo',
    component:() => import('@/views/userinfo'),
    meta:{
      istoken:true
    }
  },
  {
    path:'/edit',
    name:'edit',
    component:() => import('@/views/edit'),
    meta:{
      istoken:true
    }
  },
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    name:'home',
    component:() => import('@/views/Home'),
    meta:{
      keepalive:true
    }
  },
  {
    path:'/article/:id',
    name:'article',
    component:() => import('@/views/Article')
  },
  {
    path:'/editcategory',
    name:'editcategory',
    component:() => import('@/views/editCategory')
    
  }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

router.beforeEach((to,from,next) => {
  if (to.meta.istoken===true&&!localStorage.getItem('token')&&!localStorage.getItem('id')) {
    router.push('/login');
    return;
  }
  next();
})

export default router
