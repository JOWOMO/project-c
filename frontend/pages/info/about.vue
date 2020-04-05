<template>
  <div>
    <h1>About</h1>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "About",
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: "Wir sind Bee2Bee, eine Plattform, die in der Zeit der Corona-Kriese Unternehmen hilft ihre Arbeiter nicht in Kurzarbeit schicken zu müssen."
        }
      ]
    };
  }
};
</script>

<style>
</style>
