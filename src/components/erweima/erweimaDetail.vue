<template>
    <div class="top">
        <div class="imgBox-er">
            <img :src="codeInfo.orderVerificationCode" alt="">
            <p class="erweima">长按或截图保存二维码，出示给商家</p>
            <div class="shopInfo">
                <p>{{codeInfo.goods.goodsName}}</p>
                <!-- <p>订单编号：11111</p> -->
                <p>有效期：{{ codeInfo.createdAt | formatDate('YYYY年MM月DD日')}} <span>-</span> {{ codeInfo.createdAt + 864000000 | formatDate('YYYY年MM月DD日') }} </p>
            </div>
        </div>
         <div class="detail">
            <img src="https://tango.heeyhome.com/images/img_detail_left.png" alt="">
            <span>商品详情</span> 
            <img src="https://tango.heeyhome.com/images/img_detail_right.png" alt="">
            <div class="prcInfo">
                <img :src="codeInfo.goods.goodsPictureThree" alt="">
            </div>
        </div>
    </div>
</template>

<script>
// import detail from '../common/detail'
import { getCode } from "api/http"
import formatDate from '@/filters/formatDate.js'
export default {
    data(){
        return{
            codeInfo:{},
            
        }
    },
    components:{
        // detail
    },
    methods:{
        getCodeInfo(){
            getCode({
                userOpenId: this.$store.state.openId,
                bargainId: this.$route.params.bargainId
            }).then(res =>{
                console.log(res)
                if(res.data.code == 200){
                    this.codeInfo = res.data.data[0]
                }
            })
        }
    },
      filters: {
      formatDate
    },
    mounted(){
        this.getRem(750,100)
    },
    created(){
        this.getCodeInfo()
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scpoed>
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
    .imgBox-er{
        padding-top: 1.06rem;
        background-color: #fff;
        margin-bottom: .18rem;
        img{
            width: 2.9rem;
            height: 2.9rem;
        }
        .erweima{
            margin-top: .54rem;
            color: #333;
            font-size: .28rem;
        }
        .shopInfo{
            margin-top: .72rem;
            text-align: left;
            padding-left: .24rem;
            font-size: .24rem;
            padding-bottom: 1rem;
            p{
                margin-bottom: .14rem;   
                color: #333;
            }
        }
    }
</style>
