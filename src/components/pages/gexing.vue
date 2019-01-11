<template>
  <div class="zhuye">
    <tab :line-width="1" custom-bar-width="60px">
      <tab-item :selected="item.select" v-for="(item,index) in tab" :key="index">{{item.title}}</tab-item>
    </tab>
    <swiper dots-position="center" auto height="200px">
      <swiper-item
        v-for="(item,index) in swiper"
        :key="index"
        class="black"
        :style="{background: 'url('+ item.imageUrl +')'}"
      ></swiper-item>
    </swiper>
    <div class="col-3">
      <grid :show-lr-borders="false" :show-vertical-dividers="false">
        <grid-item v-for="(item,index) in gird" :key="index" @click.native="click(item)">
          <span class="fa-stack fa-lg" slot="icon">
            <i class="fa fa-circle-thin fa-stack-2x"></i>
            <i :class="item.icon"></i>
          </span>
          <span slot="label">{{item.text}}</span>
        </grid-item>
      </grid>
    </div>
    <div class="tuijian">
      <group>
        <cell title="推荐歌单"></cell>
        <grid :show-lr-borders="false" :show-vertical-dividers="false" :cols="3">
          <grid-item v-for="(item, index) in userEntity" :key="index" :label="item.name" @click.native="godetail(item)">
            <img slot="icon" :src="item.picUrl">
          </grid-item>
        </grid>
          <grid :cols="3" :show-lr-borders="false">
       <grid-item v-for="(item, index) in userEntity" :key="index" :label="item.name" @click.native="godetail(item)">
            <img slot="icon" :src="item.picUrl">
          </grid-item>
    </grid>
      </group>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import {
  Tab,
  TabItem,
  Swiper,
  SwiperItem,
  MarqueeItem,
  Marquee,
  Badge,
  Grid,
  GridItem,
  Cell,
  Group
} from "vux";
export default {
  components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    MarqueeItem,
    Marquee,
    Badge,
    Grid,
    GridItem,
    Cell,
    Group
  },
  methods: {
    onItemClick(index) {
      console.log("on item click:", index);
    },
    godetail(value){
      console.log(value.id)
      this.$store.state.GendanId=value.id
        this.$store.dispatch('getgedandetail')
        
        setTimeout(() => {
              this.$router.push({ path: "/detail" });
        }, 1000);
    },
    click(value){
     if(value.link=="私人fm"){

     }
      if(value.link=="每日推荐"){
       
     }
      if(value.link=="歌单"){
        
      
           this.$store.dispatch('getgedan')
      
        
        setTimeout(() => {
        
             this.$router.push({path:"/allgedan"})
     
        }, 1000);
    
     }
        if(value.link=="排行榜"){
       
     }
    }
  },
  created() {
    var that = this;
    axios.get("http://localhost:3000/banner").then(
      res => {
        that.swiper = res.data.banners;
      },
      err => {
        reject(err);
      }
    );
    var userJsonStr = sessionStorage.getItem("tuijiangedan");

    that.userEntity = JSON.parse(userJsonStr);
    console.log(1)

    console.log(that.userEntity)
  },
  data() {
    return {
      userEntity: [],
      gird: [
        { text: "私人FM", link: "私人fm", icon: "fa  fa-podcast fa-stack-1x" },
        { text: "每日推荐", link: "每日推荐", icon: "fa fa-calendar-o fa-stack-1x" },
        { text: "歌单", link: "歌单", icon: "iconfont icon-gedan fa-stack-1x" },
        { text: "排行榜", link: "排行榜", icon: "fa fa-bar-chart-o fa-stack-1x" }
      ],
      swiper: [],
      tab: [
        { title: "个性推荐", select: true },
        { title: "歌单", select: false },
        { title: "主播电台", select: false },
        { title: "排行榜", select: false }
      ]
    };
  }
};
</script>


<style scoped>
.tuijian>>>.weui-grid__labe span{
  display: block;
  width:100%
}
.zhuye{
  padding-top:46px
}
.tuijian >>> .weui-grid__icon {
  height: 33.333vw;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tuijian >>> .weui-cells {
  margin: 0;
}
.iconfont {
  font-size: 21.33px !important;
}
.col-3 >>> .weui-grid__icon {
  height: auto;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.col-3 >>> .weui-grid:after {
  border-bottom: none;
}
@-webkit-keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
.animated {
  animation-duration: 1s;
  animation-fill-mode: both;
}
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  100% {
    opacity: 1;
    transform: none;
  }
}
.fadeInUp {
  animation-name: fadeInUp;
}
.align-middle {
  text-align: center;
}
.black {
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background-position: center center !important;
}
.title {
  line-height: 200px;
  text-align: right;
  color: #fff;
}
img {
  max-width: 100%;
}
h4 {
  margin: 0;
  padding: 0;
}
</style>

