
<template>
    <div class="top bgc" id="refreshContainer" >
        <!-- 轮播图 -->
        <div  >
           <mt-swipe :auto="3000">
            <mt-swipe-item ><img :src="picList.image1" alt=""></mt-swipe-item>
            <mt-swipe-item><img :src="picList.image2" alt=""></mt-swipe-item>
            <mt-swipe-item><img :src="picList.image3" alt=""></mt-swipe-item>
            </mt-swipe> 
        <ul class="mui-table-view shangla" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="20">
          <li class="mui-table-view-cell mui-media"  v-for="(v,i) in listGoods" :key=" i "  @click="goGoodsDetail(v.id,v.goodsBargainEndTime)">
            <a href="javascript:;" class="">
              <img class="mui-media-object mui-pull-left" :src="v.goodsImage ">
              <div class="mui-media-body">
                <p class="titles mui-ellipsis">{{v.goodsName}}</p>
                <p class="prc" ><span class="price">最低价￥ <i>{{ v.goodsLowPrice }}</i> </span> <span class="oldPrice">原价 ￥{{v.goodsPrice}}</span> </p>
                 <p class="time-warp"> <span class="time-limit">{{text}} 
                   <count-down  v-on:end_callback="countDownE_cb(1)" :currentTime="v.nowTime" :startTime="v.nowTime" :endTime="v.goodsBargainEndTime"  :hourTxt="':'" :minutesTxt="':'" :secondsTxt="''"></count-down> 
                   </span> 
                   <span class="bargain mui-pull-right" v-show="v.goodsStatus == 1 && v.goodsNumber > 0">去砍价</span>
                   <span class="bargain mui-pull-right disabled" v-show="v.goodsStatus == 2 " >已过期</span> 
                   <span class="bargain mui-pull-right disabled" v-show="v.goodsNumber == 0 &&  v.goodsStatus == 2 ? false : v.goodsNumber == 0 ? true:false " >剩余0件</span>
                  </p>
              </div>
            </a>
          </li>
        </ul>
        <!-- <mt-spinner type="snake" color="#00ccff" :size="20" v-show="!loading"></mt-spinner> -->
        <p v-if='loadingDom' class='loading'>
        没有更多数据
        </p>
        </div>
       
        
    </div>
</template>

<script>
 
import { listGoods ,listPicture } from "api/http";
import CountDown from "@/components/common/initTime.vue";
import refresh from '@/components/common/pullToRefresh.js'
export default {
  data() {
    return {
      listGoods: [],
      picList:[],
      text:'距结束',
      show:true,
      pageIndex:1,
      pageSize:10,
      loading:true,
      loadingDom : false
    };
  },
  methods: {
    // @click="$router.push('/goodsDetail/' + v.id)"
    goGoodsDetail(id,endTime){
      this.$router.push('/goodsDetail/' + id)
      localStorage.setItem("endTime",JSON.stringify(endTime))
    },
    // 轮播图
    getPic(){
      listPicture({
      }).then(res =>{
        console.log(res)
        if(res.data.code == 200){
          this.picList = res.data.dataList[0]
        }
      })
    },
    // 获取数据列表
      getData(pageIndex,pageSize ) {
      listGoods({
        pageIndex,
        pageSize
      }).then(res => {
        console.log(res)
        if (res.data.code == 200) {
          if(res.data.dataList == [] && this.listGoods.length == 0){
            this.loading = true;
          }else{
            if(res.data.dataList.length === this.pageSize){
              res.data.dataList.forEach(v => {
                this.listGoods.push(v)
              })
              this.loading = false;
            }else{
              this.loading = true;
              this.loadingDom = true
              res.data.dataList.forEach( v => {
                this.listGoods.push(v)
              })
            }
          };
          if(res.data.dataList == []){
            this.loading = true;
            this.loadingDom = true;
          }
          // this.listGoods = res.data.dataList;
          res.data.dataList.forEach(v => {
            localStorage.setItem('end',JSON.stringify(v.goodsBargainEndTime))
            v.nowTime = new Date().getTime()
          });
        }
      });
    },
    // 上拉加载
    loadMore() {
      this.loading = true;
      this.pageIndex++ 
      this.getData(this.pageIndex,this.pageSize)
    },
    // 倒计时结束后执行的函数
    countDownE_cb: function (x) {
    
    }
  },
  components: {
    CountDown
  },
  mounted() {
    this.getRem(750, 100);
  },
  created() {
    refresh()
    //  console.log(this.pageIndex)
    this.getData(this.pageIndex,this.pageSize);
    this.getPic()
  },
  
};

  
</script>

<style rel="stylesheet/scss" lang="scss"  scoped>
$mainColor: #ff3740;
$color: #ecaa00;
.mint-swipe {
  height: 3.6rem;
}
.bgc{
  background-color: #f4f4f4;
}
.mint-swipe img {
  width: 100%;
  height: 100%;
  display: block;
}
.mui-media-body {
  text-align: left;
  padding-top: 0.2rem;
}
.titles {
  color: #000;
  font-size: 0.28rem;
  padding-top: 0;
}
.prc {
  margin-top: 0.3rem;
  .price {
    color: $mainColor;
    font-size: 0.26rem;
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
}
.time-warp {
  margin-top: 0.28rem;
  .time-limit {
    color: $color;
    line-height: .5rem;
    font-size: .26rem;
    div{
      display: inline-block;
      span{
        font-size: .26rem;
      }
      }
      
    
  }
  .bargain {
    display: inline-block;
    width: 1.3rem;
    height: 0.5rem;
    border-radius: 0.25rem;
    background-color: $mainColor;
    line-height: 0.5rem;
    text-align: center;
    color: #fff;
    font-size: 0.24rem;
  }
  .disabled{
    background-color: #838282;
  }
}

.mui-table-view:before,
.mui-table-view-cell:after,
.mui-table-view,
.mui-table-view:after {
  background-color: rgba(0, 0, 0, 0);
}
.mui-table-view-cell {
  margin: 0.28rem 0.24rem;
  background-color: #fff;
  padding: 0.24rem;
}
.mui-table-view-cell > a:not(.mui-btn) {
  margin: -0.24rem;
}
.mui-table-view .mui-media-object.mui-pull-left {
  margin-right: 0.3rem;
}
.mui-table-view .mui-media-object {
  max-width: 2.22rem;
  height: 2.22rem;
  line-height: 2.22rem;
}
</style>
