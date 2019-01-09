<template>
  <div class="home">
  
        <div>
    <!-- 对transition不了接的可以查看vue2.0官方文档的“过渡 & 动画” 链接：https://cn.vuejs.org/v2/guide/transitions.html-->
    <transition name="fade" @touchmove.stop.prevent>
      <!-- 这部分功能主要是关闭侧栏菜单，类似一层遮罩的效果 -->
      <div class="menu-mask" v-show="isRellyShow" @click="hideSide"></div>
    </transition>
  
   
    <transition name="slide-fade">
        
      <!-- 这里才是侧栏代码部分 -->
      <div class="side-content" v-show="isRellyShow">
        <!-- css transition动画 加深理解 -->
        <!--个人信息-->
        <flexbox orient="vertical">
          <flexbox-item>
            <img src="123">
          </flexbox-item>
          <flexbox-item>
            <flexbox :gutter="0">
              <flexbox-item :span="1/2">
                <div class="flex-demo">李自强123456</div>
              </flexbox-item>
              <flexbox-item :span="1/3">
                <div class="flex-demo">
                  <badge text="lv0"></badge>
                </div>
              </flexbox-item>

              <flexbox-item :span="1/3">
                <div class="flex-demo">签到</div>
              </flexbox-item>
            </flexbox>
          </flexbox-item>
        </flexbox>
        <!--我的消息-->
        <group v-for="(item,index) in slider" :key="index">         
            <cell v-for="(items1,index2) in item" :key="index2" :title="items1.title">
              <i slot="icon" class=""></i>
            </cell>     
        </group>
      </div>
       
    </transition>
   <!--尾部设置-->
     <tabbar>
      <tabbar-item v-for="(item,index) in tabbar" :key="index">   
        <span slot="label"><i></i>{{item.title}}</span>
      </tabbar-item>     
    </tabbar>
    </div>
 
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Divider, Badge, Cell, Group,Scroller,Tabbar, TabbarItem, } from "vux";

export default {
  components: { Flexbox, FlexboxItem, Badge, Cell, Group,Scroller,Tabbar, TabbarItem, },
  data() {
    return {
      slider: [
        [
          { title: "我的消息", icon: "fa fa-envelope-o" },
          { title: "会员中心", icon: "fa fa-vimeo" },
          { title: "商城", icon: "fa fa-shopping-cart" },
          { title: "游戏推荐:《糖领纪元》", icon: "fa fa-gamepad" },
          { title: "在线听歌免费", icon: "fa fa-archive" }
        ],
        [{ title: "我的好友", icon: "fa fa-user-o" }, { title: "附件的人", icon: "fa fa-child" }],
        [
          { title: "个性换肤", icon: "fa fa-odnoklassniki-square" },
          { title: "听歌识曲", icon: "fa fa-microphone" },
          { title: "定时停止播放", icon: "fa fa-clock-o" },
          { title: "扫一扫", icon: "fa fa-qrcode" },
          { title: "音乐闹钟", icon: "fa fa-clock-o" },
          { title: "驾驶模式", icon: "fa fa-car" },
          { title: "亲子频道", icon: "" },
          { title: "小冰电台", icon: "" },
          { title: "音乐云盘", icon: "" },
          { title: "优惠券", icon: "" },
          { title: "加入网易音乐人", icon: "" }
        ]
      ],
      tabbar:[
          {title:'夜间模式',icon:''},
          {title:'设置',icon:''},
          {title:'退出',icon:''},

      ]
    };
  },
  methods: {
    hideSide: function() {
      this.$store.dispatch("hideSideBar");
    }
  },
  computed: {
    isRellyShow() {
      return this.$store.getters.isShowMethod;
    }
  },
  mounted: function() {}
};
</script>

<style scoped>
.home>>>.weui-tabbar{
    width:286px
}
.menu-mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  opacity: 1;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
}
.side-content {
    overflow-y: scroll;
    overflow-x: hidden;
  z-index: 11;
  position: fixed;
  width: 286px;
  height: 100%;
  background: #e5e5e5;
  top: 0;
  left: 0;
  bottom: 0;
  -webkit-overflow-scrolling: touch;
}
.fade-enter-to,
.fade-leave-to {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-to {
  transition: transform 0.3s;
  transform: translate(0px, 0px);
}
</style>
