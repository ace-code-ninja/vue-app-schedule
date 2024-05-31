import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

import UserLayout from './layouts/UserLayout.vue'
import EmptyLayout from './layouts/EmptyLayout.vue'
import DashboardLayout from './layouts/DashboardLayout.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import * as solid_icons from '@fortawesome/free-solid-svg-icons'

//Specifically add in the icons we need
library.add(
  solid_icons.faQuestionCircle,
  solid_icons.faHeartPulse,
  solid_icons.faExclamationCircle,
  solid_icons.faCoffee,
  solid_icons.faBurger,
  solid_icons.faToilet,
  solid_icons.faTelevision,
  solid_icons.faGlassWater,
  solid_icons.faCarrot,
  solid_icons.faPersonWalking,
  solid_icons.faPeopleGroup
)

const app = createApp(App)

app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('AdminLayout', DashboardLayout)
app.component('UserLayout', UserLayout)
app.component('EmptyLayout', EmptyLayout)
app.mount('body')
