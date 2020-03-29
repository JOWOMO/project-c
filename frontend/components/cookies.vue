<template>
  <div class="cookies" v-if="show">
    <p>Wir nutzen Cookies um ihnen die bestmögliche Erfahrung auf unserer Webseite zu liefern.</p>
    <button @click="accept = !accept">Ablehnen</button>
    <button class="accept" @click="accept">Ak­zep­tie­ren</button>
  </div>
</template>

<script>
export default {
  name: 'Cookie',
  data() {
    return {
      show: true
    }
  },
  methods: {
    accept() {
      this.show = false
      this.$cookies.set('accepted Cookies', true)
    }
  },
 
  
}
</script>

<style lang="scss" scoped>
.cookies {
  z-index:10;
  width: 50vw;
  background: deepskyblue;
  border-radius: 10px;
  text-align: center;
  position: fixed;
  bottom: 20px;
  left: 25vw;
  padding: 20px;
  z-index: 10;

  p {
    color: white;
  }

  button {
    color: #fff;
    background: none;
    border: none;
    outline: none;
    font-size: 16px;
    padding: 5px 10px;
    margin: 10px;
  }

  .accept {
    background: #fff;
    color: deepskyblue;
    border-radius: 20px;
  }
}
</style>
