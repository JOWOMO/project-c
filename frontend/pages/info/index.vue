<template>
    <div>
        <h1>Q&amp;A</h1>
    </div>
</template>

<script>
export default {
    head () {
        return {
            title: 'Q&A',
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                { hid: 'description', name: 'description', content: 'Eure Fragen, unsere Antworten.' }
            ]
        }
    }
}
</script>

<style>
</style>
