<template>
  <div>
    <div style="width:25%;margin:0 auto;margin-top:60px;margin-bottom:60px">
      <img slot="icon" src="/../static/img/wyy.jpg" style="width:100%">
    </div>
    <button @click="linktomubile">手机号登录</button>
    <button style="margin-top:30px!important">注册</button>
    <p style="text-align:center;margin-top:40px">
      <a>游客试用</a>
    </p>
    <p style="text-align:center;margin-top:200px">
      <a>其他登录方式</a>
    </p>
    <tabbar>
      <tabbar-item>
        <i class="fa fa-weixin" aria-hidden="true" slot="icon"></i>
        <span slot="label">微信</span>
      </tabbar-item>
      <tabbar-item>
        <i class="fa fa-qq" aria-hidden="true" slot="icon"></i>
        <span slot="label">QQ</span>
      </tabbar-item>
      <tabbar-item selected>
        <i class="fa fa-weibo" aria-hidden="true" slot="icon"></i>
        <span slot="label">微博</span>
      </tabbar-item>
      <tabbar-item>
        <i class="fa fa-github-square" aria-hidden="true" slot="icon"></i>
        <span slot="label">网易邮箱</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
import {
  Flexbox,
  FlexboxItem,
  Divider,
  Grid,
  GridItem,
  XButton,
  Tabbar,
  TabbarItem
} from "vux";

export default {
  components: {
    Flexbox,
    FlexboxItem,
    Divider,
    Grid,
    GridItem,
    XButton,
    Tabbar,
    TabbarItem
  },
  methods:{
      linktomubile(){
           this.$router.push({path: '/mobielogin'})
      }
  }
};
</script>
<style scoped>
.flex-demo {
  text-align: center;
  color: #fff;
  background-color: #20b907;
  border-radius: 4px;
  background-clip: padding-box;
}
button {
  width: 80%;
  margin: 0 auto;
  
  padding: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  color: #a96a6a;
  border: 1px solid #a96a6a;
  border-radius: 27px;
  background-color: #f7f7fa00;
  outline:none!important
}
</style>
