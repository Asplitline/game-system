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
// --
const GameDetail = () => import(/*  webpackChunkName: "home_game" */ '@/components/home/game/GameDetail')
const AddPost = () => import(/*  webpackChunkName: "home_share" */ '@/components/home/share/AddPost')
const PostDetail = () => import(/*  webpackChunkName: "home_share" */ '@/components/home/share/PostDetail')
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
    name: 'Index',
    redirect: '/login'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    redirect: '/index',
    children: [
      { path: '/game', component: Game },
      { path: '/game/:id', component: GameDetail, props: true },
      { path: '/index', component: Index },
      { path: '/info', component: info },
      { path: '/rank', component: Rank },
      { path: '/share', component: Share },
      { path: '/share/:id', component: PostDetail, props: true },
      { path: '/addPost', component: AddPost }
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
      { path: '/_dPost/:id', component: aAddPost, props: true },
      { path: '/_dPost', component: aAddPost, props: true },
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
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  switch (to.path) {
    case '/_category':
    case '/_comment':
    case '/_game':
    case '/_log':
    case '/_post':
    case '/_AddPost':
    case '/_user':
    case '/_notice':
      window.sessionStorage.setItem('aCurrentIndex', to.path)
      break
    case '/game':
    case '/index':
    case '/info':
    case '/rank':
    case '/share':
      window.sessionStorage.setItem('hCurrentIndex', to.path)
      break
  }
  if (sessionStorage.getItem('currentUser') === null) {
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
