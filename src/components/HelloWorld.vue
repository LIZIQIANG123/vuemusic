<template>
  <div>
    <div class="head">
      <x-header title="slot:overwrite-title">
        <!--左侧按钮-->
        <div slot="overwrite-left">
          <button-tab>
            <button-tab-item>
              <i class="fa fa-bars fa-2x" aria-hidden="true"></i>
            </button-tab-item>
          </button-tab>
        </div>
        <!--中间的3个按钮-->
        <div class="overwrite-title-demo" slot="overwrite-title">
          <button-tab>
            <button-tab-item @click.native="gomymusic">
              <i class="fa fa-music fa-2x" aria-hidden="true"></i>
            </button-tab-item>
            <button-tab-item @click.native="gotuijian" selected>
              <i class="fa fa-bullhorn fa-2x" aria-hidden="true"></i>
            </button-tab-item>
            <button-tab-item>
              <i class="fa fa-user fa-2x" aria-hidden="true"></i>
            </button-tab-item>
          </button-tab>
        </div>
        <!--右侧的按钮-->
        <div slot="right">
          <button-tab>
            <button-tab-item>
              <i class="fa fa-search fa-2x" aria-hidden="true"></i>
            </button-tab-item>
          </button-tab>
        </div>
      </x-header>
    </div>
    <gexing v-show="mymusic"></gexing>
    <mymusic v-show="!mymusic"></mymusic>
    <!-- <side-bar></side-bar> -->
  </div>
</template>
<script>
import axios from "axios";
axios.defaults.withCredentials = true;

import mymusic from "./pages/mymusic.vue";
import gexing from "./pages/gexing.vue";
import SideBar from "./layout/slider.vue";
import { XHeader, ButtonTab, ButtonTabItem } from "vux";
export default {
  components: {
    mymusic,
    gexing,
    "side-bar": SideBar,
    XHeader,
    ButtonTab,
    ButtonTabItem
  },
  data() {
    return {
      mymusic: true
    };
  },
  methods: {
    transmitData() {
      // 通过commit提交数据改变vuex里面的数据
      this.$store.commit("fatherData", this.testData);
    },
    showSide: function() {
      this.$store.dispatch("showSideBar");
    },
    gomymusic() {  
    
        this.mymusic = false;
    },
    gotuijian() {
      this.mymusic = true;
    }
  },created () {
   
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.overwrite-title-demo {
  margin-top: 6px;
}
.head >>> .vux-header-left {
  top: 10px;
}
.head >>> .vux-button-group > a.vux-button-tab-item-last {
  border: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  background-color: #c62f2f;
}
.head >>> .vux-header {
  position: fixed;
  width: 100%;
  z-index: 9999999;
}
.head >>> .vux-header .vux-header-left a,
.vux-header .vux-header-left button,
.vux-header .vux-header-right a,
.vux-header .vux-header-right button {
  background-color: #c62f2f;
}
.head >>> .vux-button-group > a.vux-button-tab-item-last:after {
  border: none;
}
.head >>> .vux-button-group > a.vux-button-tab-item-middle:after {
  border: none;
}
.head >>> .vux-button-group > a.vux-button-tab-item-last:after {
  border: none;
}
.head >>> .vux-button-group > a.vux-button-tab-item-first:after {
  border: none;
}
.head >>> .vux-button-group {
  color: #eee;
}
.head >>> .vux-header .vux-header-left,
.vux-header .vux-header-right {
  top: 10px;
}
.head >>> .vux-button-group > a.vux-button-tab-item-first {
  border: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background-color: #c62f2f;
}
.head >>> .vux-button-group > a.vux-button-group-current {
  background-color: #c62f2f;
}
.head >>> .vux-button-group > a {
  background-color: #c62f2f;
}
.head >>> .vux-header {
  background-color: #c62f2f;
}
</style>
