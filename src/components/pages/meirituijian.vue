<template>
  <div class="deaily">
    <x-header title="每日推荐">
      <!--左侧按钮-->
      <div slot="overwrite-left" @click="goback()">
        <i class="fa fa-bars fa-2x" aria-hidden="true"  ></i>
      </div>
    </x-header>
    <div>
      <div class="music">
        <group>
          <cell>
            <i slot="icon" class="fa fa-play-circle" aria-hidden="true"></i>
            <span slot="title">播放全部</span>
            <button after-title>多选</button>
          </cell>
          <cell
            v-for="(item,index) in this.$store.state.MeirituijianGe"
            :key="index"
            @click.native.stop="bofang(item)"
          >
            <img slot="icon" :src="item.album.picUrl" style="width:40px">
            <span slot="title">{{item.name}}</span>
            <span slot="inline-desc">{{item.artists[0].name}}-{{item.name}}</span>
            <i
              slot="value"
              style="    vertical-align:middle"
              class="fa fa-youtube-play"
              aria-hidden="true"
            ></i>
            <i
              after-title
              class="fa fa-ellipsis-v"
              aria-hidden="true"
              style="font-size:18px;    vertical-align:middle"
              @click="alert(item)"
            ></i>
          </cell>
        </group>
      </div>
      <div class="tankuang">
        <popup position="bottom" v-model="it">
          <group>
            <flexbox>
              <flexbox-item>
                <group lable-width="5em">
                  <cell>
                    <span slot="icon">歌曲：</span>
                    <span slot="title">{{musicname}}</span>
                  </cell>

                  <cell v-for="(item,list) in tan" :key="list">
                    <i slot="icon" :class="item.icon" aria-hidden="true"></i>
                    <span slot="title">{{item.title}}</span>
                  </cell>
                </group>
              </flexbox-item>
            </flexbox>
          </group>
        </popup>
      </div>
    </div>
  </div>
</template>
<script>
import {
  XHeader,
  Cell,
  Group,
  Popup,
  Flexbox,
  FlexboxItem,
  ButtonTab,
  ButtonTabItem
} from "vux";

export default {
  components: {
    XHeader,
    Cell,
    Group,
    Popup,
    Flexbox,
    FlexboxItem,
    ButtonTab,
    ButtonTabItem
  },
  data() {
    return {
      list: [],
      it: false,
      musicname: "",
      musicman: "",
      tan: [
        {
          icon: "fa fa-play-circle-o",
          title: "下一首播放"
        },
        {
          icon: "fa fa-folder",
          title: "收藏到歌单"
        },
        {
          icon: "fa fa-download",
          title: "下载"
        },
        {
          icon: "fa fa-commenting-o",
          title: "评论"
        },
        {
          icon: "fa fa-share-alt",
          title: "分享"
        },
        {
          icon: "fa fa-user",
          title: "歌手" 
        },
        {
          icon: "fa fa-gift",
          title: "专辑"
        },
        {
          icon: "fa fa-youtube-play",
          title: "查看视频"
        }
      ]
    };
  },
  methods: {
    alert(value) {
      console.log(1);
      this.it = true;
      this.musicname = value.name;
    },
    bofang(value) {
      //每次播放都应该清空现在播放音乐的值
        this.$store.state.musicurl=""
       
      var url = "http://localhost:3000/song/url?id=" + value.id;
      this.axios.get(url).then(
        res => {
           this.$store.state.musicurl= res.data.data[0].url
       
        this.$store.state.bofangzhuangtai=true
     
        that.$store.state.bofangzhuangtai=true

        },
        err => {
          console.log(err);
        }
      );
     
    },
    goback(){
         this.$router.push({ path: "/HelloWorld" });
    }
  }
};
</script>
<style scoped>
.deaily{
margin-bottom: 54px;
}
.deaily>>> .vux-header{
  position: sticky;
  top: 0;
  z-index: 999;
  width: 100%;
}
.deaily>>>.weui-cells{
  margin: 0;
}
</style>


