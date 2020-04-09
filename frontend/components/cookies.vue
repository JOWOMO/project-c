<template>
  <div class="cookies" v-if="show">
    <p>Wir nutzen Cookies um ihnen die bestmögliche Erfahrung auf unserer Webseite zu liefern.</p>
    <button @click="decline" class="decline">Ablehnen</button>
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
      this.$gtm.init(process.env.gtmId)
      this.$cookies.set('_bee2beeCookieBanner', true)
      this.show = false
    },
    decline() {
      this.$cookies.set('_bee2beeCookieBanner', false)
      this.show = false
    }
  },
  mounted() {
    const accepted = this.$cookies.get('_bee2beeCookieBanner')
    if(accepted === true) {
      this.$gtm.init(process.env.gtmId)
      this.show = false
    } else if (accepted != undefined || null) {
      this.show = false
    }
    console.log(accepted)
  }
}
</script>

<style lang="scss" scoped>
.cookies {
  z-index:10;
  width: 400px;
  background: #25A6DA;
  border-radius: 10px;
  text-align: center;
  position: fixed;
  left: 50%;
  transform: translate(-50%, 0);
  bottom: 20px;
  padding: 20px;
  z-index: 20;
  margin: 0 auto;

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
    width: 200px;
  }

  .decline {
    height: 20px;
  }

  .accept {
    background: #fff;
    color: #25A6DA;
    border-radius: 25px;
  }
}

@media only screen and (max-width: 765px) {
  .cookies {
    width: 90%;

  }
}
</style>
