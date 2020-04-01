<template>
  <div>
    <Navbar />
    <nuxt />
    <!-- <Cookie /> -->
  </div>
</template>

<script>
import Navbar from '@/components/navbar.vue'
// import Cookie from '@/components/cookies.vue'

export default {
  components: {
    Navbar,
    // Cookie
  },

  middleware: ['loaduser'],

  //  async beforeCreate(){
  //   const cookie = this.$cookies.get('accepted Cookies')
  //   this.Cookie = cookie;

  //   // const user = await this.$store.dispatch('auth/load')
  //   // console.log(this.$store.state.auth.isAuthenticated)
  //   // if(!this.$store.state.auth.isAuthenticated){
  //   //   this.$store.commit('save_route',this.$router.path)
     
  //   // }else{
  //     this.state = true;
  //   // }
  // },

}
</script>
