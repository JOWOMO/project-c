<template>
<div>
    <h1>About</h1>
</div>
</template>

<script>
export default {
    head () {
        return {
            title: 'About',
            meta: [
                // hid is used as unique identifier. Do not use `vmid` for it as it will not work
                { hid: 'description', name: 'description', content: 'Lerne das Team hinter Bee2Bee kennen.' }
            ]
        }
    }
}
</script>

<style>
</style>
