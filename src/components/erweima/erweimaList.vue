<template>
    <div class="top">
        <div class="list">
            <div v-if="show">暂时没有核销码...</div>
            
             <div class="item" @click="$router.push('/erweimaList/erweimaDetail/'+ v.orderBargainId)" v-for="(v,i) in dataList" :key="i" >
                <img v-show="v.orderStatus == 5" class="used" src="https://tango.heeyhome.com/images/已使用执照.png" alt="">
                <img :src="v.goods.goodsImage" alt="">
                <p class="text mui-ellipsis">{{v.goods.goodsName}}</p>
            </div>
        </div>
    </div>
</template>
<script>
import { myCode } from "api/http"
import refresh from '@/components/common/pullToRefresh.js'
export default {
    data(){
        return{
            dataList:[],
            show:false
        }
    },
    methods:{
        getCodeList(){
            myCode({
                userOpenId: this.$store.state.openId
            }).then(res => {
                console.log(res.data)
                if(res.data.code == 200){
                    this.dataList = res.data.dataList
                    this.show = false
                } else {
                   this.show = true
                }
            })
        }
    },
    mounted(){
        this.getRem(750,100)
    },
    created(){
        // 下拉刷新
        refresh()
        this.getCodeList()
    }
}
</script>

<style scoped>
    .list{
        padding-top: .3rem;
        justify-content: space-around;
    }
    .list .item {
        float: left;
        width: 3.26rem;
        margin-top: .3rem;
        flex-direction: column;
        background-color: #fff;
        margin-left: .33rem;
        position: relative;
    }
    .list .item .text{
        height: 1.1rem;
        line-height: 1.1rem;
        color: #333;
        font-size: .26rem;
    }
    .list .item img {
        width: 100%;
        height: 2.6rem;
    }
    .list .item .used {
           width: 100%;
           height: 100%; 
            position: absolute;
            top: 0;
            right: 0;
            left: 0;
            bottom: 0;
    }

</style>
