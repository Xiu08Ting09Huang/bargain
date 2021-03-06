// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue"
import App from "./App"
import router from "./router"
import Mint from "mint-ui";
import 'mint-ui/lib/style.css'
import "./assets/mui/css/mui.css"
// import "./assets/mui/css/icons-extra.css"
import './assets/mui/fonts/mui.ttf'
import mui from "./assets/mui/js/mui"    
import getRem from "./assets/getRem"

Vue.use(Mint);

Vue.config.productionTip = false

Vue.prototype.getRem = getRem
Vue.prototype.mui = mui
import store from "./store"

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>",
  store
})
