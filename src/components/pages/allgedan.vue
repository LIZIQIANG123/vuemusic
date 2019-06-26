<template>
  <div class="body">
    <x-header :left-options="{backText: ''}" @click.native="goqian">
      <i class="fa fa-arrow-left" aria-hidden="true" slot="overwrite-left">
        <span style="display=block;margin-left:20px">歌单</span>
      </i>
    </x-header>
        <group >
      <cell  v-for="(item,index) in this.$store.state.JingpinGedan.data.playlists"   :key="index" >
          <img  slot="icon" :src="item.coverImgUrl" style="width:100px"/>
          <span slot="after-title">精品歌单<i></i></span> 
          <span slot="inline-desc" >
              {{item.name}}
              <br>
            {{item.copywriter}}
          </span>
      </cell>
    </group>
    <group>
        <cell>
          
        <span slot="icon" style="font-size:12px">{{name}}</span>
        <span slot="inline-desc" style="font-size:12px;margin-left:10px" >
            <i  class="fa fa-chevron-right" aria-hidden="true"></i>
        </span>
     
        <span after-title  style="font-size:12px;">
            <a @click="xiangqing('华语')">华语</a>&nbsp|&nbsp
             <a @click="xiangqing('民谣')">民谣</a>&nbsp|&nbsp
             <a @click="xiangqing('电子')">电子</a>
        </span>
        </cell>
    </group>
   
    <flexbox :gutter="0" wrap="wrap">
      <flexbox-item v-for="i in  this.$store.state.getgedan" :key="i" :span="1/2"  @click.native="godetail(i)">
     <card style="margin:0 auto;width:80%;">
      <img slot="header" :src="i.coverImgUrl" style="width:100%;"/>
      <div slot="content" class="card-padding">
          <div style="position: absolute;bottom:76px">
        <p style="color:#fdfdfd;font-size:12px;">
            <flexbox>
                <flexbox-item :span="1/10000"><i class="fa fa-user-o" aria-hidden="true"></i></flexbox-item>
                <flexbox-item :span="9999/10000"><p style="overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;">{{i.creator.nickname}}</p></flexbox-item>
         
          </flexbox>
        </p>
          
        </div>
      <p style="font-size:12px;height:40px;line-height:20px;text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;">{{i.name}}</p>
      </div>
    </card>
    
      </flexbox-item>
   
    </flexbox>
  </div>
</template>
<script>
import {
  XHeader,
 Group,
 Cell,
 Grid, GridItem,Flexbox, FlexboxItem,Card 
} from "vux";

export default {
  components: {
    XHeader,
    Group,
    Cell,
    Grid, GridItem,
    Flexbox, FlexboxItem,Card 
  },
  data () {
      return {
          jinpingedan:this.$store.state.JingpinGedan,
          name:'全部'
      }
  },
  created () {
      this.jinpingedan=this.$store.state.JingpinGedan
     
  },
  methods: {
    goqian(){
this.$router.go(-1);
    },
    godetail(value){
      this.$store.state.GendanId=""
      console.log(value.id)
      this.$store.state.GendanId=value.id
        this.$store.dispatch('getgedandetail')
        
        setTimeout(() => {
              this.$router.push({ path: "/detail" });
        }, 1000);
    },
    xiangqing(value){
      var url = "http://localhost:3000/top/playlist/highquality?cat="+value+"&limit=20"
      this.axios.get(url).then(
        res => {
       this.$store.state.getgedan=res.data.playlists

        },
        err => {
          console.log(err);
        }
      );
    }
  }
};
</script>
<style scoped lang="less">
@import '~vux/src/styles/1px.less';
.card-padding {
  padding: 15px;
  padding-left: 0;
    padding-right: 0;
}
.body{
  margin-bottom: 54px;
}
.vux-header{
      position: sticky;
    top: 0;
    z-index: 999
}
</style>