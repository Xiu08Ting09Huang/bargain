<template>
    <div class="top buttom">
        <!-- 弹框 -->
        <div class="modal" v-if="show">
            <div class="bgImg">
                <img class="bgImg-1" src="https://tango.heeyhome.com/images/img_pop.png" alt="">
                <img class="bgImg-2" src="https://tango.heeyhome.com/images/icon_coin.png" alt="">
                <div class="bgImg-text">
                     <p class="text  mui-ellipsis" >您帮用户{{listRecord[listRecord.length-1].user.userName}}砍掉了{{cutPrice}}元</p>
                     <div class="share" @click="shareClick">分享好友多砍一刀</div>
                     <div class="share join" @click="$router.push('/home')">我也要参加</div>
                     <img class="back" src="https://tango.heeyhome.com/images/icon_back.png" alt="" @click="closed">
                </div>  
            </div>
        </div>
          <!-- 分享好友的弹窗 -->
        <div class="shareModel" @click="closeShow" v-show="share" >
          <img class="shareCut" src="https://tango.heeyhome.com/images/砍价成功弹窗.png" alt="">
          <img class="arrow" src="https://tango.heeyhome.com/images/箭头.png" alt="">
          <p class="text">已砍<span>{{goodsInfo.cutPrice}}</span>元，点击右上角召唤好友帮忙砍价哦~</p>
          
        </div>
        <!-- 砍价中的弹窗 -->
        <div class="cutting" v-if="cuttingShow">
            <div class="bgImg">
                 <img class="bgImg-1" src="https://tango.heeyhome.com/images/帮砍价弹窗砍价中.gif" alt="">
            </div>
        </div>
        <div class="bgimg">
            <!-- <img src="https://tango.heeyhome.com/images/bargain.png" alt=""> -->

            <div class="rule" @click="ruleShow()" >
               
            </div>
            <div class="modal-rule" v-show="ruleshow">
                <div class="rule-info">
                    <div class="title">活动规则</div>
                    <div class="warp-text">
                          <p>1、邀请好友一起砍价，有效时间内砍到0元，即可免费领取该商品；</p>
                        <p>2、砍价成功后系统会生成二维码，请前往商铺出示二维码核销领取；</p>
                        <p>3、每次砍价金额随机，越多好友参加越容易成功；</p>
                        <p>4、这个规则要最终确定的，这个规则要最终确定的，这个规则要最终确定的；</p>
                    </div>
                    <div class="btn-know" @click="closeShow">
                        我知道了
                    </div>
                </div>
            </div>
           
        </div>
        <div class="bargainInfo">
            <div class="headInfo">
                <img :src="listRecord[listRecord.length-1].user.userHeadImage" alt="">
                <div class="textInfo"> 来不及解释了，老铁快帮我砍价！</div>
            </div>
            <div class="shop">
                <p class="title mui-ellipsis">{{goodsInfo.goodsName}}</p>
                <p class="prc"> 原价 ￥{{goodsInfo.goodsPrice}}</p>
                <img :src="goodsInfo.goodsImage" alt="">
            </div>
            <div class="timeInfo"> 
                <div class="bgBox"></div>
                <div class="count-down">砍价截止倒计时
                    <!-- <i class="left-kg">00</i> : <i>58</i> : <i>00</i>  -->
                     <count-down class="left-kg"  v-on:end_callback="countDownE_cb(1)" :currentTime="nowTime" :startTime="nowTime" :endTime="end"  :hourTxt="':'" :minutesTxt="':'" :secondsTxt="''"></count-down> 
                </div>
                <div class="count-down-prc"> 已砍金额：<i> {{goodsInfo.cutPrice}}.00</i> </div>
                <div class="count-down-schedule">
                    <p> 
                     <i class="mui-pull-left">￥{{goodsInfo.goodsPrice}}原价</i> 
                     <span class="warp">
                        <span class="hide"></span>
                        <span class="absolute" :style="'width:'+ percentage + '%' " ></span>  
                     </span>
                     
                     <i class="mui-pull-right">￥{{goodsInfo.goodsLowPrice}} 免单</i>  
                    </p>
                </div>
                <div class="btn">
                    <div class="success-btn" v-show="cutSuccsess">砍价成功</div>
                    <div class="success-btn" @click="call" v-show="!cutSuccsess" >帮TA砍价</div>
                    <div class="success-btn join" @click="goToHome">我也要参加</div>
                </div>
            </div>
            <div class="recordInfo"> 
                <div class="bgBox"></div>
                <div class="recordTitle">
                    <img src="https://tango.heeyhome.com/images/img_detail_left.png" alt="">
                    <span>砍价记录</span> 
                    <img src="https://tango.heeyhome.com/images/img_detail_right.png" alt="">
                </div>
                <div class="recordInfo-head">
                    <div class="head" v-for="(v,i) in listRecord " :key="i" >
                        <img :src="v.user.userHeadImage" alt="">
                        <span class="nickName  mui-ellipsis">{{v.user.userName}}</span>
                        <span class="prc mui-pull-right"> 已砍{{v.bargainPrice}}元</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { userLogin ,myCutGoods ,cutGoods, getDetailCutGoods , getTicket , getConfig,subscribe} from "api/http"
import CountDown from "@/components/common/initTime.vue";
import wx from "weixin-js-sdk"
import refresh from '@/components/common/pullToRefresh.js'
export default {
    data(){
        return {
            show:false,
            ruleshow: false,
            share:false,
            cuttingShow:false,
            cutPrice:'',
            nowTime: new Date().getTime(),
            listRecord:[],
            goodsInfo:{},
            percentage:0,
            ticket:'',
            accessToken:"",
           // code: window.location.search.slice(1).split('&')[0].split("=")[1],
            invitedUserOpenId:localStorage.getItem('invitedUserOpenId'),
            end : window.location.hash.split('#')[1].split("/")[5],
            flag:localStorage.getItem('flag')
        }
    },
  components: {
    CountDown
  },
    methods:{
        // 获取code
        getcode(){
            if(this.invitedUserOpenId == null || this.invitedUserOpenId == '' || this.$store.state.openId == ''  ){
                if(this.flag != 0){
                    localStorage.setItem('flag',0)
                    window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd8e37fb96f38f963&redirect_uri=https%3a%2f%2ftango007.heeyhome.com%2f%23%2fbargainFriends%2f'+ window.location.hash.split('#')[1].split("/")[2] +'%2f'+ window.location.hash.split('#')[1].split("/")[3] +'%2f'+window.location.hash.split('#')[1].split("/")[4] + '%2f' + window.location.hash.split('#')[1].split("/")[5] +  '%2f&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
                    // console.log(window.location.search.slice(1).split('&')[0].split("=")[1])
                }
                userLogin({
                    jsCode: window.location.search.slice(1).split('&')[0].split("=")[1]
                }).then(res => {
                     console.log(res)
                    if(res.data.code == 200){
                        // 获取被邀请的openID
                        this.invitedUserOpenId = res.data.data.user.userOpenId;
                        localStorage.setItem('invitedUserOpenId',res.data.data.user.userOpenId)
                        localStorage.setItem('headerImg',res.data.data.user.userHeadImage)
                        localStorage.setItem('userName',res.data.data.user.userName)
                    }
                }) 
            } else{
                userLogin({
                    userOpenId:this.invitedUserOpenId || this.$store.state.openId
                }).then(res => {
                     console.log(res)
                    if(res.data.code == 200){
                        // 这边先留着----
                    }else {
                        //  localStorage.setItem('flag',1)
                        if(this.flag != 1){
                            localStorage.setItem('flag',1)
                            window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd8e37fb96f38f963&redirect_uri=https%3a%2f%2ftango007.heeyhome.com%2f%23%2fbargainFriends%2f'+ window.location.hash.split('#')[1].split("/")[2] +'%2f'+ window.location.hash.split('#')[1].split("/")[3] +'%2f'+window.location.hash.split('#')[1].split("/")[4] + '%2f' + window.location.hash.split('#')[1].split("/")[5] +  '%2f&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
                            // console.log(window.location.search.slice(1).split('&')[0].split("=")[1])
                        }
                        userLogin({
                            jsCode: window.location.search.slice(1).split('&')[0].split("=")[1]
                        }).then(res => {
                             console.log(res)
                            if(res.data.code == 200){
                                // 获取被邀请的openID
                                this.invitedUserOpenId = res.data.data.user.userOpenId;
                                localStorage.setItem('invitedUserOpenId',res.data.data.user.userOpenId)
                                localStorage.setItem('headerImg',res.data.data.user.userHeadImage)
                                localStorage.setItem('userName',res.data.data.user.userName)
                            }
                        }) 
                    }
                })
            }
        },
         // 获取token和Ticket
        getTicket(){
            getTicket({
            }).then(res => {
                console.log(res)
                this.accessToken = res.data.data.accessToken;
                this.ticket = res.data.data.ticket;
                 //  好友分享
            getConfig({
                accessToken: res.data.data.accessToken,
                ticket: res.data.data.ticket,
                url:location.href.split('#')[0]
            }).then(res => {
                // alert(location.href.split('#')[0])
                console.log(res)
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: 'wxd8e37fb96f38f963', // 必填，公众号的唯一标识
                    timestamp: res.data.data.timestamp , // 必填，生成签名的时间戳
                    nonceStr: res.data.data.noncestr, // 必填，生成签名的随机串
                    signature: res.data.data.signature,// 必填，签名，见附录1
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
                //处理验证失败的信息
                 wx.error(function (res) {
                    alert(res.errMsg);
                    });
                 wx.ready(() =>{
                      //分享给好友
                    wx.onMenuShareAppMessage({
                        title: "砍价", // 分享标题
                        desc: "快来和我一起参与，免费领取！惊喜不断！", // 分享描述
                        link: "https://tango007.heeyhome.com/#/bargainFriends/" + window.location.hash.split('#')[1].split("/")[2] + "/" + window.location.hash.split('#')[1].split("/")[3] + "/" + window.location.hash.split('#')[1].split("/")[4] + "/" + this.end, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: this.goodsInfo.goodsImage, // 自定义图标
                        type: 'link', // 分享类型,music、video或link，不填默认为link
                        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                        success(){
                          this.share = false
                        },
                        cancel: function () {
                          
                        }
                    })
                 })
            })
            // 判断是否关注公众号
                subscribe({
                    accessToken: this.accessToken,
                    userOpenId: this.invitedUserOpenId
                }).then(res =>{
                    console.log(res)
                    if(res.data.data == 0){
                        window.location.href = "https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzU3NzI4MzQwNA==#wechat_redirect"
                    }
                })
            })
        },
        // // 被邀请人砍价第一刀
        call(){
            // this.show = true
           cutGoods({
                id: window.location.hash.split('#')[1].split("/")[3],
                invitedUserOpenId: window.location.hash.split('#')[1].split("/")[4],
                userOpenId: this.invitedUserOpenId || this.$store.state.openId,
                bargainId: window.location.hash.split('#')[1].split("/")[2]
            })
            .then(res => {
                console.log(res)
                if(res.data.code == 200){
                    this.cutPrice = res.data.data.cutPrice;
                    this.show = true;
                    // 砍价成功后调用刷新页面
                    this.getCutInfo()
                }else if( res.data.code == 212) {
                    this.mui.alert('您已开启了砍价，请分享给好友帮忙砍价')
                    // this.show = false;
                    this.getCutInfo()
                } else if(res.data.code == 213) {
                    this.mui.alert('您已砍过价了，请分享给好友帮忙砍价')
                } else if(res.data.code == 217) {
                    // this.mui.alert('已经有人在砍价，请稍等')
                    this.cuttingShow = true
                    setTimeout(()=>{
                        this.cuttingShow = false
                    },2000)
                } else if (res.data.code == 214){
                    this.mui.alert('砍价已结束')
                } else if (res.data.code == 220){
                    this.mui.alert('您未生成核销码，请确认')
                } else if (res.data.code == 215){
                    this.mui.alert('已经是最低价')
                }else if (res.data.code == 10012){
                   this.mui.alert('商品已砍完')
                } else if (res.data.code == 10018){
                  this.mui.alert('活动已取消')
                } 
            })
        },
        // 获取砍价详情
        getCutInfo(){
            getDetailCutGoods({
                bargainId: window.location.hash.split('#')[1].split("/")[2],
                id: window.location.hash.split('#')[1].split("/")[3]
            }).then(res=>{
                console.log(res)
                if(res.data.code == 200){
                    this.listRecord = res.data.data.listRecord;
                    this.goodsInfo = res.data.data;
                    this.percentage = this.goodsInfo.cutPrice/(this.goodsInfo.goodsPrice-this.goodsInfo.goodsLowPrice) * 100
                    if(this.percentage >= 100){
                        this.cutSuccsess = true
                    }else{
                        this.cutSuccsess = false
                    }
                }else if ( res.data.code == 211 ){
                    this.mui.alert('还未发起砍价，请确认','提示',()=>{
                        this.$router.push('/home'),
                        localStorage.setItem('openId',this.invitedUserOpenId)
                    })
                } else if (res.data.code == 10018){
                    this.mui.alert('活动已结束，请确认','提示',()=>{
                        this.$router.push('/home'),
                        localStorage.setItem('openId',this.invitedUserOpenId)
                    })
                }
                // else {
                //   this.mui.alert('活动已过期，请确认','提示',()=>{
                //         this.$router.push('/home'),
                //         localStorage.setItem('openId',this.invitedUserOpenId)
                //     })
                // }
            })
        },
         //  好友分享
        shareClick(){
          this.share = true
          this.show = false
        },
        ruleShow(){
            this.ruleshow = true;
        },
        closeShow(){
            this.ruleshow = false;
            this.share = false;
            this.linquShow = false;
        },
        closed(){
            this.show = false;
            this.getCutInfo()
        },
        goToHome(){
            this.$router.push('/home'),
            localStorage.setItem('openId',this.invitedUserOpenId)
        }
    },
    mounted() {
        this.getTicket()
          if(this.percentage == 100){
            this.cutSuccsess = true
            }else{
            this.cutSuccsess = false
          }
         // 获取砍价详情
        this.getCutInfo()
        this.getRem(750, 100); 
    },
    created(){
        // 下拉刷新
        refresh()
        this.getcode()
        // 先隐藏，不影响开发，后期要用
        // console.log(window.location.search.slice(1).split('&')[0].split("=")[1])
    },
};
</script>

<style rel="stylesheet/scss" lang="scss" >
$mainColor: #ff3740;
$color: #ecaa00;
.top{
    padding-bottom: 0;
}
.modal,
.cutting{
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 999;
    .bgImg{
        margin-top: .98rem;
        position: relative;
        .bgImg-1{
            width: 6.4rem;
            height: 11rem;
            margin: 0 auto;
        }
        .bgImg-2{
            position: absolute;
            width: 1.88rem;
            height: 1.6rem;
            top: 4.12rem;
            left: 2.81rem;
        }
        .bgImg-text{
            position: absolute;
            top: 6rem;
            width: 100%;
            .text{
                color: #fff;
                font-size: .34rem;
            }
            .share{
                width: 4.5rem;
                height: .8rem;
                background-color: #fe4b37;
                border-radius: .4rem;
                line-height: .8rem;
                margin: .38rem 1.5rem .28rem;
                color: #ffd800;
                border: 0.02rem solid #ecaa00;
            }
            .join{
                background-color: #ecaa00;
                margin-top: 0.24rem;
                color: #624602;
            }
            .back{
                width: .66rem;
                height: .66rem;
                margin-top: .62rem;
            }
        }
    }
}
.bgimg::after{
    content: "";
    display: block;
    width: 7.5rem;
      height: 0.2rem;
      background-color: #ff8601;
      position: absolute;
      top:  4.4rem;
      z-index: 1;
}
.shareModel{
  position: fixed;
  background-color: rgba(0,0,0,.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  .shareCut{
    width: 5.8rem;
    height: 6.1rem;
    margin-top: 1.7rem;
  }
  .arrow{
    position: absolute;
    right: .2rem;
    top: .2rem;
    width: 1.25rem;
    height: 1.99rem;
  }
  .text{
    position: absolute;
    top: 6.16rem;
    left: 1.8rem;
    color: #f1ffda;
    font-size: .34rem;
    line-height: .52rem;
    width: 4rem;
    span{
      color: #feed33;
    }
  }
  
}
.bgimg {
  height: 4.52rem;
  background: url("https://tango.heeyhome.com/images/bargain.png") no-repeat;
  background-size: 7.5rem;
  position: relative;
  .rule{
      background: url("https://tango.heeyhome.com/images/btn_guize.png") no-repeat;
      background-size: .58rem 1.62rem;
      width: .58rem;
      height: 1.62rem;
      color: #fff;
      font-size: .24rem;
      position: absolute;
      right: 0;
      top: 2.26rem;
      
  }
  .modal-rule{
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 999;
      background-color: rgba(0,0,0,.5);
  }
  .rule-info{
      width: 5.87rem;
    //   height: 8.4rem;
      background-color: #fff;
      border-radius: .2rem;
      margin: 1.5rem auto;
      padding-bottom: .42rem;
      .title{
          background-color: #fa7237;
          height: .96rem;
           border-radius: .2rem .2rem 0 0;
           line-height: .96rem;
           color: #fff;
           font-size: .34rem;
      }
      .warp-text{
          padding: .74rem .4rem;
      }
      p{
          text-align: left;
          color: #666;
          font-size: .26rem;
          line-height: .5rem;
          margin-bottom: 0;
      }
      .btn-know{
          width: 3.24rem;
          height: .8rem;
          border-radius: .4rem;
          background-color: #fa7237;
          color: #fff;
          font-size: .32rem;
          line-height: .8rem;
          margin: 0 auto;
          margin-top: .5rem;
          
      }
  }
}
.bargainInfo {
  background-color: #ff8601;
  padding: 0.3rem 0.24rem;
  position: relative;
  .headInfo {
    height: 1.14rem;
    width: 5.34rem;
    z-index: 1;
    position: absolute;
    left: 1.08rem;
    top: -0.5rem;
    img {
      width: 1.12rem;
      height: 1.12rem;
      position: absolute;
      left: 0;
      border-radius: 50%;
      border: 0.04rem solid #ff8601;
      background-color: #ff8601;
    }
    .textInfo {
      height: 0.6rem;
      background-color: #fff;
      margin: 0.3rem 0.02rem 0.3rem 0.3rem;
      border-radius: 0.1rem;
      line-height: 0.6rem;
      text-align: center;
      margin-left: 0.9rem;
      padding-left: 0.3rem;
      font-weight: 700;
      color: #6a0c07;
      border-bottom: 0.04rem solid #ff8601;
      font-size: 0.26rem;
    }
  }
  .shop {
    background-color: #fff;
    padding: 0.6rem 2.5rem 0.1rem 0.7rem;
    text-align: left;
    position: relative;
    .title,
    .prc {
      color: #6a0c07;
      font-size: 0.26rem;
      margin-bottom: 0.16rem;
    }
    img {
      position: absolute;
      right: 0.7rem;
      width: 1.48rem;
      height: 1.14rem;
      top: 0.32rem;
    }
  }
  .bgBox {
    position: absolute;
    width: 7.28rem;
    height: 0.36rem;
    background-color: #fa540c;
    border-radius: 0.18rem;
    left: -0.15rem;
    top: -0.18rem;
    z-index: 0;
  }
  .timeInfo {
    margin-top: 0.46rem;
    background-color: #fff;
    color: #6a0c07;
    position: relative;

    .count-down {
      height: 0.94rem;
      padding: .32rem 0;
      font-size: 0.3rem;
      position: relative;
      z-index: 2;
      background-color: #fff;
      box-shadow: 0 0.1rem 0.5rem rgba(210, 39, 23, 0.2);
      div {
          display: inline-block;
          span{
              span{
                display: inline-block;
                padding: 0.07rem 0.05rem;
                background-color: #6a0c07;
                opacity: 0.7;
                border-radius: 0.06rem;
                color: #fafafa;
                font-size: 0.28rem;
                height: auto;
              }
              i{
                  padding: 0 .12rem;
              }
          }
        
      }
      .left-kg {
        margin-left: 0.26rem;
      }
    }
  }
  .count-down-prc {
    margin-top: 0.38rem;
    color: #fa5f1a;
    font-size: 0.3rem;

    i {
      font-size: 0.46rem;
      font-style: normal;
    }
  }
  .count-down-schedule {
    margin-top: 0.3rem;
    position: relative;
    p {
      overflow: hidden;
      margin-bottom: 0;
    }
    i {
      font-style: normal;
      width: 0.8rem;
      display: inline-block;
      color: #fb9c73;
      font-size: 0.24rem;
      padding: 0 0.1rem;
    }
    .warp{
        width: 5.34rem;
      height: 0.22rem;
       display: inline-block;
       position: absolute;
      top: 0.24rem;
      left: 0.86rem;
    }
    span {
      display: inline-block;
      width: 100%;
      height: 100%;
      border-radius: 0.11rem;
      
    }
    .absolute {
        position: absolute;
        left: 0;
        top: 0;
      width: 2.5rem;
      background-color: #fb9c73;
    }
    .hide {
         position: absolute;
        left: 0;
        top: 0;
      background-color: #eee;
    }
  }
  .btn {
    padding-top: 0.4rem;
    width: 5.32rem;
    margin: 0 auto;
    padding-bottom: 0.3rem;
    .success-btn {
      height: 0.8rem;
      line-height: 0.8rem;
      background-color: #ff3740;
      border-radius: 0.1rem;
      color: #fff;
      font-size: 0.32rem;
    }
    .join{
        margin-top: .24rem;
        background-color: #ecaa00;
    }
  }
  .recordInfo {
    margin-top: 0.46rem;
    background-color: #fff;
    color: #6a0c07;
    position: relative;
    .recordTitle {
      background-color: #fff;
      padding-top: 0.3rem;
      padding-bottom: 0.24rem;
      position: relative;
      z-index: 2;
      img {
        width: 0.5rem;
        height: 0.28rem;
        vertical-align: middle;
      }
      span {
        font-size: 0.3rem;
        vertical-align: middle;
        margin: 0 0.34rem;
        color: #6a0c07;
      }
    }
  }
  .recordInfo-head{
      padding: 0 .7rem ;
      padding-bottom: .4rem;
      .head{
          padding-top: .2rem;
          text-align: left;
          padding-bottom: .2rem;
          border-bottom: 1px solid #e5e5e5;
          img{
              width: .7rem;
              height: .7rem;
              border-radius: 50%;
              vertical-align: middle;
          }
          span{
              vertical-align: middle;
          }
          .nickName{
              display: inline-block;
                padding-left: 0.24rem;
                color: #666;
                font-size: 0.26rem;
                width: 3rem;
          }
          .prc{
              color: #fa5f1a;
              font-size: .26rem;
            //   line-height: .7rem;
          }
          
      }
  }
}
</style>
