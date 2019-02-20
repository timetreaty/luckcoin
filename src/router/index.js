import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home'
import Mine from '../components/mine'
import My_assets from '../components/my_assets'
import Buy_bidt from '../components/buy_bidt'
import Record from '../components/record'
import Betting from '../components/betting'
import Confirm from '../components/confirm'
import Lotteryhistory from '../components/lotteryhistory'
import Game_description from '../components/game_description'

import Login from '../components/user/login'
import Findpassword from '../components/user/findpassword'
import Reg from '../components/user/reg'
import Authentication from '../components/user/qksfrz'
import Setpassword from '../components/user/setpassword'
import FindBlockID from '../components/user/findBlockID'

Vue.use(Router)

export default new Router({
	mode: "history",
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
    	path: '/login',
      	name: 'Login',
      	component: Login
    },
    {
    	path: '/findpassword',
      	name: 'Findpassword',
      	component: Findpassword
    },
    {
    	path: '/reg',
      	name: 'Reg',
      	component: Reg
    },
    {
    	path: '/authentication',
      	name: 'Authentication',
      	component: Authentication
    },
    {
    	path: '/setpassword',
      	name: 'Setpassword',
      	component: Setpassword
    },
    {
    	path:'/findBlockID',
    	name:'FindBlockID',
    	component:FindBlockID
    },
//  {
//  	path: '/home',
//    	name: 'Home',
//    	component: Home
//  },
    {
    	path:'/mine',
    	name:'Mine',
    	component:Mine
    },
    {
    	path:'/my_assets',
    	name:'My_assets',
    	component:My_assets
    },
    {
    	path:'/buy_bidt',
    	name:'Buy_bidt',
    	component:Buy_bidt
    },
    {
    	path:'/record',
    	name:'Record',
    	component:Record
    },
    {
    	path:'/betting',
    	name:'Betting',
    	component:Betting
    },
    {
    	path:'/confirm',
    	name:'Confirm',
    	component:Confirm
    },
    {
    	path:'/lottery_history',
    	name:'Lotteryhistory',
    	component:Lotteryhistory
    },
    {
    	path:'/game_description',
    	name:'Game_description',
    	component:Game_description
    }
  ],
  scrollBehavior (to, from, savedPosition) {
	  return { x: 0, y: 0 }
	}
})
