import Vue from 'vue'
import VueRouter from 'vue-router'

// -
const Home = () => import(/*  webpackChunkName: "login_home_admin" */ '@/components/Home')
// --
const Game = () => import(/*  webpackChunkName: "home_game" */ '@/components/home/game/Game')
const Index = () => import(/*  webpackChunkName: "home_index" */ '@/components/home/index/Index')
const info = () => import(/*  webpackChunkName: "home_info" */ '@/components/home/info/Info')
const Rank = () => import(/*  webpackChunkName: "home_rank" */ '@/components/home/rank/Rank')
const Share = () => import(/*  webpackChunkName: "home_share" */ '@/components/home/share/Share')

// -
const Admin = () => import(/*  webpackChunkName: "login_home_admin" */ '@/components/Admin')
// --
const aCategory = () => import(/*  webpackChunkName: "admin_category" */ '@/components/admin/category/Category')
const aComment = () => import(/*  webpackChunkName: "admin_comment" */ '@/components/admin/comment/Comment')
const aGame = () => import(/*  webpackChunkName: "admin_game" */ '@/components/admin/game/Game')
const aLog = () => import(/*  webpackChunkName: "admin_log" */ '@/components/admin/log/Log')
const aPost = () => import(/*  webpackChunkName: "admin_post" */ '@/components/admin/post/Post')
const aUser = () => import(/*  webpackChunkName: "admin_user" */ '@/components/admin/user/User')

// -
const Login = () => import(/*  webpackChunkName: "login_home_admin" */ '@/components/Login')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    children: [
      { path: '/game', component: Game },
      { path: '/index', component: Index },
      { path: '/info', component: info },
      { path: '/rank', component: Rank },
      { path: '/share', component: Share }
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    redirect: '/user',
    children: [
      { path: '/category', component: aCategory },
      { path: '/comment', component: aComment },
      { path: '/game', component: aGame },
      { path: '/log', component: aLog },
      { path: '/post', component: aPost },
      { path: '/user', component: aUser }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
