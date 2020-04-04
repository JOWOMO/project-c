<template>
  <aside class="register-sidebar">
    <nuxt-link to="/" class="logo"><img src="/images/logo.svg"></nuxt-link>
    <div class="wrapper-content">
    <p>Ich {{ flow }}</p> <!-- TODO: add team edit page -->
     <div v-if="flow == 'suche'">
       <div v-for="element in data" :key="element.id" class="sidebar-element-wrapper">
          <div @click="changeTeam(element)" class="sidebar-element"> 
              <img src="/icons/arrow-left.svg">
              <p>{{ element.name }}</p>       
          </div>
       </div>
     </div>
     <div v-else >
       <div v-for="element in data" :key="element.id" class="sidebar-element-wrapper">
        <div class="sidebar-element"> 
          <img src="/icons/arrow-left.svg">
          <p>{{ element.name }}</p>       
        </div>
      </div>
      <nuxt-link to="/edit/team">Teams verwalten</nuxt-link>
    </div>
    </div>
  </aside>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "sidebar",  
  computed: {
    ...mapGetters(["get_sidebar_position"])
  },
  watch: {
    positions: function(val) {
      console.log("val: ", val);
    }
  },
  props:{
   data:Array,
   flow:String
  },
  data() {
    return {
      searcOffer: 'suche'
    }
  },
  methods:{
    
    changeTeam(team){
      this.$emit("handel-state",team  )
    }
  }

};
</script>

<style lang="scss" scoped>
// @import "~assets/global.scss";

aside {
  width: 350px;
  height: 100vh;
  background: #fff;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;   
  .wrapper-content{
    margin-top:50px;
  .sidebar-element-wrapper {
    position: relative;
    top: 10%;
    transform: translate(0, -50%);

    .sidebar-element {
      display: flex;
      flex-direction: row;
    img{
      margin-right:10px;
    }
      margin: 20px 0;
      .circle {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: #DA2566;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        p {
          color: #fff;
          font-size: 18px;
          font-weight: normal;
        }
      }

    }
  }
  }
}

@media only screen and (max-width: 1150px){
  aside {
    width: 40vw;
    z-index: 5;

    .logo {
      img {
        width: 80%;
      }
    }
  }
}
@media only screen and (max-width: 450px){
  aside {
    width: 80vw;
    z-index: 5;
  }
}
</style>
