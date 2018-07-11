<template>
    <div class="top buttom">
        <!-- 弹框 -->
        <div class="modal" v-show="show">
            <div class="bgImg">
                <img class="bgImg-1" src="https://tango.heeyhome.com/images/img_pop.png" alt="">
                <img class="bgImg-2" src="https://tango.heeyhome.com/images/icon_coin.png" alt="">
                <div class="bgImg-text">
                     <p class="text" >您已砍{{firstCut}}元，分享好友抢免单</p>
                     <div class="share"  @click="shareClick">分享好友多砍一刀</div>
                     <img class="back" src="https://tango.heeyhome.com/images/icon_back.png" alt="" @click="close">
                </div>  
            </div>
        </div>
        <!-- 活动规则的弹窗 -->
        <div class="bgimg">
            <!-- <img src="https://tango.heeyhome.com/images/bargain.png" alt=""> -->
            <div class="rule" @click="ruleShow()" >
            </div>
            <div class=" modal-rule" v-show="ruleshow">
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
        <!-- 分享好友的弹窗 -->
        <div class="shareModel" @click="closeShow" v-show="share" >
          <img class="shareCut" src="https://tango.heeyhome.com/images/砍价成功弹窗.png" alt="">
          <img class="arrow" src="https://tango.heeyhome.com/images/箭头.png" alt="">
          <p class="text">您已砍<span>{{goodsInfo.cutPrice}}</span>元，点击右上角召唤好友帮忙砍价哦~</p>
          
        </div>
        <!-- 砍价成功的弹窗 -->
        <!-- <div class="cut-success" v-show="linquShow">
              <img class="bgImg-1" src="https://tango.heeyhome.com/images/img_pop_linqu.png" alt="">
              <img class="bgImg-2" src="https://tango.heeyhome.com/images/icon_coin.png" alt="">
              <div class="bgImg-text">
                    <p class="text" >产品名称</p>
                    <div class="code"  @click="seeCode">去我的核销码查看</div>
                    <div class="share"  @click="$router.push('/home')">看看其他商品</div>
                    <img class="back" src="https://tango.heeyhome.com/images/icon_back.png" alt="" @click="closeShow">
            </div>  
        </div> -->
         <div class="cut-success" v-show="linquShow">
              <img class="bgImg-1" src="https://tango.heeyhome.com/images/img_pop_linqu.png" alt="">
              <img class="bgImg-2" :src="goodsInfo.goodsImage" alt="">
              <div class="bgImg-text">
                    <p class="text" >{{goodsInfo.goodsName}}</p>
                    <div class="code"  @click="seeCode">去我的核销码查看</div>
                    <div class="share"  @click="$router.push('/home')">看看其他商品</div>
                    <img class="back" src="https://tango.heeyhome.com/images/icon_back.png" alt="" @click="closeShow">
            </div>  
        </div>
        <div class="bargainInfo">
            <div class="headInfo">
                <img :src="headerImg" alt="">
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
                <div class="count-down-prc"> 已砍金额：<i> {{goodsInfo.cutPrice}}</i>元 </div>
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
                    <div class="success-btn" @click="createCode" v-show="cutSuccsess">砍价成功，点击领取</div>
                    <div class="success-btn"  @click="shareClick" v-show="!cutSuccsess" >召唤好友帮忙</div>
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
                        <span class="prcs mui-pull-right"> 已砍{{v.bargainPrice}}元</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { userLogin ,myCutGoods ,cutGoods, getDetailCutGoods , getTicket , getConfig, createCode} from "api/http"
import CountDown from "@/components/common/initTime.vue";
import wx from "weixin-js-sdk"
import refresh from '@/components/common/pullToRefresh.js'

export default {
    data(){
        return {
            // 首刀模态框
            show:false,
            // 规则模态框
            ruleshow: false,
            // 分享模态框
            share: false,
            // 砍价成功后
            cutSuccsess: false,
            // 领取的模态框
            linquShow:false,
            // 提示框
            tishiShow:false,
            // headerImg:this.$store.state.headerImg,
            firstCut:JSON.parse(localStorage.getItem('firstCut')),
            nowTime: new Date().getTime(),
            listRecord:[],
            goodsInfo:{},
            percentage:0,
            ticket:'',
            accessToken:"",
            end : JSON.parse(localStorage.getItem('endTime')),
            code : window.location.search.slice(1).split('&')[0].split("=")[1],
            openId : localStorage.getItem('openId'),
            headerImg : this.$store.state.headerImg,
            flagShow : JSON.parse(localStorage.getItem('flagShow')),
            shopBargainID:JSON.parse(localStorage.getItem('shopBargainID')),
        }
    },
  components: {
    CountDown
  },
    methods:{
        // 根据code获取用户信息（开发阶段是手动获取的）
        getInfo(){
          if(this.openId == "" || this.openId == null){
            userLogin({
            jsCode: this.code
          }).then(res => {
              console.log(res.data.data.user.userOpenId)
              // 存储用户头像，openid，用户名称
              localStorage.setItem('headerImg',res.data.data.user.userHeadImage)
              localStorage.setItem('openId',res.data.data.user.userOpenId)
              localStorage.setItem('userName',res.data.data.user.userName)
              this.openId = res.data.data.user.userOpenId
              this.headerImg = res.data.data.user.userHeadImage
              this.getCutFrist(res.data.data.user.userOpenId)
            })
          }else {
            userLogin({
              userOpenId: this.openId
            }).then(res => {
               console.log(res)
              if(res.data.code == 200){
                //这边先留着---二次存储
                localStorage.setItem('headerImg',res.data.data.user.userHeadImage)
                localStorage.setItem('openId',res.data.data.user.userOpenId)
                localStorage.setItem('userName',res.data.data.user.userName)
                this.openId = res.data.data.user.userOpenId
                this.headerImg = res.data.data.user.userHeadImage
                this.getCutFrist(res.data.data.user.userOpenId)
              }else {
                userLogin({
                  jsCode: this.code
                }).then(res => {
                    console.log(res)
                    // 存储用户头像，openid，用户名称
                    localStorage.setItem('headerImg',res.data.data.user.userHeadImage)
                    localStorage.setItem('openId',res.data.data.user.userOpenId)
                    localStorage.setItem('userName',res.data.data.user.userName)
                    this.openId = res.data.data.user.userOpenId
                    // this.headerImg = res.data.data.user.userHeadImage
                    // 
                    this.getCutFrist(res.data.data.user.userOpenId)
                  })
              }
            })
          }
        },
        // 没有openId的自己砍首刀的
        getCutFrist(openId){
           cutGoods({
              id:this.$route.params.id,
              userOpenId: openId
            }).then(res => {
              console.log(res)
              if(res.data.code == 200){  
                this.firstCut = res.data.data.cutPrice
                this.getDetail(res.data.data.bargainId)
                this.show = true
              }else {
                this.show = false
              }
            })
        },
        // 自己首砍第一刀
        getCut(){
          // 显示首刀的弹窗
           if(this.flagShow == 1){
            this.show = true
          }else {
            this.show = false
          }
        //  获取砍价详情
        if(JSON.parse(localStorage.getItem('shopBargainID')) != null && JSON.parse(localStorage.getItem('shopBargainID')) != ''){
          this.getDetail(JSON.parse(localStorage.getItem('shopBargainID')))
        }
        },
        // 获取砍价详情
        getDetail(bargainId){
          getDetailCutGoods({
                bargainId,
                id: +window.location.hash.split('#')[1].split("/")[2]
            }).then(ress=>{
                console.log(ress)
                if(ress.data.code == 200){
                    this.listRecord = ress.data.data.listRecord;
                    this.goodsInfo = ress.data.data;
                    this.percentage = this.goodsInfo.cutPrice/(this.goodsInfo.goodsPrice-this.goodsInfo.goodsLowPrice) * 100
                      if(this.percentage >= 100){
                        this.percentage = 100
                        this.cutSuccsess = true
                      }else{
                        this.cutSuccsess = false
                      }
                } else if ( ress.data.code == 211 ){
                    this.mui.alert('还没发起砍价')
                } else if (ress.data.code == 10018){
                    this.mui.alert('活动已结束，请确认','提示',()=>{
                        this.$router.push('/home')
                        // localStorage.setItem('openId',this.invitedUserOpenId)
                    })
                } 
            })
        },
        // 关掉提示框
      tishiClosed(){
        this.tishiShow = false
        this.$route.push('/goodsDetail/' + window.location.hash.split('#')[1].split("/")[2])
      },
        
        // 获取token和Ticket
        getTicket(){
            getTicket({
            }).then(res => {
                console.log(res)
                this.accessToken = res.data.data.accessToken;
                this.ticket = res.data.data.ticket;
                this.$store.state.token = res.data.data.accessToken
                // 分享给好友
                 getConfig({
                    accessToken: res.data.data.accessToken,
                    ticket: res.data.data.ticket,
                    url:location.href.split('#')[0]
                }).then(res => {
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
                          var _this = this
                        wx.onMenuShareAppMessage({
                            title: "砍价", // 分享标题
                            desc: "快来和我一起参与，免费领取！惊喜不断！", // 分享描述urlencode(this.$route.params.headerImg)
                            link: "https://tango007.heeyhome.com/#/bargainFriends/" + JSON.parse(localStorage.getItem('shopBargainID')) + "/" + +this.$route.params.id + "/" + this.$store.state.openId + "/" + this.end, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: this.goodsInfo.goodsImage, // 自定义图标
                            type: 'link', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            success(){
                              _this.share = false
                            },
                            cancel: function () {
                              
                            }
                        });
                        //
                    })
                })
            })
        },
        //  好友分享
        shareClick(){
          this.share = true
          this.show = false
        },
        // 砍价成功生成核销码
        createCode(){
          createCode({
            bargainId: JSON.parse(localStorage.getItem("shopBargainID")),
            id: +this.$route.params.id,
            code:this.$store.state.token,
            userOpenId: this.openId
          }).then(res =>{
              console.log(res)
              if(res.data.code == 200){
                this.linquShow = true
              }else if(res.data.code == 10015){
                this.mui.alert('已生成核销码，到我的核销码中查看','提示',()=>{
                  this.$router.push('/erweimaList')
                })
              }else if(res.data.code == 221){
                this.mui.alert('已过期无法生成二维码，请确认','提示',()=>{
                  this.$router.push('/bargainList/underfined')
                })
              }
          })
        },
        // 查看我的核销码
        seeCode(){
          this.$router.push('/erweimaList')
        },
        showModal(){
            this.show = true;
        },
        ruleShow(){ 
            this.ruleshow = true;
        },
        close(){
            this.show = false;
        },
        closeShow(){
            this.ruleshow = false;
            this.share = false;
            this.linquShow = false;
        }
    },
    watch:{
      $route(to,from){
        console.log(to,from)
      }
    },
    mounted() {
        this.getCut()
        if(this.percentage == 100){
          this.cutSuccsess = true
        }else{
          this.cutSuccsess = false
        }
        this.getRem(750, 100);
    },
    created(){
      // 下拉刷新
      refresh()
      // 先隐藏，不影响开发，后期要用
      this.getInfo()
      this.getTicket()
    },
};
</script>

<style rel="stylesheet/scss" lang="scss" >
$mainColor: #ff3740;
$color: #ecaa00;
.buttom {
  padding-bottom: 0;
}
.modal {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  .bgImg {
    margin-top: 0.98rem;
    position: relative;
    .bgImg-1 {
      width: 6.4rem;
      height: 10.5rem;
      margin: 0 auto;
    }
    .bgImg-2 {
      position: absolute;
      width: 1.88rem;
      height: 1.6rem;
      top: 4.12rem;
      left: 2.81rem;
    }
    .bgImg-text {
      position: absolute;
      top: 6.52rem;
      width: 100%;
      .text {
        color: #fff;
        font-size: 0.34rem;
      }
      .share {
        width: 4.5rem;
        height: 0.8rem;
        background-color: #ecaa00;
        border-radius: 0.4rem;
        line-height: 0.8rem;
        margin: 0.48rem 1.5rem;
        color: #624602;
      }
      .back {
        width: 0.66rem;
        height: 0.66rem;
        margin-top: 0.82rem;
      }
    }
  }
}

.cut-success{
   position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  padding-top: 1.25rem;
    .bgImg-1 {
      width: 6.4rem;
      height: 10.5rem;
      margin: 0 auto;
    }
    .bgImg-2 {
      position: absolute;
      width: 2.24rem;
      height: 1.82rem;
      top: 4.59rem;
      left: 2.81rem;
    }
    .bgImg-text {
      position: absolute;
      top: 7rem;
      width: 100%;
      
      .text {
        color: #fff;
        font-size: 0.34rem;
        padding-bottom: .48rem;
      }
      .share,
      .code {
        width: 4.5rem;
        height: 0.8rem;
        border-radius: 0.4rem;
        line-height: 0.8rem;
        margin: 0 1.5rem .24rem;
        font-size: .3rem;
        border: .02rem solid #ecaa00;
      }
      .share{
         background-color: #ecaa00;
         color: #624602;
      }
      .code{
        background-color: #fe4b37;
        color: #ffd800
      }
      .back {
        width: 0.66rem;
        height: 0.66rem;
        margin-top: 0.82rem;
      }
    
  }

}
.bgimg::after {
  content: "";
  display: block;
  width: 7.5rem;
  height: 0.2rem;
  background-color: #ff8601;
  position: absolute;
  top: 4.4rem;
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
  .rule {
    background: url("https://tango.heeyhome.com/images/btn_guize.png") no-repeat;
    background-size: .58rem 1.62rem ;
    width: 0.58rem;
    height: 1.62rem;
    padding: 0.08rem;
    position: absolute;
    right: 0;
    top: 2.26rem;
    p{
     font-size: .2rem;
     padding: 0 .1rem;
     padding-top: 0.02rem; 
     color: #fff;
     margin-bottom: 0;
     width: .3rem;
     height: 1.62rem;
     line-height: .36rem;
    }
  }
  .modal-rule {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .rule-info {
    width: 5.87rem;
    background-color: #fff;
    border-radius: 0.2rem;
    margin: 1.5rem auto;
    padding-bottom: 0.42rem;
    .title {
      background-color: #fa7237;
      height: 0.96rem;
      border-radius: 0.2rem 0.2rem 0 0;
      line-height: 0.96rem;
      color: #fff;
      font-size: 0.34rem;
    }
    .warp-text {
      padding: 0.74rem 0.4rem;
    }
    p {
      text-align: left;
      color: #666;
      font-size: 0.26rem;
      line-height: 0.5rem;
      margin-bottom: 0;
    }
    .btn-know {
      width: 3.24rem;
      height: 0.8rem;
      border-radius: 0.4rem;
      background-color: #fa7237;
      color: #fff;
      font-size: 0.32rem;
      line-height: 0.8rem;
      margin: 0 auto;
      margin-top: 0.5rem;
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
      padding: 0.32rem 0;
      font-size: 0.3rem;
      position: relative;
      z-index: 2;
      background-color: #fff;
      box-shadow: 0 0.1rem 0.5rem rgba(210, 39, 23, 0.2);
      div {
        display: inline-block;
        span {
          span {
            display: inline-block;
            padding: 0.07rem 0.05rem;
            background-color: #6a0c07;
            opacity: 0.7;
            border-radius: 0.06rem;
            color: #fafafa;
            font-size: 0.28rem;
            height: auto;
          }
          i {
            padding: 0 0.12rem;
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
    .warp {
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
  .recordInfo-head {
    padding: 0 0.7rem;
    padding-bottom: 0.4rem;
    .head {
      padding-top: 0.2rem;
      text-align: left;
      padding-bottom: 0.2rem;
      border-bottom: 1px solid #e5e5e5;
      img {
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
        vertical-align: middle;
      }
      span {
        vertical-align: middle;
      }
      .nickName {
        display: inline-block;
        padding-left: 0.24rem;
        color: #666;
        font-size: 0.26rem;
        width: 3rem;
      }
      .prcs {
        color: #fa5f1a;
        font-size: 0.26rem;
        // line-height: 0.7rem;
      }
    }
  }
}
</style>
