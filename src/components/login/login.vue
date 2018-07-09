<template>
    <div class="bgcolor" >
        <img class="logo" src="https://tango.heeyhome.com/images/icon_chixiang.png" alt="">
        <img class="icontext" src="https://tango.heeyhome.com/images/img_slogen.png" alt="">
        <!-- <div class="btn-sq" @click="See('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd8e37fb96f38f963&redirect_uri=https%3a%2f%2ftango007.heeyhome.com%2fMP_verify_jWAc7mPQcm1jWwpP.txt&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect')"><img src="https://tango.heeyhome.com/images/icon_weixin.png" alt=""> <span>微信用户快速登录</span> </div> -->
        <div class="btn-sq" @click="See('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd8e37fb96f38f963&redirect_uri=https%3a%2f%2ftango007.heeyhome.com%2f%23%2fbargain%2f'+id+'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect')">
          <img src="https://tango.heeyhome.com/images/icon_weixin.png" alt=""> 
          <span>微信用户快速登录</span>
         </div>
    </div>
    
</template>

<script>
import { userLogin } from "api/http";
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      id: localStorage.getItem('loginId')
    };
  },
  methods: {
     See (e) {
        window.location.href = e
      },
  },
  mounted(){
    this.getRem(750,100)
  },
  created(){
    
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .bgcolor{
    width: 100%;
    height: 100%;
    background-color: #fff;
    overflow: hidden;
    .logo{
      display: block;
      width: 1.9rem;
      height: 3rem;
      margin: .98rem auto 0;
    }
    .icontext{
      display: block;
      width: 3.1rem;
      height: .9rem;
      margin: 1.6rem auto;
    }
    .btn-sq{
      background-color: #ec6800;
      color: #fff;
      width: 5.6rem;
      height: .86rem;
     border-radius: .06rem;
      vertical-align: -webkit-baseline-middle;
      margin: 0 auto;
      position: relative;
      span{
         line-height: .86rem;
         font-size: .3rem;
         padding-left:  .58rem;
      }
      img{
        // vertical-align: -webkit-baseline-middle;
        width: .46rem;
        height: .38rem;
        position: absolute;
        left: 1.28rem;
        top: .24rem;
      }
    }
  }
</style>
