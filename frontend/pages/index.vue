<template>
  <div class="container">
    <div class="b2b-login-wrapper">
      <div class="b2b-login-scale">
        <div class="b2b-login-left-bg"></div>
        <h2>
          Ich
          <span>biete</span>
          <br />Mitarbeiter
        </h2>
        <button @click="user_register" id="biete" class="hover-button">Kostenlos Anmelden</button>
      </div>

      <div class="b2b-login-scale">
        <div class="b2b-login-right-bg"></div>
        <h2>
          Ich
          <span>suche</span>
          <br />Mitarbeiter
        </h2>
        <button v-on:click="company_register" id="suche" class="hover-button">Kostenlos Anmelden</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Willkommen bei Bee2Bee",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content:
            "Wir bieten eine Plattform für kleine / mittelständige Unternehmen Mittarbeier vor der Kurzarbeit zu bewahren. Unternehmen können Mitarbeiter an andrere zum gleichen Lohn ausleihen. Eventuelle Unterschiede zahlt das Arbeitsamt."
        }
      ]
    };
  },

  middelware:'authenticated',
  methods: {
    user_register: function() {
      this.$router.push("/register/user");
    },
    company_register: function() {
      this.$router.push("/register/company");
    }
  },
  computed: {
    onload: function() {
      console.log("loggin in");
      this.$store.dispatch("auth/load");
    }
  }
  // asyncData({ store }) {
  //   console.log("Entering async Data")
  //   if(process.server) {
  //     console.log('on server')
  //   } else {
  //     console.log('on client')
  //     store.dispatch('auth/load')
  //     console.log(store.dispatch('auth/load'))
  //   }
  //}
};
</script>

<style lang="scss">
nav {
  position: absolute;
  background: #fff;
  z-index: 3;
}

.b2b-login-wrapper {
  display: flex;
  flex-direction: row;
  position: absolute;

  .b2b-login-scale {
    overflow: hidden;
    position: fixed;
    width: 50vw;
    height: 100vh;

    &:nth-of-type(even) {
      right: 0;
    }

    &:nth-of-type(odd) {
      left: 0;
    }

    .b2b-login-left-bg {
      background: url(/images/1.jpg) no-repeat center center;
      background-size: cover;
      transition: all 1s ease;
      height: 100%;

      &:hover {
        transform: scale(1.2);
      }
    }

    .b2b-login-right-bg {
      background: url(/images/2.jpg) no-repeat center center;
      background-position: center;
      background-size: cover;
      transition: all 1s ease;
      height: 100%;

      &:hover {
        transform: scale(1.2);
      }
    }

    h2 {
      font-weight: normal;
      font-size: 40px;
      z-index: 2;
      position: relative;
      bottom: 300px;
      color: #fff;
      margin-left: 50px;

      span {
        font-weight: bold;
      }
    }

    button {
      margin: 20px 20px 20px 50px;
      padding: 10px;
      width: 350px;
      border-radius: 40px;
      color: deepskyblue;
      font-size: 20px;
      background-color: #fff;
      border: none;
      outline: none;
      z-index: 3;
      position: relative;
      bottom: 250px;

      i {
        margin-left: 10px;
      }
    }

    button:hover {
      background-color: deepskyblue;
      color: white !important;
    }
  }
}

@media only screen and (max-width: 768px) {
  .b2b-login-wrapper {
    flex-direction: column !important;
    width: 100vw !important;
    overflow: hidden;

    .b2b-login-scale {
      width: 100vw !important;
      height: 80vh !important;
      position: relative !important;
      overflow: visible !important;
      text-align: center;

      &:nth-of-type(even) {
        top: 0;
      }

      &:nth-of-type(odd) {
        bottom: 0;
      }

      .b2b-login-left-bg:hover,
      .b2b-login-right-bg:hover {
        transform: none !important;
      }

      h2 {
        margin: 0;
        bottom: 240px;
      }

      button {
        margin: 0;
        width: 80%;
        bottom: 200px;
      }
    }
  }
}
</style>
