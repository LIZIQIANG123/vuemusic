<template>
    <div>
        <flexbox>
           
            <flexbox-item > <x-input  :is-type="be2333" placeholder="alnner" @on-change="changge"></x-input></flexbox-item>

        </flexbox>
        <group>
            <cell></cell>
        </group>
        <flexbox :gutter="0" wrap="wrap">
         
      <flexbox-item :span="1/4" v-for="(item,index) in hotsearch" :key="index"> <badge :text="item.first"></badge></flexbox-item>
     
    </flexbox>
    </div>
</template>
<script>
import { Flexbox, FlexboxItem, Badge,XInput,Group,Cell  } from 'vux'
export default {
     components: {
    Flexbox,
    FlexboxItem,
  Badge ,
  XInput ,
  Group,Cell 
  },
  data () {
      return {
          hotsearch:[],
          searchresult:[],
      }
  },
  methods: {
      
      changge(val){
          var that=this;
        this.axios.get("http://localhost:3000/search?keywords="+val).then(
      res => {
         
   
       
         console.log(res)
      },
      err => {
        reject(err);
      }
    );
      }
  },
  created () {
      var that=this;
      this.axios.get("http://localhost:3000/search/hot").then(
      res => {
         
   
       that.hotsearch=res.data.result.hots
          console.log(that.hotsearch);
      },
      err => {
        reject(err);
      }
    );
  }
}
</script>
<style scoped>

</style>

