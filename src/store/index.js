import Vue from "vue"
// 引入vuex插件
import Vuex from "vuex";
Vue.use(Vuex);

// 从localstorage中读取购物车信息
function readCartsFromStorage() {
    var openId = localStorage.getItem("openId");
    // var id = localStorage.getItem('id')
    // console.log(window.location.hash.split('#')[1].split("/")[2])
    if (openId == null || openId.trim() == "" || openId == "") {
        return ''
    } else {
        return openId;
    }
} 

export default new Vuex.Store({
    state:{
        openId:  readCartsFromStorage(),
        id: JSON.parse(localStorage.getItem('id')),
        userName:localStorage.getItem('userName'),
        headerImg:localStorage.getItem('headerImg'),
        bargainId:JSON.parse(localStorage.getItem("shopBargainID")),
        end : JSON.parse(localStorage.getItem('end')),
        token: "",
        ticket: localStorage.getItem('tictet'),
        firstCut: ""
    },
    getters:{
       
    }
})