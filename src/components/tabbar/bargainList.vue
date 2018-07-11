<template>
    <div class="top">
        <div class="top-view-cell mui-media">
            <img class="mui-media-object mui-media-object-radius mui-pull-left" :src="$store.state.headerImg">
            <div class="mui-media-body text-right mui-ellipsis">
            {{$store.state.userName}}
            <!-- 你的过分的广告费多少个梵蒂冈电饭锅个电饭锅水电费公司的风格十分的国防生的 -->
            <p > <span @click="$router.push('/erweimaList')">我的核销码</span> </p>

            </div>
        </div>
        <div class="nav-cx">
             <router-link class="item-cx " to="/bargainList/underfined"  data-wid="tab-top-subpage-1.html">
                全部砍价
            </router-link>
            <router-link  class="item-cx" to="/bargainList/1"  data-wid="tab-top-subpage-2.html">
                砍价中
            </router-link>
            <router-link  class="item-cx" to="/bargainList/2"  data-wid="tab-top-subpage-2.html">
                砍价成功
            </router-link>
            <router-link  class="item-cx" to="/bargainList/3"  data-wid="tab-top-subpage-2.html">
                砍价失败
            </router-link>
        </div>
            <ul class="mui-table-view" >
                <li class="mui-table-view-cell mui-media" v-for="(v,i) in dataList" :key="i" @click="goToBargain(v.bargainId,v.goodsId,v.status,v.goodsBargainEndTime)">
                    <div class="time"> <span class="mui-pull-left">申请时间：{{v.createdAt}}</span> <span class="mui-pull-right right">{{v.status }}</span> </div>
                    <a href="javascript:;" class="info">
                        <img class=" mui-pull-left imgBox" :src="v.goodsImage" >
                        <div class="mui-media-body">
                            <p class="title mui-ellipsis">{{v.goodsName}}</p>
                            <p class="prc" ><span class="price">现价￥ <i>{{v.bargainPresentPrice}}</i> </span> <span class="oldPrice">原价 ￥{{v.goodsPrice}}</span> </p>
                        </div>
                    </a>
                </li>
            </ul>
    </div>
</template>

<script>
import { myCutGoods } from "api/http";
import formatDate from "@/filters/formatDate.js";
import refresh from "@/components/common/pullToRefresh.js";
export default {
  data() {
    return {
      dataList: []
    };
  },
  methods: {
    goToBargain(bargainId, id, status, endTime) {
      if (status == "砍价中" || status == "砍价成功") {
        this.$router.push("/bargain/" + id);
        localStorage.setItem("shopBargainID", JSON.stringify(bargainId));
        localStorage.setItem("endTime", JSON.stringify(endTime));
        localStorage.setItem("flagShow", JSON.stringify(2));
      } else if (status == "未核销" || status == "已核销") {
        this.$router.push("/erweimaList/erweimaDetail/" + bargainId);
      }
    },
    getMyCutGoods(status) {
      myCutGoods({
        userOpenId: this.$store.state.openId,
        status: status
      }).then(res => {
        console.log(res);
        this.dataList = [];
        if (res.data.code == 208) {
          this.dataList = [];
        } else if (res.data.code == 200) {
          this.dataList = res.data.dataList;
          this.dataList.forEach(v => {
            v.createdAt = formatDate(v.createdAt, "YYYY-MM-DD HH:mm:ss");
            if (v.status == 1) {
              v.status = "砍价中";
            } else if (v.status == 2) {
              v.status = "砍价成功";
            } else if (v.status == 3) {
              v.status = "砍价失败";
            } else if (v.status == 4) {
              v.status = "未核销";
            } else if (v.status == 5) {
              v.status = "已核销";
            } else if (v.status == 6) {
              v.status = "已过期";
            }
          });
        }
      });
    }
  },
  watch: {
    $route: function(nv, ov) {
      // 只要路由一变化就执行了
      // 路由一变化，重新根据路由中的分类id获取一次图片列表即可
      this.getMyCutGoods(+this.$route.params.status);
    }
  },
  filters: {
    formatDate
  },
  mounted() {
    this.getRem(750, 100);
  },
  created() {
    refresh();
    console.log(+this.$route.params.status);
    this.getMyCutGoods(+this.$route.params.status);
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" >
$mainColor: #ff3740;
$color: #ecaa00;
.time {
  overflow: hidden;
  font-size: 0.24rem;
  color: #666;
  .right {
    color: $mainColor;
  }
}
.mui-media-body {
  text-align: left;
}
.text-right {
  text-align: right;
  font-size: 0.48rem;
  color: #010101;
  padding-top: 0.28rem;
  p {
    padding-top: 0.28rem;
    span {
      font-size: 0.28rem;
      background-color: $color;
      color: #fff;
      padding: 0.07rem 0.25rem;
      border-radius: 0.28rem;
    }
  }
}
.mui-table-view:before,
.mui-table-view-cell:after,
.mui-table-view,
.mui-table-view:after {
  background-color: rgba(0, 0, 0, 0);
}
// .mui-table-view{
//     margin-top: .18rem;
// }
.top-view-cell {
  background-color: #fff;
  padding: 0.4rem 0.54rem;
  margin-bottom: 0.26rem;
}
.mui-table-view-cell > a:not(.mui-btn) {
  margin: 0 -0.24rem;
}
.mui-table-view-cell {
  background-color: #fff;
  padding: 0.2rem 0.24rem;
  margin-top: 0.18rem;
  .info {
    padding-top: 0.2rem;
  }
  .title {
    color: #000;
    font-size: 0.28rem;
    padding-top: 0.3rem;
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
  }
}

.mui-table-view .mui-media-object {
  max-width: 1.7rem;
  height: 1.7rem;
  line-height: 1.7rem;
}
.mui-table-view .imgBox {
  max-width: 1.7rem;
  height: 1.7rem;
  line-height: 1.7rem;
  margin-right: 0.2rem;
}
.mui-media-object-radius {
  max-width: 1.6rem;
  height: 1.6rem;
  line-height: 1.6rem;
  border-radius: 50%;
  border: 0.01rem solid #f4f4f4;
}
.mui-media {
  background-color: #fff;
}
.nav-cx {
  background-color: #fff;
  height: 0.92rem;
  line-height: 0.92rem;
  font-size: 0.28rem;
  padding: 0 0.24rem;
  display: flex;
  justify-content: space-around;
  a {
    color: #666;
    &.mui-active {
      border-bottom: 0.08rem solid $mainColor;
    }
  }
}

img[lazy="loading"] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>
