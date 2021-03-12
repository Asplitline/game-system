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
const aAddPost = () => import(/*  webpackChunkName: "admin_addPost" */ '@/components/admin/post/addPost')
const aUser = () => import(/*  webpackChunkName: "admin_user" */ '@/components/admin/user/User')
const aNotice = () => import(/*  webpackChunkName: "admin_notice" */ '@/components/admin/notice/Notice')

// -
const Login = () => import(/*  webpackChunkName: "login_home_admin" */ '@/components/Login')
// -
const Error = () => import(/*  webpackChunkName: "error" */ '@/components/common/Error')

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
    redirect: '/_user',
    children: [
      { path: '/_category', component: aCategory },
      { path: '/_comment', component: aComment },
      { path: '/_game', component: aGame },
      { path: '/_log', component: aLog },
      { path: '/_post', component: aPost },
      { path: '/_AddPost', component: aAddPost },
      { path: '/_user', component: aUser },
      { path: '/_notice', component: aNotice }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'Error',
    component: Error
  }
]

const router = new VueRouter({
  routes
})

export default router
