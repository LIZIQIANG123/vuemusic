<template>
  <div class="detail">
    <div class="zuozhe">
      <group>
        <cell title="歌单" class="gedan" style="font-size:14px">
          <i slot="icon" class="fa fa-arrow-left" aria-hidden="true" @click="gozhuye()"></i>
          <span slot="inline-desc" style="font-size:12px">编辑推荐：开口及时动情，入耳以深陷</span>
          <i
            slot="value"
            class="fa fa-search"
            aria-hidden="true"
            style="color: #fdfdfd;;font-size:25px;margin-right:15px;margin-left:15px"
          ></i>
          <i
            after-title
            class="fa fa-ellipsis-v"
            aria-hidden="true"
            style="font-size:25px;color: #fdfdfd;"
          ></i>
        </cell>
        <cell class="xia">
          <img slot="icon" :src="bg" style="width:100px">
          <span slot="title" class="fontsize">{{this.$store.state.Gendan.data.playlist.name}}</span>
          <span slot="inline-desc" style="margin-top:15px;display:block">
            <img :src="createdpic" style="width:16px;vertical-align:middle;border-radius: 25px">
            {{ GendanCreateUser}}
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
          </span>
        </cell>
      </group>
    </div>
    <div class="music">
      <group>
        <cell>
          <i slot="icon" class="fa fa-play-circle" aria-hidden="true"></i>
          <span slot="title">播放全部(共{{this.$store.state.Gendan.data.playlist.trackCount}}首)</span>
          <button after-title>+ 收藏 ({{this.$store.state.Gendan.data.playlist.subscribedCount}})</button>
        </cell>
        <cell v-for="(item,index) in ge" :key="index" @click.native.stop="bofang(item)">
          <span slot="icon">{{index+1}}</span>
          <span slot="title">{{item.name}}</span>
          <span slot="inline-desc">{{item.ar[0].name}}-{{item.name}}</span>
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
            @click="tankuang(item)"
          ></i>
        </cell>
      </group>
    </div>
    <div class="tankuang">
      <popup v-model="show13" position="bottom">
        <group>
          <flexbox>
            <flexbox-item>
              <group lable-width="5em">
                <cell>
                  <span slot="icon">歌曲：</span>
                  <span slot="title">{{musicname}}</span>
                </cell>

                <cell v-for="(item,list) in tankuan" :key="list">
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
</template>
<script>
import { XHeader, Cell, Group, Popup, Flexbox, FlexboxItem } from "vux";
const musicman = "";
export default {
  components: {
    XHeader,
    Cell,
    Group,
    Popup,
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
      musicurl: "",
      musicname: "",
      bg: this.$store.state.Gendan.data.playlist.coverImgUrl,
      createdpic: "",
      GendanCreateUser: "",
      ge: this.$store.state.Gendan.data.playlist.tracks,
      show13: false,
      tankuan: [
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
          title: "歌手" + musicman
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
  created() {
    var that = this;
    var url =
      "http://localhost:3000/user/detail?uid=" +
      this.$store.state.Gendan.data.playlist.userId;
    this.axios.get(url).then(
      res => {
        that.createdpic = res.data.profile.avatarUrl;
        that.GendanCreateUser = res.data.profile.nickname;
      },
      err => {
        console.log(err);
      }
    );
  },
  methods: {
    bofang(value) {
        
        var that=this
        this.$store.state.musicurl=""
       
      var url = "http://localhost:3000/song/url?id=" + value.id;
    this.axios.get(url).then(
        res => {    
        this.$store.state.musicurl= res.data.data[0].url
       
        this.$store.state.bofangzhuangtai=true

        },
        err => {
          console.log(err);
        }
      );
     
    },
    gozhuye() {
      console.log(333);
      this.$router.push({ path: "/HelloWorld" });
    },
    tankuang(value) {
      this.show13 = true;
      this.musicname = value.name;
      this.musicman = value.ar[0].name;
      console.log(this.musicman);
    }
  }
};
</script>
<style scoped>
.detail{
margin-bottom: 54px;
}
.fontsize {
  font-size: 16px;

  font-weight: 500;
  font-style: normal;
}
.detail >>> .weui-cells {
  margin-top: 0;
}
.zuozhe >>> .weui-cell {
  align-items: flex-start;
}
.gedan {
  align-items: center !important;
  position: fixed;
  z-index: 9999;
  background-color: #a06d2a;
  width: calc(100% - 20px);
}
.gendan >>> .vux-cell-bd {
  padding-left: 20px;
}
.zuozhe >>> .weui-cell__hd img {
  margin-right: 15px;
}
.zuozhe {
  color: white;
}
.zuozhe >>> .vux-label-desc {
  color: white;
}
.music >>> .vux-cell-bd {
  padding-left: 20px;
}
.music >>> .vux-label {
  font-size: 14px;
}
.music >>> .vux-label-desc {
  font-size: 12px;
}
.music >>> .weui-cell {
  align-items: center;
}
button {
  border: none;
  padding: 5px 10px;
  border-radius: 0px 10px 0 0px;
  outline: none !important;
  background-color: #f14343;
  color: #fff2f2;
}
.music {
  border-radius: 15px 15px 0 0px;
  background-color: #fdfdfd;
}
.detail {
  background-color: #a06d2a !important;
}
.xia {
  margin-top: 52px;
}
.zuozhe >>> .weui-cells:before {
  border-bottom: none;
}
.zuozhe >>> .weui-cells {
  background-color: #a06d2a !important;
}
.detail >>> .weui-cells:before {
  border-top: none;
}
body >>> .weui-cells {
  margin-top: 0;
}
.tankuang >>> .weui-cell {
  align-items: start;
}
.tankuang >>> .weui-cell__hd {
  width: 20%;
}
</style>

