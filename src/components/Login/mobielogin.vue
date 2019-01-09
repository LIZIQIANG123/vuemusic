<template>
  <div>
    <x-header :left-options="{backText: ''}">手机号登录</x-header>

    <x-input
      placeholder="+86 请输入手机号码"
      mask="99999999999"
      v-model="zhanghao"
      :max="13"
      is-type="china-mobile"
      style="padding-top:50px"
    >
      <i slot="label" style="padding-right:10px;" class="fa fa-mobile" aria-hidden="true"></i>
    </x-input>
    <x-input placeholder="请输入密码" v-model="pwd">
      <i slot="label" style="padding-right:10px;" class="fa fa-lock" aria-hidden="true"></i>
      <a slot="right">忘记密码？</a>
    </x-input>
    <button @click="denglu">登录</button>
  </div>
</template>
<script>
import axios from "axios";
axios.defaults.withCredentials = true;
import { XHeader, XInput } from "vux";
import { create } from "domain";
export default {
  components: {
    XHeader,
    XInput
  },
  data() {
    return {
      zhanghao: "",
      pwd: ""
    };
  },
  methods: {
    denglu() {
      console.log(23)
    
      var c =
        "http://localhost:3000/login/cellphone?phone=" +
        this.zhanghao +
        "&password=" +
        this.pwd +
        "";
      
      axios.get(c).then(
        res => {
              console.log(c)
        this.$store.dispatch('setzhi')
        this.$store.dispatch('getstatus')
        this.$store.dispatch('getUserid')

      console.log("变"+this.$store.state.userId)  
          this.$router.push({ path: "/HelloWorld" });
        },
        err => {
          reject(err);
        }
      );
    }
  }
};
</script>
<style scoped>
button {
  width: 80%;
  margin: 0 auto;

  padding: 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  color: white;
  border: 1px solid #a96a6a;
  border-radius: 27px;
  background-color: #d21010;
  outline: none !important;
}
</style>

