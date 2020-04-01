<template>
  <div class="container">
    <div class="b2b-login-wrapper">
      <div class="b2b-login-scale">
        <div class="b2b-login-left-bg"></div>
        <h1>
          Ich
          <span>biete</span>
          <br />Mitarbeiter
        </h1>
        <button @click="user_register" id="biete" class="hover-button">
          Kostenlos Anmelden
          <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
            <path d="M20.7071 8.70711C21.0976 8.31658 21.0976 7.68342 20.7071 7.2929L14.3431 0.928933C13.9526 0.538409 13.3195 0.538409 12.9289 0.928933C12.5384 1.31946 12.5384 1.95262 12.9289 2.34315L18.5858 8L12.9289 13.6569C12.5384 14.0474 12.5384 14.6805 12.9289 15.0711C13.3195 15.4616 13.9526 15.4616 14.3431 15.0711L20.7071 8.70711ZM-8.74228e-08 9L20 9L20 7L8.74228e-08 7L-8.74228e-08 9Z" fill="#25A6DA"/>
          </svg>
        </button>
      </div>

      <div class="b2b-login-scale">
        <div class="b2b-login-right-bg"></div>
        <h1>
          Ich
          <span>suche</span>
          <br />Mitarbeiter
        </h1>
        <button v-on:click="company_register" id="suche" class="hover-button">
          Kostenlos Anmelden
          <svg width="21" height="16" viewBox="0 0 21 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon">
            <path d="M20.7071 8.70711C21.0976 8.31658 21.0976 7.68342 20.7071 7.2929L14.3431 0.928933C13.9526 0.538409 13.3195 0.538409 12.9289 0.928933C12.5384 1.31946 12.5384 1.95262 12.9289 2.34315L18.5858 8L12.9289 13.6569C12.5384 14.0474 12.5384 14.6805 12.9289 15.0711C13.3195 15.4616 13.9526 15.4616 14.3431 15.0711L20.7071 8.70711ZM-8.74228e-08 9L20 9L20 7L8.74228e-08 7L-8.74228e-08 9Z" fill="#25A6DA"/>
          </svg>
        </button>
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
  layout:'no-auth',
  middelware:'authenticated',
  methods: {
    user_register: function() {
      this.$router.push("/register/offer/user");
    },
    company_register: function() {
      this.$router.push("/register/search/user");
    }
  },
  computed: {
    onload: function() {
      console.log("loggin in");
      this.$store.dispatch("auth/load");
    }
  }
};
</script>

<style lang="scss">
@import '~assets/global.scss';

.container {
  padding: 0;

  .b2b-login-wrapper {
    display: flex;
    flex-direction: row;

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

      &:hover .b2b-login-left-bg, &:hover .b2b-login-right-bg {
        transform: scale(1.2);

          &::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #00000040;
          }
      }

      .b2b-login-left-bg {
        background: url(/images/1.jpg) no-repeat center center;
        background-size: cover;
        transition: all 1s ease;
        height: 100%;
      }

      .b2b-login-right-bg {
        background: url(/images/2.jpg) no-repeat center center;
        background-position: center;
        background-size: cover;
        transition: all 1s ease;
        height: 100%;
      }

      h1 {
        z-index: 2;
        position: absolute;
        top: 100px;
        color: #fff;

        span {
          font-weight: bold;
        }
      }

      button {
        padding: 10px;
        width: 300px;
        border-radius: 40px;
        color: $primary;
        font-size: 20px;
        background-color: #fff;
        z-index: 3;
        position: absolute;
        top: 200px;
        left: 50%;
        transform: translate(-50%, -50%);
      }

      button:hover {
        background-color: deepskyblue;
        color: white !important;

        svg {
          path {
            fill: #fff;
          }
        }
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .container {
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

        button {
          margin: 0;
          width: 60%;
          top: 250px;
          left: 50%;
        }
      }
    }
  }
}

@media only screen and (max-width: 450px) {
  button {
    width: 90% !important;
    padding: 0 !important;
  }
}

</style>
