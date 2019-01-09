<template>
  <div>
    <div class="mymusic">
      <div class="ourmusic">
        <group label-width="10em">
          <cell v-for="(item,index) in list" :key="index" style="padding-bottom:0 !important">
            <i slot="icon" :class="item.icon" aria-hidden="true"></i>
            <span slot="title" style="color:green;">
              <span style="vertical-align:middle;">{{item.title}}</span>
              <badge :text="item.num"></badge>
            </span>
            <i after-title class="fa fa-volume-up" style="olor: #c62f2f" v-show="item.state"></i>
          </cell>
        </group>
      </div>

      <!--折叠-->
      <div class="zhedie">
        <group >
          <cell 
            :arrow-direction="showContent001 ? 'up' : 'down'"
            @click.native="showContent001 = !showContent001"
          >
            <i slot="icon" class="fa fa-chevron-down" aria-hidden="true" v-if="showContent001"></i>
            <i slot="icon" class="fa fa-chevron-down fa-rotate-270" aria-hidden="true" v-else></i>
            <span slot="title" style="color:green;">
              <span style="vertical-align:middle;">创建的歌单</span>
              <badge :text="num1"></badge>
            </span>
            <i after-title class="fa fa-cog" style="olor: #c62f2f" @click.stop="caozuo"></i>
          </cell>
          <div v-if="showContent001">
            <group v-for="(item,index) in  Ilike" :key="index">
              <cell
                :border-intent="false"
                class="sub-item"
                :inline-desc="item.describe"
                @click.native="consolelink(item.coverImgUrl)"
              >
                <span slot="title">{{item.name}}</span>
                <img slot="icon" :src="item.coverImgUrl" aria-hidden="true" style="width:50px">
                <span slot="inline-desc">{{item.trackCount}}</span>
                
                <i
                  after-title
                  class="fa fa-ellipsis-v"
                  style="olor: #c62f2f"
                  @click.stop="consoletest(item)"
                ></i>
              </cell>
            </group>
          </div>
        </group>
      </div>

      <!-- 点击我创建的歌单右边设置出现的弹框-->
      <div v-transfer-dom>
        <popup v-model="show13" position="bottom" max-height="50%">
          <group :title="title">
            <cell>
              <i slot="icon" class="fa fa-trash-o fa-2x" aria-hidden="true"></i>
              <span slot="title" style="color:green;">
                <span style="vertical-align:middle;">删除</span>
              </span>
            </cell>
          </group>
        </popup>
      </div>

      <div class="zhedie2">
        <group>
          <cell
            :arrow-direction="showContent002 ? 'up' : 'down'"
            @click.native="showContent002 = !showContent002"
          >
            <i slot="icon" class="fa fa-chevron-down" aria-hidden="true" v-if="showContent002"></i>
            <i slot="icon" class="fa fa-chevron-down fa-rotate-270" aria-hidden="true" v-else></i>
            <span slot="title" style="color:green;">
              <span style="vertical-align:middle;">收藏的歌单</span>
              <badge :text="num"></badge>
            </span>
            <i after-title class="fa fa-cog" style="olor: #c62f2f" @click.stop="caozuo"></i>
          </cell>

          <div v-if="showContent002">
            <group v-for="(item,index) in  Shoucang" :key="index">
              <cell
                :border-intent="false"
                class="sub-item"
                :inline-desc="item.describe"
                @click.native="godetail(item)"
              >
                <span slot="title">{{item.name}}</span>
                <img slot="icon" :src="item.coverImgUrl" aria-hidden="true" style="width:50px">
                <span slot="inline-desc">{{item.trackCount}}by{{item.creator.nickname}}</span>
                
                <i
                  after-title
                  class="fa fa-ellipsis-v"
                  style="olor: #c62f2f"
                  @click.stop="consoletest(item)"
                ></i>
              </cell>
            </group>
          </div>
        </group>
      </div>
      <!-- 点击我创建的歌单右边设置出现的弹框-->
      <div v-transfer-dom>
        <popup v-model="show13" position="bottom" max-height="50%">
          <group title="创建的歌单" lable-width="5em">
            <cell
              v-for="(item,list) in chuangjiangedanlist"
              :key="list"
              @click.native="click(item)"
            >
              <i slot="icon" :class="item.icon" aria-hidden="true"></i>
              <span slot="title" style="color:green;">
                <span style="vertical-align:middle;">{{item.title}}</span>
              </span>
            </cell>
          </group>
        </popup>
      </div>
      <!-- 点击我喜欢的音乐右边三个点出弹框-->
      <div v-transfer-dom class="alert">
        <popup v-model="show2" position="bottom" max-height="50%">
          <group :title="title">
            <cell v-for="(item,index) in alert" :key="index">
              <i slot="icon" :class="item.icon" aria-hidden="true"></i>
              <span slot="title" style="color:green;display:flex">
                <span style="vertical-align:middle;">{{item.title}}</span>
              </span>
            </cell>
          </group>
        </popup>
      </div>
      <confirm v-model="show5"
      show-input
      ref="confirm5"
      title="创建歌单名字"
      @on-cancel="onCancel"
      @on-confirm="onConfirm5">
      </confirm>
    </div>
  </div>
</template>
<script>
import { Group, Cell, Badge, CellBox, TransferDom, Popup,Confirm  } from "vux";
import axios from "axios";
import { throws } from 'assert';
axios.defaults.withCredentials = true;
export default {
  directives: {
    TransferDom
  },
  components: {
    Group,
    Cell,
    Badge,
    CellBox,
    TransferDom,
    Popup,
    Confirm

  },
  methods: {
    consoletest(value) {
      console.log(value);
      let that = this;
      that.show2 = true;
      that.title = "歌单：" + value.title;
    },
    godetail(value) {
      console.log(value.id);
      this.$store.state.GendanId = value.id;
      this.$store.dispatch("getgedandetail");

      setTimeout(() => {
        this.$router.push({ path: "/detail" });
      }, 1000);
    },
    click(value) {
      if (value.click == "创建新歌单") {
        this.show5=true
      }
    },
    onCancel(){

    },
    onConfirm5(value){
      this.$store.state.createdgedanname=value;
      this.$store.dispatch("createnewgedan");
      this.$store.dispatch("getUserid");

      this.show13=false
    },
    caozuo() {
      let that = this;

      that.show13 = true;
    }
  },
  created() {
    this.Ilike = this.$store.state.createdMusicPance;
  },
  data() {
    return {
      title: "",
      show5:false,
      showContent001: false,
      showContent002: false,
      chuangjiangedanlist: [
        {
          icon: "fa fa-plus-square-o  fa-fw",
          title: "创建新歌单",
          click: "创建新歌单"
        },
        {
          icon: "fa fa-id-card-o  fa-fw ",
          title: "歌单管理",
          click: "歌单管理"
        },
        {
          icon: "fa fa-history  fa-fw",
          title: "恢复歌单",
          click: "恢复歌单"
        }
      ],
      num1: this.$store.state.createdMusicPance.length,
      num: this.$store.state.ShoucangGedan.length,
      Shoucang: this.$store.state.ShoucangGedan,
      show13: false,
      show2: false,
      Ilike: [],
      alert: [
        {
          title: "分享",
          icon: " fa fa-share-alt"
        },
        {
          title: "编辑",
          icon: "fa fa-pencil"
        },
        {
          title: "删除",
          icon: "fa fa-trash-o"
        }
      ],
      list: [
        {
          icon: "fa fa-music fa-2x  fa-fw",
          title: "我的音乐",
          state: true,
          num: "(28)"
        },
        {
          icon: "fa fa-skyatlas fa-2x  fa-fw",
          title: "最近播放",
          state: false,
          num: "(18)"
        },
        {
          icon: "fa fa-podcast fa-2x  fa-fw",
          title: "我的电台",
          state: false,
          num: "(1)"
        },
        {
          icon: "fa fa-user-circle-o fa-2x  fa-fw",
          title: "我的收藏",
          state: false,
          num: "(3)"
        }
      ]
    };
  }
};
</script>
<style scoped>
.alert >>> .vux-cell-bd {
  padding-left: 10px;
}
.mymusic >>> .weui-cells {
  margin-top: 0;
}
.ourmusic >>> .vux-label {
  padding-left: 10px;
}
.fa {
  display: flex;
}
.zhedie >>> .weui-cell__hd {
  padding-right: 10px;
}
.zhedie2 >>> .weui-cell__hd {
  padding-right: 10px;
}
</style>
