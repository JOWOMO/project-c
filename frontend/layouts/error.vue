<template>
  <div class="container">
    <div class="text">
      <h1>404</h1>
      <div class="message">
        <h2>Hier ist nichts</h2>
        <nuxt-link to="/">
          Zurück nach Hause in
          <span>{{ counter }}</span>
        </nuxt-link>
      </div>
    </div>
    <div class="background">
      <img src="/images/ship.svg" />
    </div>
    <cookies />
  </div>
</template>

<script>
import cookies from "@/components/cookies.vue";

export default {
  components: {cookies},
  props: ["error"],
  data() {
    return {
      counter: 5
    };
  },
  mounted() {
    setTimeout(() => {
      // this.$router.push('/')
    }, 5000);
    setInterval(() => {
      this.counter--;
    }, 1000);
  }
};
</script>
<style lang="scss" scoped>
.container {
  height: calc(100vh - 80px);

  .background {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    background: url(../static/images/ocean.svg) no-repeat bottom center;
    height: 300px;
    z-index: 1;

    img {
      position: relative;
      top: 20%;
      left: 50%;
      width: 150px;
      animation: moveShip 6s 1 0s linear;
    }
  }

  .text {
    position: relative;
    top: 30%;
    display: flex;
    flex-direction: row;
    align-items: center;
    z-index: 3;
    width: 80%;
    margin: 0 auto;

    h1 {
      grid-column: 1;
      color: #da2566;
      font-size: 120px;
      justify-self: flex-start !important;
    }

    .message {
      margin-left: 80px;
      text-align: left;

      h2 {
        font-size: 40px;
      }

      a {
        font-weight: normal;

        span {
          font-weight: bold;
          color: #25a6da;
        }
      }
    }
  }
}

@keyframes moveShip {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(200px);
  }
}
</style>
