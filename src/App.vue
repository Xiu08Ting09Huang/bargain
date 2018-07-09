<template>
  <div id="app">
     <!-- <mt-header fixed :title="title" >
            <mt-button @click="$router.go(-1)" slot="left" icon="back" v-if="$route.path == '/home' ? false : true "></mt-button>
        </mt-header> -->
    <router-view/>
    <nav class="mui-bar mui-bar-tab" v-show="show">
      <router-link class="mui-tab-item-cx" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">砍价商城</span>
      </router-link>
      <router-link class="mui-tab-item-cx" to='/bargainList/underfined'>
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label ">我的砍价</span>
      </router-link>  
    </nav>
  </div>
</template>

<script>
import slide from "@/components/common/slide.js"
export default {
  name: 'App',
  data(){
    return {
      title:'',
      show:false
    }
  },
  methods: {
    getToken(){
      
    }
  },
  watch: {
    $route() {
       if(this.$route.path=='/home'){
      // this.title = '砍价商城'
      document.title = '砍价商城'
      this.show = true
    } else if(this.$route.path.slice(1,12)=='goodsDetail'){
      // this.title = '商品详情'
      document.title = '商品详情'
      this.show = false
    } else if (this.$route.path.slice(1,12) == "bargainList"){
      // this.title = '我的砍价'
      document.title = '我的砍价'
      this.show = true
    } else if (this.$route.path == '/erweimaList' || this.$route.path.slice(1,25) == 'erweimaList/erweimaDetail'){
      // this.title = '我的核销码'
      document.title = '我的核销码'
      this.show = true
    } else if (this.$route.path.slice(1,9) == 'bargain/'){
      // this.title = '砍价赢免单'
      document.title = '砍价赢免单'
      this.show = false
    } else if (this.$route.path == '/login'){
      // this.title = '用户授权'
      document.title = '用户授权'
      this.show = false
    }
    }
  },
  created(){
    slide()
    // console.log(this.$route.params)
     if(this.$route.path=='/home'){
      // this.title = '砍价商城'
      document.title = '砍价商城'
      this.show = true
    } else if(this.$route.path.slice(1,12)=='goodsDetail'){
      // this.title = '商品详情'
      document.title = '商品详情'
      this.show = false
    } else if (this.$route.path.slice(1,12) == "bargainList"){
      // this.title = '我的砍价'
      document.title = '我的砍价'
      this.show = true
    } else if (this.$route.path == '/erweimaList' || this.$route.path.slice(1,25) == 'erweimaList/erweimaDetail'){
      // this.title = '我的核销码'
      document.title = '我的核销码'
      this.show = true
    } else if (this.$route.path.slice(1,9) == 'bargain/'){
      // this.title = '砍价赢免单'
      document.title = '砍价赢免单'
      this.show = false
    } else if (this.$route.path == '/login'){
      // this.title = '用户授权'
      document.title = '用户授权'
      this.show = false
    }
  },
   mounted(){
    this.getRem(750, 100)
  },
  
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* max-width: 750px; */
  background-color: #f4f4f4;
  height: 100%;
  margin: 0 auto;
}
.top{
  padding-bottom: .8rem; 
}
*{
  margin: 0;
  padding: 0;
}
body,html{
  height: 100%;
}
body{
  line-height: normal;
}
.mui-bar-tab .mui-tab-item-cx.mui-active {
  color: #ff3740;
}
.mint-header{
  background-color: #fff;
  color: #333;
  font-size: .28rem;
  height: .8rem;
  border-bottom: 1px solid #eee;
  z-index: 666;
}
.mint-header.is-fixed{
  z-index: 666;
}
.mintui{
  font-size: .32rem;
}
.mui-bar-tab .mui-tab-item-cx .mui-icon{
  top: .14rem;
  width: .44rem;
  height: .44rem;
  padding-top: 0;
  padding-bottom: 0;
  font-size: .44rem;
  margin-bottom: 0.05rem;
}
.mui-bar-tab .mui-tab-item-cx {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: .98rem;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}


.mui-bar-tab .mui-tab-item-cx .mui-icon ~ .mui-tab-label {
    font-size: .22rem;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: .3rem;
    height: .3rem;
}
.mui-tab-label{
  margin-top: .12rem;
}
.mui-bar .mui-icon{
  font-size: .48rem
}
</style>
