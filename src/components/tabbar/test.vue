<template>
<div>
<div v-for="(item,index) in list" :key="index" class="act_item">  
    <h1>{{ item.title }}</h1>  
    <img :src="item.pic" alt="">  
    <div class="act_info">  
        <h2><span>{{ item.count }}</span>个视频</h2>  
        <div class="time">倒计时：{{ item.djs }}</div>  
        <div class="clear"></div>  
    </div>  
</div>  
</div>
    
</template>

<script>  
function InitTime(endtime){  
    var dd,hh,mm,ss = null;  
    var time = parseInt(endtime) - new Date().getTime();  
    if(time<=0){  
        return '结束'  
    }else{  
        dd = Math.floor(time / 60 / 60 / 24);  
        hh = Math.floor((time / 60 / 60) % 24);  
        mm = Math.floor((time / 60) % 60);  
        ss = Math.floor(time  % 60);  
        var str = dd+"天"+hh+"小时"+mm+"分"+ss+"秒";  
        return str;  
    }  
}  
export default {  
    data () {  
    return {  
            active: 'tab-container1',  
            pinkFont:true,  
            // 上拉刷新、下拉加载  
            allLoaded: false, //如果为true,禁止上拉刷新  
            autoFill: false, //取消自动填充，  
            list: [],  
        }  
      },  
    created() {  
        var ssss = [  
            {"title": "小心愿，大梦想","pic":"../../assets/img/new/act1.jpg","count":"34","time":"1555293470350"},  
            {"title": "杭州国际时装周童模招募","pic":"../../assets/img/new/act2.jpg","count":"36","time":"1525293470350"},  
            {"title": "怪兽bobo全线代言火爆杭城的联名秀招募童模啦！","pic":"../../assets/img/new/act3.jpg","count":"74","time":"1529253270350"},  
            {"title": "汉风唐韵 、别","pic":"../../assets/img/new/act2.jpg","count":"266","time":"1525753270350"},  
            {"title": "听说你们想和明星超模同台“PK”？","pic":"../../assets/img/new/act1.jpg","count":"97","time":"1525253270450"},  
        ];  
        ssss.map( (obj,index)=>{  
            <span style="color:#cc0000;">this.$set(  
                obj,"djs",InitTime(obj.time)  
            );</span>  
        })  
        this.list = ssss;  
    },  
    mounted() {  
        setInterval( ()=> {  
            for (var key in this.list) {  
                var aaa = parseInt( this.list[key]["time"] );  
                var bbb = new Date().getTime();  
                var rightTime = aaa - bbb;  
                if (rightTime > 0) {  
                    var dd = Math.floor(rightTime / 1000 / 60 / 60 / 24);  
                    var hh = Math.floor((rightTime / 1000 / 60 / 60) % 24);  
                    var mm = Math.floor((rightTime / 1000 / 60) % 60);  
                    var ss = Math.floor((rightTime / 1000) % 60);  
                }  
                this.list[key]["djs"] = dd + "天" + hh + "小时" + mm + "分" + ss + "秒";  
            }  
        }, 1000);  
  
    },  
    methods: {  
  
    }  
}  
</script>  

<style>

</style>
