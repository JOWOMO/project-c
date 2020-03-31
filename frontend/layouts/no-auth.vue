<template>
  <div>
    <Navbar />
    <nuxt />
    <!-- <Cookie /> -->
  </div>
</template>

<script>
import Navbar from '@/components/navbar.vue'
import Cookie from '@/components/cookies.vue'

export default {
  components: {
    Navbar,
    Cookie
  }

}
</script>
