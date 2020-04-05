<template>
  <div>
    <Navbar />
    <nuxt v-if="state"/>
    <loading v-else></loading>
    <Cookie />
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
  // Dispatch loadUser in vuex store
  middleware: ['loaduser'],
  data(){
    return{
      state:true
    }
  }
}
</script>
