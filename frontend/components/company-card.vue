<template>
  <div class="companyCard">
        <h3>{{ name }}</h3>
        <div>
            <img src="/icons/pin.svg">
            <span>{{ km }}km entfernt</span>
        </div>

        <span class="highlighted">{{ type }} {{ employees }} Mitarbeiter - {{ profession }}</span>

        <tag
            :skill="skills"
        />
  </div>
</template>

<script>
import tag from '@/components/tag_skill.vue'

export default {
    name: 'companyCard',
    props: {
        name: String,
        km: Number,
        type: String, // demand / suply
        employees: Number,
        profession: String,
        skills: Array // object?
    },
    components: {
        tag
    },
    data() {
        return {
            skills: [
                {
                    name: 'Teilzeit'
                },
                {
                    name: 'erste Hilfe'
                },
            ]
        }
    }
}
</script>

<style lang="scss" scoped>
.companyCard {
    max-width: 1000px;
    height: 350px;
    background: #fff;
    border: 2px solid #00000010;
    border-radius: 8px;
    padding: 20px;
    margin-right: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;

    h3 {
        grid-column: 1;
    }

    span {
        grid-column: 1;
    }
}
</style>
