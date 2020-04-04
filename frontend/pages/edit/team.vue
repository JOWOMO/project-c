<template>
    <div class="container">
        <h1>Teams bearbeiten</h1>
        <p>Bearbeite deine Teams oder füge neue hinzu</p>

        <team 
            ref="save"
            class="team-form"
            v-for="team in teams"
            :key="team.id"
            :flow="flow"
            :id="team.id"
            editing
        />

        <button class="add" @click.prevent="addTeam">
            <div class="circle">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.84615 0H9.15385V14H4.84615V0Z" fill="white"/>
                <path d="M1.88295e-07 9.15385L0 4.84615L14 4.84615V9.15385L1.88295e-07 9.15385Z" fill="white"/>
                </svg>
            </div>

            <span>Weiteres Team hinzufügen</span>
        </button>

        <div class="form-group buttons">
            <button @click.prevent="$router.push('/dashboard')">Zurück</button>
            <button class="primary" @click.prevent="save">Speichern</button>
        </div>
    </div>
</template>

<script>
import team from '@/components/team-form.vue'

export default {
    components: {
        team
    },
    data(){
        return{
            teams: [{
                id: 1
            }]
        }
    },
    methods: {
        save() {
            // TODO: Save to db
        },
        addTeam() {
            this.teams.push({
                id: this.teams.length + 1
            })
        }
    },
    created(){
        console.log(this.$route)
    },
    computed:{
        flow:function(){
            return this.$route.query.flow
        }
    },
}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 400px auto;
  grid-auto-rows: min-content;
  height: 100vh;
  padding: 0;

  .sidebar {
    grid-column: 1;
    grid-row: 1 / span 3;
  }

  h1 {
    grid-column: 2;
    justify-self: left;
    margin: 50px 0 0 10px;
  }

  p {
    grid-column: 2;
    margin: 10px 0 10px 10px;
  }

  .team-form {
    grid-column: 2;
    margin: 20px 10px 0 10px;
  }

  .add {
    grid-column: 2;
    display: flex;
    align-items: center;
    width: auto;
    background: none;
    cursor: pointer;

    .circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #25A6DA;

      svg {
        margin-top: 13px;
      }
    }

    span {
      color: #25A6DA;
      font-weight: bold;
      margin-left: 10px;
      display: inline-block;
    }
  }

  .buttons {
    grid-column: 2;
    margin-top: 20px;
    z-index: 1;
  }
}

@media only screen and (max-width: 950px) {
  .container {
    grid-template-columns: 0fr 1fr;
    width: 100vw;
    padding: 50px 20px;

    p, h1 {
      width: 100%;
      text-align: center;
      margin: 0;
    }

    .sidebar {
      display: none;
    }

    .team-form {
      width: 100%;
      margin: 30px 0 0 0;
    }

    .buttons {
      justify-self: center !important;
    }
  }
}
</style>
