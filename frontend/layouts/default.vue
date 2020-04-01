<template>
  <div>
    <Navbar></Navbar>
    <nuxt v-if="state"/>
    <loading v-else></loading>
    <!-- <Cookie v-if="!Cookie"></Cookie> -->
  </div>
</template>

<script>
import Navbar from '@/components/navbar.vue'
// import Cookie from '@/components/cookies.vue'
import loading from '@/components/loading.vue'

export default {
  components: {
    Navbar,
    // Cookie,
    loading
  },

  middleware: ['loaduser'],

  data(){
    return{
      // Cookie:true,
      state:true
    }
  },

  // async beforeCreate(){
  //   const cookie = this.$cookies.get('accepted Cookies')
  //   this.Cookie = cookie;

  //   const user = await this.$store.dispatch('auth/load')
  //   // console.log(this.$store.state.auth.isAuthenticated)
  //   // if(!this.$store.state.auth.isAuthenticated){
  //   //   this.$store.commit('save_route',this.$router.history.current.path)
  //   //   this.$router.push("/login")
  //   // }else{
  //     this.state = true;
  //   // }
  // },

  // computed:{
  //   onload(){
  //     console.log("loggin in")
  //     this.$store.dispatch('auth/load')
  //   }
  // }
}
</script>
