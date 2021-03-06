import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import {
  stat
} from 'fs';

Vue.use(Vuex);



const state = {
  isShow: false,
  UserName: "",
  MeirituijianGeDan: [],
  userId: "",
  createdMusicPance: [],
  ShoucangGedan: [],
  GendanId: '',
  Gendan: [],
  Gedanmusiccount: '',
  Ge: [],
  createdgedanname: '',
  getgedan: [],
  JingpinGedan: [],
  musicurl:'',
  bofangzhuangtai:true,
  MeirituijianGe:[]
}


const getters = {
  isShowMethod(state) {
    return state.isShow;
  },
  getUserid(state) {
    return state.userId;
  }
}

const actions = {
  showSideBar({
    commit
  }) {
    commit('showBar')
  },
  hideSideBar({
    commit
  }) {
    commit('hideBar')
  },
  gomusic({
    commit
  }) {
    commit('link')
  },
  getstatus({
    commit
  }) {
    commit('get_status')
  },
  //获取用户推荐歌单
  async setzhi({
    commit
  }) {
    commit('set_zhi')
  },
  //获取用户状态
  async getstatus({
    commit
  }) {
    setTimeout(() => {
      commit('get_status')
    }, 500)
  },
  //获取用户id
  async getUserid({
    commit
  }) {

    setTimeout(() => {
      commit('get_Userid')
    }, 1500)
  },
  async getgedandetail({
    commit
  }) {
    setTimeout(() => {
      (console.log(233))
      commit('get_gedandetail')
    }, 500)
  },
  async createnewgedan({
    commit
  }) {
    setTimeout(() => {

      commit('ceated_gedan')
    }, 500)
  },
  async getgedan({
    commit
  }) {
    setTimeout(() => {
      commit('getgedan')
    }, 500),
    setTimeout(() => {
      commit('getjinpingedan')
    }, 500)
  },
  async gettuijian({
    commit
  }) {
    setTimeout(() => {
      commit('gettuijian')
    }, 500)
  },
}


/*改变state数据的方法*/
const mutations = {
  showBar(state) {
    state.isShow = true;
  },
  hideBar(state) {
    state.isShow = false;
  },
  link() {
    console.log(33)
  },
  set_zhi(state) {
    axios.get("http://localhost:3000/recommend/resource").then(
      res => {
        sessionStorage.setItem("tuijiangedan", JSON.stringify(res.data.recommend))
      },
      err => {
        reject(err);
      }
    )
  },
  get_status(state) {
    //获取用户Id
    axios.get("http://localhost:3000/login/status").then(
      res => {
        state.userId = res.data.profile.userId;
        state.UserName = res.data.profile.nickname;
      },
      err => {

        console.log(err)
      }
    );

  },
  ceated_gedan(state) {
    var url = 'http://localhost:3000/playlist/create?name=' + state.createdgedanname
    axios.get(url).then(
      res => {
        console.log(888)
      }, err => {

      })
  },
  get_Userid(state) {
    console.log(state.createdMusicPance.length)
    if (state.createdMusicPance.length > 0) {

      state.createdMusicPance = []
    }
    console.log(state.userId)
    var url = 'http://localhost:3000/user/playlist?uid=' + state.userId
    axios.get(url).then(
      res => {
        console.log(res.data.playlist)
        var arr = res.data.playlist
        console.log(state)
        arr.map(function (value, key, arr) {
          if (value.creator.nickname == state.UserName) {
            state.createdMusicPance.push(value)
            state.createdMusicPance.num = state.createdMusicPance.length
          } else {
            state.ShoucangGedan.push(value)

          }
        })

      },
      err => {
        console.log(err)
      }
    );
  },
  get_gedandetail(state) {
   
    var url = 'http://localhost:3000/playlist/detail?id=' + state.GendanId
    axios.get(url).then(
      res => {
        console.log(res)
        state.Gendan = res

      }, err => {
        console.log(err)
      })
  },
  getgedan(state) {
    var url = 'http://localhost:3000/top/playlist?limit=10'
    axios.get(url).then(
      res => {
        state.getgedan = res.data.playlists
console.log(state.getgedan)
      }, err => {
        console.log(err)
      })
  },
  getjinpingedan(state) {
    axios.get('http://localhost:3000/top/playlist/highquality?before=&limit=1').then(
      res => {
        state.JingpinGedan = res
      }, err => {
        console.log(err)
      })
  },
  gettuijian(state){
    axios.get('http://localhost:3000/recommend/songs').then(
      res => {
        state.MeirituijianGe = res.data.recommend
        console.log(res)
      }, err => {
        console.log(err)
      })
  }
}


export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
