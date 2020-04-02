<template>
  <div class="container">
    <div class="login-scale">
      <div class="background left"></div>
      <h1>
        Ich
        <span>biete</span>
        <br />Mitarbeiter
      </h1>
      <button @click="user_register" id="biete" class="hover-button">
        Kostenlos Anmelden
        <svg
          width="21"
          height="16"
          viewBox="0 0 21 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
        >
          <path
            d="M20.7071 8.70711C21.0976 8.31658 21.0976 7.68342 20.7071 7.2929L14.3431 0.928933C13.9526 0.538409 13.3195 0.538409 12.9289 0.928933C12.5384 1.31946 12.5384 1.95262 12.9289 2.34315L18.5858 8L12.9289 13.6569C12.5384 14.0474 12.5384 14.6805 12.9289 15.0711C13.3195 15.4616 13.9526 15.4616 14.3431 15.0711L20.7071 8.70711ZM-8.74228e-08 9L20 9L20 7L8.74228e-08 7L-8.74228e-08 9Z"
            fill="#25A6DA"
          />
        </svg>
      </button>
    </div>

    <div class="login-scale">
      <div class="background right"></div>
      <h1>
        Ich
        <span>suche</span>
        <br />Mitarbeiter
      </h1>
      <button v-on:click="company_register" id="suche" class="hover-button">
        Kostenlos Anmelden
        <svg
          width="21"
          height="16"
          viewBox="0 0 21 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
        >
          <path
            d="M20.7071 8.70711C21.0976 8.31658 21.0976 7.68342 20.7071 7.2929L14.3431 0.928933C13.9526 0.538409 13.3195 0.538409 12.9289 0.928933C12.5384 1.31946 12.5384 1.95262 12.9289 2.34315L18.5858 8L12.9289 13.6569C12.5384 14.0474 12.5384 14.6805 12.9289 15.0711C13.3195 15.4616 13.9526 15.4616 14.3431 15.0711L20.7071 8.70711ZM-8.74228e-08 9L20 9L20 7L8.74228e-08 7L-8.74228e-08 9Z"
            fill="#25A6DA"
          />
        </svg>
      </button>
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
  computed: {
    action_text() {
      return this.$store.state.auth.user
        ? "Teams bearbeiten"
        : "Kostenlos anmelden";
    }
  },
  layout: "no-auth",
  methods: {
    demand_register: function() {
      this.$router.push({ path: "/register/start", query: { flow: "demand" } });
    },
    supply_register: function() {
      this.$router.push({ path: "/register/start", query: { flow: "supply" } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/global.scss";
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: calc(100vh - 80px);
  justify-content: center;
  .login-scale {
    display: grid;
    grid-template-rows: 1fr 10fr;
    width: 100%;
    overflow: hidden;
    &:hover .background {
      transform: scale(1.2);
    }
    .background {
      grid-row: 1 / span 2;
      grid-column: 1;
      z-index: 1;
      transition: transform .5s;
    }
    .left {
      background: url(/images/1.jpg) center center no-repeat;
      background-size: cover;
    }
    .right{
      background: url(/images/2.jpg) center center no-repeat;
      background-size: cover;
    }
    h1 {
      grid-row: 1;
      grid-column: 1;
      font-weight: normal;
      color: #fff;
      margin-top: 50px;
      z-index: 3;
      span {
        font-weight: bold;
      }
    }
    button {
      grid-row: 2;
      grid-column: 1;
      justify-self: center;
      width: 300px;
      background: #fff;
      color: $primary;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding: 0 40px;
      margin-top: 30px;
      z-index: 3;
      &:hover {
        background: $primary;
        color: #fff;
        svg {
          path {
            fill: #fff;
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 765px) {
  .container {
    grid-template-columns: 1fr;
    grid-template-rows: 80vh 80vh;
    .login-scale {
      grid-column: 1;
      &:hover .background {
        transform: none;
      }
      .left {
        grid-column: 1;
      }
      .right {
        grid-column: 1;
      }
    }
  }
}
</style>
