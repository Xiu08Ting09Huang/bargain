<template>
    <div class="top">
        <div class="imgBox">
             <img :src="detail.goodsPictureOne" alt="">
        </div>
        <div class="mui-table-view-cell mui-media">
            <a href="javascript:;" class="">
              <div class="mui-media-body">
                <p class="title mui-ellipsis">{{detail.goodsName}}</p>
                <p class="prc"><span class="price">最低价格￥ <i>{{detail.goodsLowPrice}}</i> </span> <span class="oldPrice">原价 ￥{{detail.goodsPrice}}</span> <span class="mui-pull-right num">限量{{detail.goodsNumber}}件</span> </p>
              </div>
            </a>
          </div>
          <p class="bargain-time"> <span>砍价截止倒计时</span>
             <span class="time-m mui-pull-right">
               <count-down  v-on:end_callback="countDownE_cb(1)" :currentTime="nowTime" :startTime="nowTime" :endTime="end"  :hourTxt="':'" :minutesTxt="':'" :secondsTxt="''"></count-down> 
            </span> 
          </p>
         <div class="detail">
            <img src="https://tango.heeyhome.com/images/img_detail_left.png" alt="">
            <span>商品详情</span> 
            <img src="https://tango.heeyhome.com/images/img_detail_right.png" alt="">
            <div class="prcInfo">
                <img :src="detail.goodsPictureThree" alt="">
            </div>
        </div>
           <button v-if="show" class="bargain-btn" @click="goTologin">{{activityText}}</button>
          <button v-if="!show" class="end-btn" @click="goTologin" disabled>{{activityText}}</button>
    </div>
</template>

<script>
// import detail from "../common/detail";
import { detailGoods, myCutGoods, cutGoods, userLogin } from "api/http";
import CountDown from "@/components/common/initTime.vue";
import refresh from '@/components/common/pullToRefresh.js'

export default {
  data() {
    return {
      detail: "",
      nowTime: new Date().getTime(),
      activityText: "发起砍价",
      show: true,
      bargainId: "",
      id: this.$route.params.id,
      end: JSON.parse(localStorage.getItem("endTime")),
      // flag:1,
      openId: localStorage.getItem("openId")
    };
  },
  methods: {
    // 登录授权
    goTologin() {
      if (this.openId == null || this.openId == "") {
        this.$router.push("/login");
        localStorage.setItem("loginId", this.id);
      } else {
        userLogin({
          userOpenId: this.openId
        }).then(res => {
          console.log(res);
          if (res.data.code == 200) {
            // 自己已经砍过第一刀后，发起的请求，到我的砍价接口，获取砍价ID
            cutGoods({
              id: this.$route.params.id,
              userOpenId: this.openId
            }).then(res => {
              console.log(res);
              if (res.data.code == 200) {
                localStorage.setItem(
                  "firstCut",
                  JSON.stringify(res.data.data.cutPrice)
                );
                // this.$store.state.bargainId = res.data.data.bargainId
                localStorage.setItem(
                  "shopBargainID",
                  JSON.stringify(res.data.data.bargainId)
                );
                localStorage.setItem("flagShow", JSON.stringify(1));
                this.$router.push(
                  "/bargain/" + window.location.hash.split("#")[1].split("/")[2]
                );
              } else if (res.data.code == 212) {
                this.mui.toast("商品正在砍价中，到我的砍价中查看");
              } else if (res.data.code == 220) {
                this.mui.toast("该商品砍价成功，到我的砍价中查看");
              } else if (res.data.code == 10012) {
                this.mui.toast("商品已砍完");
              } else if (res.data.code == 10018) {
                this.mui.toast("活动已取消");
              } else if (res.data.code == 214) {
                this.mui.toast("砍价已结束");
              } else if (res.data.code == 215) {
                this.mui.toast("已经是最低价");
              } else if (res.data.code == 216) {
                this.mui.toast("库存不足");
              } else if (res.data.code == 213) {
                this.mui.toast("已砍价");
              }
            });
          } else {
            this.$router.push("/login");
            localStorage.setItem("loginId", this.id);
          }
        });
      }
    },
    closeShow() {
      this.showModel = false;
    },
    // 商品详情
    getData() {
      detailGoods({
        id: this.$route.params.id
      }).then(res => {
        console.log(res);
        this.detail = res.data.data;
        // localStorage.setItem('end',JSON.stringify(this.detail.goodsBargainEndTime))
        localStorage.setItem("id", JSON.stringify(this.detail.id));
        if (this.detail.goodsNumber == 0 && this.detail.goodsStatus == 2) {
          this.show = false;
          this.activityText = "活动结束";
        } else if (this.detail.goodsNumber == 0) {
          this.show = false;
          this.activityText = "余量不足";
        }
      });
    },
    countDownE_cb: function(x) {
      this.show = false;
      this.activityText = "活动结束";
    }
  },
  created() {
    // 下拉刷新
    refresh()
    // console.log(JSON.parse(localStorage.getItem("endTime")));
    this.getData();
    // localStorage.setItem('openId',JSON.stringify(this.openId))
  },
  components: {
    // detail,
    CountDown
  },
  mounted() {
    this.getRem(750, 100);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" >
$mainColor: #ff3740;
$color: #ecaa00;
 .detail{
        background-color: #fff;
        
        padding-top: .3rem;
        padding-bottom: .24rem;
        img{
            width: .5rem;
            height: .28rem;
            vertical-align: middle;
        }
        span{
            font-size: .28rem;
            vertical-align: middle; 
            margin: 0 .3rem;
            color: #333;
        }
        .prcInfo{
            margin: .24rem;
            background-color: #eee;
            // height: 8rem;
            img{
                width: 100%;
                height: 100%;
            }
        }
    }
.model {
  background-color: rgba(0, 0, 0, 0.2);
  color: #333;
  height: 0.8rem;
  line-height: 0.8rem;
  position: absolute;
  width: 100%;
}
.mui-media-body {
  text-align: left;
}
.statusModel {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  .modelBox {
    background-color: #fff;
    width: 6rem;
    height: 2.7rem;
    padding-top: 0.5rem;
    border-radius: 0.2rem;
    position: absolute;
    top: 3rem;
    left: 0.75rem;
    font-size: 0.34rem;

    span {
      color: #ff3740;
    }
    .warpBox {
      border-top: 1px solid #ccc;
      margin-top: 0.5rem;
      padding-top: 0.3rem;

      .cancel {
        color: #007aff;
        padding: 0 0.5rem;
        font-weight: 700;
      }
      .confirm {
        color: #007aff;
        padding: 0 0.5rem;
        font-weight: 700;
      }
    }
  }
}
.prc {
  margin-top: 0.2rem;
  .price {
    color: $mainColor;
    font-size: 0.28rem;
    margin-right: 0.16rem;
    i {
      font-style: normal;
      font-size: 0.48rem;
    }
  }
  .oldPrice {
    color: #999;
    font-size: 0.24rem;
  }
  .num {
    font-size: 0.24rem;
    color: #999;
    margin-top: 0.15rem;
  }
}
.mui-table-view-cell:after {
  background-color: #f4f4f4;
}
.bargain-btn,
.end-btn {
  position: fixed;
  left: 0;
  width: 100%;
  bottom: 0;
  height: 0.98rem;
  line-height: 0.8rem;
  color: #fff;
  font-size: 0.32rem;
  margin-top: -0.2rem;
  border-radius: 0;
}
.bargain-btn {
  background-color: $mainColor;
}
.end-btn {
  background-color: #999;
}
.bargain-time {
  color: $color;
  text-align: left;
  padding-top: 0.22rem;
  padding-left: 0.24rem;
  padding-bottom: 0.12rem;
  background-color: #fff;
  overflow: hidden;
  font-size: 0.26rem;
}
.imgBox {
  width: 100%;
  height: 3.6rem;
  overflow: hidden;
}
.imgBox img {
  width: 100%;
  height: 100%;
}
.mui-table-view-cell {
  background-color: #fff;
  padding: 0.24rem;

  .title {
    color: #000;
    font-size: 0.28rem;
  }
}
.mui-table-view-cell > a:not(.mui-btn) {
  margin-left: -0.2rem;
}
.time-m {
  padding-right: 0.24rem;
  div {
    span {
      span {
        width: 0.44rem;
        height: 0.48rem;
        background-color: $color;
        color: #fff;
        display: inline-block;
        line-height: 0.48rem;
        text-align: center;
        border-radius: 0.06rem;
      }
      i {
        padding-left: 0.09rem;
        text-align: center;
      }
    }
  }
}
</style>
