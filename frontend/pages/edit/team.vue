<template>
    <div class="container">
        <h1>Teams bearbeiten</h1>
        <p>Bearbeite deine Teams oder füge neue hinzu</p>

        <team 
            ref="save"
            class="team-form"
            v-for="team in teams"
            :key="team.id"
            flow="offer"
            :id="team.id"
        />
    </div>
</template>

<script>
import team from '@/components/team-form.vue'

export default {
    components: {
        team
    }
}
</script>

<style lang="scss" scoped>

</style>
