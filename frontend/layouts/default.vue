<template>
  <div>
    <Navbar></Navbar>
    <nuxt v-if="state"/>
    <loading v-else></loading>
    <Cookie v-if="!Cookie"></Cookie>
  </div>
</template>

<script>
import Navbar from '@/components/navbar.vue'
import Cookie from '@/components/cookies.vue'
import loading from '@/components/loading.vue'

export default {
  components: {
    Navbar,
    Cookie,
    loading
  },
  data(){
    return{
      Cookie:true,
      state:false
    }
  },
  async beforeCreate(){
    const cookie = this.$cookies.get('accepted Cookies')
    this.Cookie = cookie;

    const user = await this.$store.dispatch('auth/load')
    console.log(this.$store.state.auth.isAuthenticated)
    if(!this.$store.state.auth.isAuthenticated){
      this.$router.push("/login") 
    }else{
      this.state = true;
    }
  },
  computed:{
    onload(){
      console.log("loggin in")
      this.$store.dispatch('auth/load')
    },
  
  },
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
</style>
