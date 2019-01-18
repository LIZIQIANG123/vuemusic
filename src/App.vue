<template>
  <div id="app">
   
    <router-view/>
     <audio
      
      controls="controls"
      autoplay
      style="width:100%;background-color: #f1f3f4"
      preload="auto"
      v-if="!(this.$store.state.musicurl==''||this.$store.state.musicurl==null)"
      class="bottom"
    >
     <source :src="this.$store.state.musicurl">
    </audio>
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
