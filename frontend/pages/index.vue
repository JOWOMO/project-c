<template>
  <div class="container">
    <div class="login-scale">
      <div class="left" />
      <div class="cta">
        <h1>
          Ich
          <span>biete</span>
          <br />Mitarbeiter
        </h1>
        <button @click="supply_register" id="biete" class="third">
          {{ action_text }}
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

    <div class="login-scale">
      <div class="right" />
      <div class="cta">
        <h1>
          Ich
          <span>suche</span>
          <br />Mitarbeiter
        </h1>
        <button v-on:click="demand_register" id="suche" class="third">
          {{ action_text }}
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
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from "nuxt-property-decorator";
import { Meta } from "@/components/decorator";

@Component
export default class extends Vue {
  get action_text() {
    return this.$store.state.auth.user
      ? "Teams bearbeiten"
      : "Kostenlos anmelden";
  }

  demand_register() {
    this.$router.push({ path: "/register", query: { flow: "demand" } });
  }

  supply_register() {
    this.$router.push({ path: "/register", query: { flow: "supply" } });
  }

  @Meta
  head() {
    return {
      title: "Willkommen bei Bee2Bee",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content:
            "Wir bieten eine Plattform für kleine / mittelständige Unternehmen um Mittarbeier vor der Kurzarbeit zu bewahren. Unternehmen können Mitarbeiter an andrere zum gleichen Lohn ausleihen. Eventuelle Unterschiede im Lohn zahlt das Arbeitsamt."
        }
      ]
    };
  }
}
</script>

<style lang="scss" scoped>
@import "~assets/colors";

.container {
  display: flex;
  flex-direction: row;
}

.login-scale {
  display: flex;
  flex: 1;
  height: calc(100vh - 120px);

  justify-content: center;
  align-items: center;
  flex-direction: column;

  position: relative;
}

button {
  width: 100%;

  svg {
    transform: translateY(2px);
    margin-left: 10px;
  }
}

h1 {
  color: white;
  font-weight: 100;
  font-size: 60px;
  line-height: 60px;

  span {
    font-weight: bold;
  }

  padding-bottom: 44px;
}

.cta {
  position: absolute;
}

.left, .right {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-size: cover;
    -webkit-filter: brightness(90%);
}

.left {
  background: url(/images/1.jpg) center center no-repeat;
}

.right {
  background: url(/images/2.jpg) center center no-repeat;
}

.login-scale:hover {
  .left, .right {
    -webkit-filter: brightness(60%);
    -webkit-transition: all 1s ease;
    -moz-transition: all 1s ease;
    -o-transition: all 1s ease;
    -ms-transition: all 1s ease;
    transition: all 1s ease;
  }
}

@media only screen and (max-width: 765px) {
  .container {
      flex-direction: column;
      display: block;
  }
}
</style>
