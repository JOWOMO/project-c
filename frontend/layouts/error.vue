<template>
  <div class="container">
    <div class="text">
      <h1>{{error.statusCode}}</h1>
      <div class="message">
        <h2>{{error.message}}</h2>
        <nuxt-link to="/">
          Zurück nach Hause
          <!-- <span>{{ counter }}</span> -->
        </nuxt-link>
      </div>
    </div>
    <div class="background">
      <img src="/images/error/ship.svg" />
    </div>
  </div>
</template>

<script>
const DURATION = 10;

export default {
  props: ["error"],
  // data() {
  //   return {
  //     counter: DURATION
  //   };
  // },
  mounted() {
    // setTimeout(() => {
    //   this.$router.push("/");
    // }, DURATION * 1000);

    // setInterval(() => {
    //   this.counter--;
    // }, 1000);
  }
};
</script>

<style lang="scss" scoped>
@import '@/assets/colors';

.container {
  height: calc(100vh - 80px);

  .background {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    background: url(/images/error/ocean.svg) no-repeat bottom center;
    height: 300px;
    z-index: 1;

    img {
      position: relative;
      top: 10%;
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
      color: $secondary;
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
        color: #000;

        span {
          font-weight: bold;
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
