<template>
  <div id="app">
   
    <router-view/>
   
   <div id="audioBox">

</div>
<div   v-if="!(this.$store.state.musicurl.length==0)">
     <audio
      
      controls="controls"
     autoplay
      style="width:100%;background-color: #f1f3f4"
    
    
      class="bottom"
    
    >
     <source :src="this.$store.state.musicurl">
    </audio>
    </div>
  </div>
</template>

<script>
 
export default {
  name: 'App',
  data () {
    return {
     
    }
  },
 
}
</script>

<style>
.bottom {
  
  position: fixed;
  bottom: 0;
}

*{
  margin: 0;
  padding: 0;
}
a{
  text-decoration:none!important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
 
}
</style>
